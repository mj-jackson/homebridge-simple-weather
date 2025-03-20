import { SimpleWeatherData, Weather } from './simpleWeatherData';
import { Logger } from 'homebridge';
import { SimpleWeatherConfig } from './config';

export default abstract class DataProvider {

  todayData?: Weather;
  forecastData?: Weather[];
  ready = false;
  protected readonly interval: number;

  constructor(protected config: SimpleWeatherConfig, protected readonly log: Logger) {
    const { interval, apiKey } = config;
    this.interval = (interval ?? 60) * 1000 * 60;
    this.log.debug('Init Dataprovider with arguments:', interval, apiKey);
  }

  abstract updateData(): void | Promise<void>;

  async init(): Promise<void> {
    await this.updateData();
    this.initInterval();
  }

  getData(): SimpleWeatherData | null {
    if (!this.todayData || !this.forecastData) {
      return null;
    }

    return {
      today: this.todayData,
      forecasts: this.forecastData,
    };
  }

  private initInterval(): void {
    setInterval(this.updateData.bind(this), this.interval);
  }
}
