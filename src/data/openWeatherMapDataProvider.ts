import { URL } from 'url';
import https from 'https';
import { IncomingMessage } from 'http';
import { Logger } from 'homebridge';
import DataProvider from './dataProvider';
import { SimpleWeatherConfig } from './config';

export class OpenWeatherMapDataProvider extends DataProvider {

  private readonly apiUrl: URL = new URL('https://api.openweathermap.org/data/2.5/weather');

  constructor(config: SimpleWeatherConfig, readonly log: Logger) {
    super(config, log);
    this.apiUrl.searchParams.append('q', config.location);
    this.apiUrl.searchParams.append('appid', config.apiKey);
    this.apiUrl.searchParams.append('units', 'metric');
  }

  updateData(): void {
    this.log.debug('Calling OpenWeatherMap URL:', this.apiUrl.toString());
    https.get(this.apiUrl.toString(), (res: IncomingMessage) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        this.data = JSON.parse(data);
      });
    }).on('error', (err) => {
      this.log.error('Error when calling OpenWeatherMap:', err.message);
    });
  }
}