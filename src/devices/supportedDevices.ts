import { Device, DeviceType } from './device';

export const supportedDevices: Device[] = [
  new Device('currentTemp', 'Aktuelle Temperatur', 'main.temp', DeviceType.Temperature),
  new Device('minTemp', 'Min Temperatur', 'main.temp_min', DeviceType.Temperature),
  new Device('maxTemp', 'Max Temperatur', 'main.temp_max', DeviceType.Temperature),
  new Device('humidity', 'Luftfeuchtigkeit', 'main.humidity', DeviceType.Humidity),
];