# Homebridge Simple Weather

**A simple plugin for Homebridge for exposing today's current, minimum and maximum temperature and humidity as sensors.**

This is a basic and simple Plugin for [Homebridge.io](https://homebridge.io). It was created by using the [Homebridge Plugin Template](https://github.com/homebridge/homebridge-plugin-template).

# Installation

This plugin uses [OpenWeatherMap.org](https://openweathermap.org), an online and free to use API to fetch weather data.

## 1. Open Weather Map
Go to https://openweathermap.org
* Search for your city and note down the city name as displayed (e.g. `Munich, DE`)
* Register an account to get an API key

## 2. Homebridge
* [(Install Homebridge)](https://github.com/homebridge/homebridge/wiki)
* Install this plugin to your homebridge: `npm install homebridge-simple-weather` (may require use of `sudo`)
* Open the plugin settings
    * Add your API key
    * Add your city name (you took a note of it in 1.)
    * Add the interval you want the data to update (default: 60) (in minutes)
    * Choose which sensors should be created by checking them or uncheck to remove

## 3. Available data
As of right now this plugin comes with a simple set of 4 sensors:
* Current temperature
* Minumum temperature
* Maximum temperature
* Humidity

This may be expanded in the future.

## 4. Further information
This plugin uses the `/data/2.5/weather` API endpoint which is free to use for [60 calls/minute / 1.000.000 calls/month](https://openweathermap.org/price) as of today.

The type of units is set to `metric`.