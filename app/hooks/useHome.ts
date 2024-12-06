import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Alert, Linking, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions';
import {getFromStorage} from '@utils/localStorage';
import getAstroData from '@services/api/getAstroData';
import getCurrentWeather from '@app/services/api/getCurrentWeather';
import api from '@services/api/api';
import uri from '@utils/uri';
import _debounce from 'lodash/debounce';
import {useThemeColors} from '@app/utils/theme';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const useHome = () => {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [weatherData, setWeatherData] = useState(null);
  const [astroData, setAstroData] = useState(null);
  const [query, setQuery] = useState('');
  const [permissionGranted, setPermissionGranted] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');
  const [currentCity, setcurrentCity] = useState('');

  useEffect(() => {
    if (!process.env.WEATHER_API_TOKEN) {
      Alert.alert(
        'API ERROR',
        'Invalid API token, Please restart the app replacing the env file',
        [
          {
            text: 'Exit',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ],
      );
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchTemperatureUnit();
    }
  }, [isFocused]);

  useEffect(() => {
    fetchTemperatureUnit();
  }, []);

  // useEffect(() => {
  //   if (query) {
  //     fetchWeatherData(query);
  //   } else {
  //     fetchLocationWeatherData();
  //   }
  // }, [temperatureUnit]);

  useEffect(() => {
    checkAndRequestLocationPermission();
  }, []);

  useEffect(() => {
    fetchTemperatureUnit();
  }, [isFocused, temperatureUnit]);

  useEffect(() => {
    if (isFocused) {
      if (currentCity) {
        fetchWeatherData(currentCity);
      } else {
        fetchLocationWeatherData();
      }
    }
  }, [isFocused, temperatureUnit]);

  useEffect(() => {
    if (permissionGranted) {
      fetchLocationWeatherData();
    }
  }, [permissionGranted]);

  const fetchWeatherData = async cityName => {
    setLoading(true);
    await fetchAstroData(cityName);
    const data = await getCurrentWeather(cityName);
    const {location, current} = data;

    setWeatherData({
      city: location.name,
      country: location.country,
      temperature:
        temperatureUnit === 'Celsius' ? current.temp_c : current.temp_f,
      windSpeed: current.wind_kph,
      precipitation: current.precip_mm,
      humidity: current.humidity,
      weatherCondition: current.condition.text,
      windDirection: current.wind_dir,
      icon: `https:${current.condition.icon}`,
    });
    setLoading(false);
  };

  const fetchAstroData = async cityName => {
    try {
      const data = await getAstroData(cityName);
      if (data?.astronomy?.astro) {
        setAstroData({
          sunrise: data.astronomy.astro.sunrise,
          sunset: data.astronomy.astro.sunset,
        });
      }
    } catch (error) {
      console.error('Error fetching astronomy data', error);
    }
  };

  const fetchCitySuggestions = async query => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
    
      const res = await api.get(
        `https://api.weatherapi.com/v1/search.json?key=${uri.key}&q=${query}`,
      );
      setSuggestions(res.data);
    } catch (error) {
      console.error('Error fetching city suggestions', error);
    }
  };

  const debouncedFetchCitySuggestions = _debounce(query => {
    fetchCitySuggestions(query);
  }, 500);

  const checkAndRequestLocationPermission = async () => {
    let permissions = [];
    if (Platform.OS === 'ios') {
      permissions = [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE];
    } else {
      permissions = [
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ];
    }

    const result = await check(permissions[0]);

    if (result === RESULTS.GRANTED) {
      setPermissionGranted(true);
      return true;
    }

    const requestResult = await requestMultiple(permissions);
    const granted = Object.values(requestResult).every(
      status => status === RESULTS.GRANTED,
    );

    if (granted) {
      setPermissionGranted(true);
      return true;
    } else {
      setPermissionGranted(false);
      return false;
    }
  };

  const fetchLocationWeatherData = async () => {
    const hasPermission = await checkAndRequestLocationPermission();
setcurrentCity('')
    if (hasPermission) {
      Geolocation.getCurrentPosition(
        async success => {
          fetchWeatherData(
            `${success.coords.latitude},${success.coords.longitude}`,
          );
        },
        error => {
          console.error('Error getting location', error);
          Alert.alert('Error', 'Failed to get your current location');
        },
      );
    }
  };

  const fetchTemperatureUnit = async () => {
    try {
      const unit = await getFromStorage('temperature_unit');
      if (unit) {
        setTemperatureUnit(unit);
      }
    } catch (error) {
      console.error('Error fetching temperature unit from AsyncStorage', error);
    }
  };

  const handleLocationPress = async () => {
    const hasPermission = await checkAndRequestLocationPermission();
    if (hasPermission) {
      fetchLocationWeatherData();
    } else {
      Alert.alert(
        'Location Permission',
        'Location permission is required to fetch current location weather. Please grant permission in settings.',
        [
          {
            text: 'Open Settings',
            // onPress: () => openSettings(),
            onPress: () => Linking.openURL('app-settings:'),
          },
          {text: 'Cancel'},
        ],
      );
    }
  };

  return {
    weatherData,
    astroData,
    query,
    setQuery,
    suggestions,
    loading,
    permissionGranted,
    fetchLocationWeatherData,
    debouncedFetchCitySuggestions,
    temperatureUnit,
    setTemperatureUnit,
    colors,
    navigation,
    isFocused,
    setWeatherData,
    setAstroData,
    setPermissionGranted,
    setSuggestions,
    setLoading,
    fetchWeatherData,
    fetchAstroData,
    fetchCitySuggestions,
    checkAndRequestLocationPermission,
    handleLocationPress,
    fetchTemperatureUnit,
    setcurrentCity,
    currentCity
  };
};

export default useHome;
