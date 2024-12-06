import {useState, useEffect} from 'react';
import {getFromStorage} from '@app/utils/localStorage';
import {getForecastData} from '@app/services/api';
import {HourlyForecast, WeatherData} from '@app/types/api';

interface UseDetails {
  data: WeatherData | null;
  selectedHour: HourlyForecast | null;
  loading: boolean;
  tempUnit: string;
  setSelectedHour: (hour: HourlyForecast | null) => void;
  fetchTemperatureUnit: () => void;
}

const useDetails = (city: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [selectedHour, setSelectedHour] = useState<HourlyForecast | null>(null);
  const [tempUnit, setTempUnit] = useState<string>('Celsius');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTemperatureUnit = async () => {
    try {
      const unit = await getFromStorage('temperature_unit');
      if (unit) {
        setTempUnit(unit);
      }
    } catch (error) {
      console.error('Error fetching temperature unit from AsyncStorage', error);
    }
  };

  useEffect(() => {
    fetchTemperatureUnit();
  }, []);

  useEffect(() => {
    const fetchForecast = async () => {
      const forecastData = await getForecastData(city);
      if (forecastData) {
        setData(forecastData);
      }
      setLoading(false);
    };

    if (city) {
      fetchForecast();
    }
  }, [city]);

  return {
    data,
    selectedHour,
    tempUnit,
    loading,
    setSelectedHour,
    fetchTemperatureUnit,
  };
};

export default useDetails;
