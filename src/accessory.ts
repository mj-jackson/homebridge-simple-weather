import { PlatformAccessory, Service } from 'homebridge';
import DataProvider from './data/dataProvider';
import { Device, DeviceType } from './devices/device';
import { SimpleWeatherPlatform } from './simpleWeatherPlatform';

export class Accessory {
  private service: Service;
  private device: Device;

  constructor(
        private readonly platform: SimpleWeatherPlatform,
        private readonly accessory: PlatformAccessory,
        private readonly dataProvider: DataProvider,
  ) {
    this.device = accessory.context.device as Device;
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'SimpleWeather')
      .setCharacteristic(this.platform.Characteristic.Model, `${this.device.name} - OpenWeatherMap`)
      .setCharacteristic(this.platform.Characteristic.SerialNumber, `SimpleWeather-${this.device.id}`);

    this.service = this.accessory.getService(this.getSpecificService())
        || this.accessory.addService(this.getSpecificService());
    this.service.setCharacteristic(this.platform.Characteristic.Name, this.device.name);
    this.service.getCharacteristic(this.getSpecificValue())
      .onGet(this.getData.bind(this));
  }

  private getSpecificService() {
    switch (this.device.type) {
      case DeviceType.Humidity:
        return this.platform.Service.HumiditySensor;
      default:
        return this.platform.Service.TemperatureSensor;
    }
  }

  private getSpecificValue() {
    switch (this.device.type) {
      case DeviceType.Humidity:
        return this.platform.Characteristic.CurrentRelativeHumidity;
      default:
        return this.platform.Characteristic.CurrentTemperature;
    }
  }

  private getData(): string {
    return this.device.path.split('.').reduce((prev, current)=>prev && prev[current] || null, this.dataProvider.data as any);
  }
}