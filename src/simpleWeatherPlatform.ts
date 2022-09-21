import { API, Characteristic, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, UnknownContext } from 'homebridge';
import { PLATFORM_NAME, PLUGIN_NAME } from './settings';
import { Accessory } from './accessory';
import { OpenWeatherMapDataProvider } from './data/openWeatherMapDataProvider';
import { SimpleWeatherConfig } from './data/config';
import DataProvider from './data/dataProvider';
import { ForecastDevice, TodayDevice } from './devices/device';

export class SimpleWeatherPlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;
  public readonly accessories: PlatformAccessory[] = [];
  public dataProvider: DataProvider;

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    // init data provider
    const simpleWeatherConfig: SimpleWeatherConfig = this.getSimpleWeatherConfig();
    this.dataProvider = new OpenWeatherMapDataProvider(simpleWeatherConfig, log);

    this.api.on('didFinishLaunching', () => {
      this.log.debug('Executed didFinishLaunching callback');
      // run the method to discover / register your devices as accessories
      // this.discoverDevices();
      this.dataProvider.init().then(() => {
        this.discoverTodayDevices();
        this.discoverForecastDevices();
      });
    });
  }

  configureAccessory(accessory: PlatformAccessory): void {
    this.log.info('Loading accessory from cache');
    this.accessories.push(accessory);
  }

  discoverTodayDevices(): void {
    const config: SimpleWeatherConfig = this.getSimpleWeatherConfig();
    for (const [key, value] of Object.entries(config.todayDevices)) {
      const uuid: string = this.api.hap.uuid.generate(key);
      const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
      const device: TodayDevice = new TodayDevice(key, this.dataProvider);

      if (value) {
        let accessory: PlatformAccessory<UnknownContext>;

        if (existingAccessory) {
          accessory = existingAccessory;
          this.log.info('Existing Device loaded from cache:', device.id);
        } else {
          accessory = new this.api.platformAccessory(device.name, uuid);
          accessory.context.device = device;
          this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
          this.log.info('New Device added:', device.name);
        }

        new Accessory(this, accessory, device);
      } else {
        if (existingAccessory) {
          this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [existingAccessory]);
          this.log.info('Existing Device removed:', device.name);
        }
      }
    }
  }

  discoverForecastDevices(): void {
    const config: SimpleWeatherConfig = this.getSimpleWeatherConfig();

    // 0 - 4 because 5 is the maximum of forecasts right now
    for (let i = 0; i < 4; i++) {
      for (const [key, value] of Object.entries(config.forecastDevices)) {
        const uuid: string = this.api.hap.uuid.generate(`forecast-${key}-${i}`);
        const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
        const device: ForecastDevice = new ForecastDevice(key, i, this.dataProvider);

        if (value && i < config.forecastNum) {
          let accessory: PlatformAccessory<UnknownContext>;

          if (existingAccessory) {
            accessory = existingAccessory;
            this.log.info('Existing FC Device loaded from cache:', device.id);
          } else {
            accessory = new this.api.platformAccessory(device.name, uuid);
            accessory.context.device = device;
            this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
            this.log.info('New Device added:', device.name);
          }

          new Accessory(this, accessory, device);
        } else {
          if (existingAccessory) {
            this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [existingAccessory]);
            this.log.info('Existing Device removed:', device.name);
          }
        }
      }
    }
  }

  private getSimpleWeatherConfig(): SimpleWeatherConfig {
    const config: SimpleWeatherConfig = {
      interval: this.config.interval,
      apiKey: this.config.apiKey,
      location: this.config.location,
      todayDevices: {
        currentTemp: this.config.currentTemp,
        minTemp: this.config.minTemp,
        maxTemp: this.config.maxTemp,
        humidity: this.config.humidity,
        rainProb: false,
      },
      forecastNum: this.config.forecastNum ?? 0,
      forecastInterval: this.config.forecastInterval ?? 0,
      forecastDevices: {
        currentTemp: this.config.forecastCurrentTemp,
        minTemp: this.config.forecastMinTemp,
        maxTemp: this.config.forecastMaxTemp,
        humidity: this.config.forecastHumidity,
        rainProb: this.config.forecastRainProb,
      },
    };

    return config;
  }

}