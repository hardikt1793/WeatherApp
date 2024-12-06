import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToStorage = async (key: string, value: any) => {
  try {
    const valueToStore =
      typeof value === 'object' ? JSON.stringify(value) : value;
    await AsyncStorage.setItem(key, valueToStore);
    console.log(`Successfully saved ${key} to AsyncStorage`);
  } catch (error) {
    console.error('Error saving data to AsyncStorage', error);
  }
};

export const getFromStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    } else {
      console.log(`No value found for key: ${key}`);
      return null;
    }
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage', error);
    return null;
  }
};
