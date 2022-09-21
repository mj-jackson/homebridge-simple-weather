export type SimpleWeatherData = {
    today: Weather;
    forecasts: Weather[];
};

export type Weather = {
    currentTemp: number;
    minTemp: number;
    maxTemp: number;
    humidity: number;
    rainProb?: number;
};

export type NamedWeather = Weather & {
    name: string;
};
