import {WeatherData} from '@app/types/api';
import api from './api';
import uri from '@app/utils/uri';

const getForecastData = async (city: string): Promise<WeatherData | null> => {
  try {
    const res = await api.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${uri.key}&q=${city}&days=1&hourly=1`,
    );
    if (res.data) {
      return res.data as WeatherData;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export default getForecastData;
