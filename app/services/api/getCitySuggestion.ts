// src/services/api/getCitySuggestions.ts

import api from './api';
import uri from '@app/utils/uri';
import { CitySuggestionsResponse } from '@app/types/api';

const getCitySuggestions = async (query: string): Promise<CitySuggestionsResponse | null> => {
  if (!query) {
    return null;
  }

  try {
    const res = await api.get(
      `https://api.weatherapi.com/v1/search.json?key=${uri.key}&q=${query}`
    );

    if (res.data) {
      return { data: res.data } as CitySuggestionsResponse;
    }

    return null;
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    return null;
  }
};

export default getCitySuggestions;
