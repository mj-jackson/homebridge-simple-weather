import { API, Characteristic, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, UnknownContext } from 'homebridge';
import { Device } from './devices/device';
import { supportedDevices } from './devices/supportedDevices';
import { PLATFORM_NAME, PLUGIN_NAME } from './settings';
import { Accessory } from './accessory';
import { OpenWeatherMapDataProvider } from './data/openWeatherMapDataProvider';
import { SimpleWeatherConfig } from './data/config';
import DataProvider from './data/dataProvider';

export class SimpleWeatherPlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;
  public readonly accessories: PlatformAccessory[] = [];
  public dataProvider: DataProvider;

  private supportedSensors: string[] = ['currentTemp', 'minTemp', 'maxTemp', 'rain'];
  private supportedDevices: Device[] = supportedDevices;

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    // init data provider
    const simpleWeatherConfig: SimpleWeatherConfig = this.getSimpleWeatherConfig(config);
    this.dataProvider = new OpenWeatherMapDataProvider(simpleWeatherConfig, log);
    this.dataProvider.init();

    this.api.on('didFinishLaunching', () => {
      this.log.debug('Executed didFinishLaunching callback');
      // run the method to discover / register your devices as accessories
      this.discoverDevices();
    });
  }

  configureAccessory(accessory: PlatformAccessory): void {
    this.log.info('Loading accessory from cache');
    this.accessories.push(accessory);
  }

  discoverDevices(): void {
    // all devices activated by the user will be added (or loaded from cache)
    // devices not activated will be removed

    for (const device of supportedDevices) {
      const uuid: string = this.api.hap.uuid.generate(device.id);
      const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

      // device.id has to match the config key
      if (this.config[device.id]) {
        let accessory: PlatformAccessory<UnknownContext>;

        if (existingAccessory) {
          accessory = existingAccessory;
          this.log.info('Existing Device loaded from cache:', device.name);
        } else {
          accessory = new this.api.platformAccessory(device.name, uuid);
          accessory.context.device = device;
          this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
          this.log.info('New Device added:', device.name);
        }

        new Accessory(this, accessory, this.dataProvider);
      } else {
        if (existingAccessory) {
          this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [existingAccessory]);
          this.log.info('Existing Device removed:', device.name);
        }
      }
    }
  }

  private getSimpleWeatherConfig(platformConfig: PlatformConfig): SimpleWeatherConfig {
    return {
      interval: platformConfig.interval,
      apiKey: platformConfig.apiKey,
      location: platformConfig.location,
    };
  }

}