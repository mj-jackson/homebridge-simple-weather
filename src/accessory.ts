import { PlatformAccessory, Service } from 'homebridge';
import { DataProvider } from './dataProvider';
import { Device } from './devices/device';
import { SimpleWeatherPlatform } from './simpleWeatherPlatform';

export class Accessory {
  private service: Service;

  constructor(
        private readonly device: Device,
        private readonly platform: SimpleWeatherPlatform,
        private readonly accessory: PlatformAccessory,
        private readonly dataProvider: DataProvider,
  ) {
    const d: Device = accessory.context.device as Device;
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'SimpleWeather')
      .setCharacteristic(this.platform.Characteristic.Model, `${d.name} - OpenWeatherMap`)
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');

    this.service = this.accessory.getService(this.platform.Service.TemperatureSensor)
      || this.accessory.addService(this.platform.Service.TemperatureSensor);
    this.service.setCharacteristic(this.platform.Characteristic.Name, d.name);

    this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature)
      .onGet(this.handleCurrentTemperatureGet.bind(this));
  }

  private handleCurrentTemperatureGet(): string {
    return this.getData();
  }

  private getData(): string {
    return this.device.path.split('.').reduce((prev, current)=>prev && prev[current] || null, this.dataProvider.data);
  }
}