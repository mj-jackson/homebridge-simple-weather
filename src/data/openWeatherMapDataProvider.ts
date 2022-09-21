import { URL } from 'url';
import { Logger } from 'homebridge';
import DataProvider from './dataProvider';
import { SimpleWeatherConfig } from './config';
import { Weather } from './simpleWeatherData';
import axios from 'axios';

export class OpenWeatherMapDataProvider extends DataProvider {

  private readonly apiUrl: string = 'https://api.openweathermap.org/data/2.5';

  constructor(config: SimpleWeatherConfig, readonly log: Logger) {
    super(config, log);
  }

  async updateData(): Promise<void> {
    await this.updateTodayData();
    await this.updateForecastData();
  }

  private async updateTodayData(): Promise<void> {
    const response = await axios.get(this.getUrl('weather').toString());
    this.todayData = this.mapToday(response.data);

    this.log.debug('Calling OpenWeatherMap URL:', this.getUrl('weather').toString());
  }

  private async updateForecastData(): Promise<void> {
    const response = await axios.get(this.getUrl('forecast').toString());
    this.forecastData = this.mapForecast(response.data);

    this.log.debug('Calling OpenWeatherMap Forecast URL:', this.getUrl('forecast').toString());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToday(data: any): Weather {
    return {
      currentTemp: data.main.temp,
      minTemp: data.main.temp_min,
      maxTemp: data.main.temp_max,
      humidity: data.main.humidity,
      rainProb: data.pop ? data.pop * 100 : 0,
    };
  }

  private mapForecast(data: any): Weather[] {
    const list: any[] = data.list;
    const step: number = this.config.forecastInterval / 3;
    const filtered: Weather[] = [];

    list.forEach((element: any, index: number) => {
      const numEle: number = filtered.length;
      if ((index + 1) % step === 0 && numEle < this.config.forecastNum) {
        this.log.debug('Forecast element added:', index + 1);
        filtered.push(this.mapToday(element));
      }
    });

    return filtered;
  }

  private getUrl(path: string): URL {
    const url: URL = new URL(`${this.apiUrl}/${path}`);
    url.searchParams.append('q', this.config.location);
    url.searchParams.append('appid', this.config.apiKey);
    url.searchParams.append('units', 'metric');

    return url;
  }
}