import { Device } from './device';

export const supportedDevices: Device[] = [
  new Device('currentTemp', 'Aktuelle Temperatur', 'main.temp'),
  new Device('minTemp', 'Min Temperatur', 'main.temp_min'),
  new Device('maxTemp', 'Max Temperatur', 'main.temp_max'),
  new Device('rain', 'Regenmenge', 'rain.1h'),
];