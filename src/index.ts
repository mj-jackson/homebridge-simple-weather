import { API } from 'homebridge';

import { PLATFORM_NAME } from './settings';
import { SimpleWeatherPlatform } from './simpleWeatherPlatform';

/**
 * This method registers the platform with Homebridge
 */
export default (api: API) => {
  api.registerPlatform(PLATFORM_NAME, SimpleWeatherPlatform);
};
