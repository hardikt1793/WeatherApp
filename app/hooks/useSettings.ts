import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSettings = () => {
  const [selectedUnit, setSelectedUnit] = useState<string>('Celsius');

  useEffect(() => {
    const loadTemperatureUnit = async () => {
      try {
        const storedUnit = await AsyncStorage.getItem('temperature_unit');
        if (storedUnit) {
          setSelectedUnit(storedUnit);
        }
      } catch (error) {
        console.error(
          'Error loading temperature unit from AsyncStorage',
          error,
        );
      }
    };

    loadTemperatureUnit();
  }, []);

  const saveToAsync = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving to AsyncStorage', error);
    }
  };

  return {
    selectedUnit,
    setSelectedUnit,
    saveToAsync,
  };
};

export default useSettings;
