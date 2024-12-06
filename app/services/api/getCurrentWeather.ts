import uri from '@app/utils/uri';
import api from './api';
import {CurrentWeatherData} from '@app/types/api';
import { Alert } from 'react-native';

const getCurrentWeather = async (
  cityName: string,
): Promise<CurrentWeatherData | null> => {
  try {
    const res = await api.get(
      uri.BASE_URL + `current.json?key=${uri.key}&q=${cityName}`,
    );

    if (res.data) {
      return res.data as CurrentWeatherData;
    }

    return null;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export default getCurrentWeather;
