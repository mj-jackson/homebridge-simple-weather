import { URL } from 'url';
import https from 'https';
import { IncomingMessage } from 'http';
import { Logger } from 'homebridge';

export class DataProvider {

  public data?: any;
  private readonly interval: number;
  private readonly apiUrl: URL = new URL('https://api.openweathermap.org/data/2.5/weather');

  constructor(interval:number, apiKey: string, location: string, private readonly log: Logger) {
    this.interval = (interval ?? 60) * 1000 * 60;
    this.apiUrl.searchParams.append('q', location);
    this.apiUrl.searchParams.append('appid', apiKey);
    this.apiUrl.searchParams.append('units', 'metric');
    this.updateData();
    this.initInterval();
  }

  initInterval(): void {
    setInterval(this.updateData.bind(this), this.interval);
  }

  private updateData(): void {
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