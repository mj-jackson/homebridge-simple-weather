import { Device, DeviceType } from './device';

export const supportedDevices: Device[] = [
  new Device('currentTemp', 'Aktuelle Temperatur', 'currentTemp', DeviceType.Temperature),
  new Device('minTemp', 'Min Temperatur', 'minTemp', DeviceType.Temperature),
  new Device('maxTemp', 'Max Temperatur', 'maxTemp', DeviceType.Temperature),
  new Device('humidity', 'Luftfeuchtigkeit', 'humidity', DeviceType.Humidity),
];

