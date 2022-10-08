export type SimpleWeatherConfig = {
    language: string;
    apiKey: string;
    interval: number;
    city: string;
    location: Location;
    todayDevices: WeatherConfig;
    forecastNum: number;
    forecastInterval: number;
    forecastDevices: WeatherConfig;
};

export type WeatherConfig = {
    currentTemp: boolean;
    minTemp: boolean;
    maxTemp: boolean;
    humidity: boolean;
    rainProb: boolean;
};

type Location = {
    lat?: number;
    long?: number;
};