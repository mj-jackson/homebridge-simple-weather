# Homebridge Simple Weather

**A simple plugin for Homebridge for exposing today's current, minimum and maximum temperature and humidity as sensors.**

This is a basic and simple Plugin for [Homebridge.io](https://homebridge.io). It was created by using the [Homebridge Plugin Template](https://github.com/homebridge/homebridge-plugin-template).

# Installation

This plugin uses [OpenWeatherMap.org](https://openweathermap.org), an online and free to use API to fetch weather data.

## 1. Open Weather Map
Go to https://openweathermap.org
* Search for your city and note down the city name (e.g. `Munich, DE`) or the latitude and longitude as displayed
* Register an account to get an API key

## 2. Homebridge
* [(Install Homebridge)](https://github.com/homebridge/homebridge/wiki)
* Install this plugin to your homebridge: `npm install homebridge-simple-weather` (may require use of `sudo`)
* Open the plugin settings
    * Add your API key
    * Add your city name or latitude and longitude (you took a note of it in 1.)
        * Latitude and longitude will have priority if both is provided
    * Add the interval you want the data to update (default: 60) (in minutes)
    * Choose which sensors should be created by checking them or uncheck to remove

## 3. Available data
### Current data
As of right now this plugin comes with a simple set of 4 sensors:
* Current temperature
* Minumum temperature
* Maximum temperature
* Humidity

### Forecast data
Version 2 extended the available data with forecasts. You can set how many forecast-datasets should be gathered and in which hourly interval.

Eg. 3 sets in a 18 h interval will give you forecast data for 18, 36
and 54 h in the future.

Five sensors per forecast are available:
* Temperature
* Minimum temperature
* Maximum temperature
* Humidity
* Chance of rain

This may be expanded in the future.

## 4. Further information
This plugin uses the `/data/2.5/weather` and `/data/2.5/forecast` API endpoints which are free to use for [60 calls/minute / 1.000.000 calls/month](https://openweathermap.org/price) as of today.

The type of units is set to `metric`.