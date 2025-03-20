const lang: ILang = {
  de: {
    currentTemp: 'Temperatur',
    minTemp: 'min. Temperatur',
    maxTemp: 'max. Temperatur',
    humidity: 'Luftfeuchtigkeit',
    rainProb: 'Regen',
    forecast: 'Prognose',
  },
  en: {
    currentTemp: 'Temperature',
    minTemp: 'min. Temperature',
    maxTemp: 'max. Temperature',
    humidity: 'Humidity',
    rainProb: 'Chance of rain',
    forecast: 'Forecast',
  },
};

export interface ILang {
  [key: string]: {
    [key: string]: string,
  },
}

export default lang;
