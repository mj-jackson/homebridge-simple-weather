import { PlatformAccessory, Service } from 'homebridge';
import { DataDevice, DeviceType } from './devices/device';
import { SimpleWeatherPlatform } from './simpleWeatherPlatform';

export class Accessory {
  private service: Service;

  constructor(
        private readonly platform: SimpleWeatherPlatform,
        private readonly accessory: PlatformAccessory,
        private readonly device: DataDevice<number | string>,
  ) {
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'SimpleWeather')
      .setCharacteristic(this.platform.Characteristic.Model, `${this.device.name} - OpenWeatherMap`)
      .setCharacteristic(this.platform.Characteristic.SerialNumber, `SimpleWeather-${this.device.id}`);

    this.service = this.accessory.getService(this.getSpecificService())
        || this.accessory.addService(this.getSpecificService());
    this.service.setCharacteristic(this.platform.Characteristic.Name, this.device.name);
    this.service.getCharacteristic(this.getSpecificValue())
      .onGet(() => this.device.getData());
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
}
