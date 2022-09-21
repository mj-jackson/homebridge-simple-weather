export type SimpleWeatherConfig = {
    interval: number;
    apiKey: string;
    location: string;
    todayDevices: WeatherConfig;
    forecastNum: number;
    forecastInterval: number;
    forecastDevices: WeatherConfig;
};

export type SimpleWeatherDeviceConfig = {
    today: {
        currentTemp: boolean;
        minTemp: boolean;
        maxTemp: boolean;
        humidity: boolean;
    };
    forecast: {
        num: number;
        interval: number;
    };
};

export type WeatherConfig = {
    currentTemp: boolean;
    minTemp: boolean;
    maxTemp: boolean;
    humidity: boolean;
    rainProb: boolean;
};