import { SimpleWeatherData } from './simpleWeatherData';
import { Logger } from 'homebridge';
import { SimpleWeatherConfig } from './config';

export default abstract class DataProvider {

  data?: SimpleWeatherData;
  protected readonly interval: number;

  constructor(protected config: SimpleWeatherConfig, protected readonly log: Logger) {
    const {interval, apiKey, location} = config;
    this.interval = (interval ?? 60) * 1000 * 60;
    this.log.debug('Init Dataprovider with arguments:', interval, apiKey, location);
  }

  abstract updateData(): void;

  init(): void {
    this.updateData();
    this.initInterval();
  }

  private initInterval(): void {
    setInterval(this.updateData.bind(this), this.interval);
  }
}
