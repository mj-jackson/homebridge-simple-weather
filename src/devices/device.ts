import DataProvider from '../data/dataProvider';
import { Weather } from '../data/simpleWeatherData';
import lang from '../data/language';

export abstract class DataDevice<T> {
  id: string;

  constructor(id: string, protected dataProvider: DataProvider, protected langKey: 'en' | 'de') {
    this.id = id;
  }

  abstract getData(): T;

  get name(): string {
    if (!this.langKey) {
      return '';
    }
    return lang[this.langKey][this.id];
  }

  get type(): DeviceType {
    switch (this.id) {
      case 'currentTemp':
        return DeviceType.Temperature;
      case 'minTemp':
        return DeviceType.Temperature;
      case 'maxTemp':
        return DeviceType.Temperature;
      case 'humidity':
        return DeviceType.Humidity;
      case 'rainProb':
        return DeviceType.Humidity;
      default:
        return DeviceType.Temperature;
    }
  }
}

export class TodayDevice extends DataDevice<number> {
  constructor(id: string, protected dataProvider: DataProvider, protected langKey: 'en' | 'de') {
    super(id, dataProvider, langKey);
  }

  getData(): number {
    if (!this.dataProvider?.todayData || !(this.id in this.dataProvider.todayData)) {
      return 0;
    }

    return this.dataProvider.todayData[(this.id as keyof Weather)] as number;
  }
}

export class ForecastDevice extends DataDevice<number> {
  private forecastIndex: number;

  constructor(id: string, index: number, protected dataProvider: DataProvider, protected langKey: 'en' | 'de') {
    super(id, dataProvider, langKey);
    this.forecastIndex = index;
  }

  getData(): number {
    if (!this.dataProvider.forecastData
      || !this.dataProvider.forecastData[this.forecastIndex]
      || !(this.id in this.dataProvider.forecastData[this.forecastIndex])) {
      return 0;
    }

    return this.dataProvider.forecastData[this.forecastIndex][(this.id as keyof Weather)] as number;
  }

  get name(): string {
    if (!this.langKey) {
      return '';
    }
    return `${lang[this.langKey][this.id]} (${lang[this.langKey].forecast} #${this.forecastIndex + 1})`;
  }
}

export enum DeviceType {
  Temperature,
  Humidity
}
