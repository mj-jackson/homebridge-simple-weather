export class Device {
  id: string;
  name: string;
  path: string;
  type: DeviceType;

  constructor(id: string, name: string, path: string, type: DeviceType) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.type = type;
  }
}

export enum DeviceType {
  Temperature,
  Humidity
}