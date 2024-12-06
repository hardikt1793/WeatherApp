export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface Wind {
  mph: number;
  kph: number;
  degree: number;
  dir: string;
}


export interface CitySuggestion {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export interface CitySuggestionsResponse {
  data: CitySuggestion[];
}

export interface HourlyForecast {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  humidity: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
}

export interface DayForecast {
  date: string;
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  avghumidity: number;
  condition: WeatherCondition;
  uv: number;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface CurrentWeatherData {
  location: Location;
  current: HourlyForecast;
}

export interface WeatherData {
  location: Location;
  current: HourlyForecast;
  forecast: {
    forecastday: {
      date: string;
      day: DayForecast;
      hour: HourlyForecast[];
    }[];
  };
}

export interface AstroDataResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  astronomy: {
    astro: {
      sunrise: string;
      sunset: string;
      moonrise: string;
      moonset: string;
      moon_phase: string;
      moon_illumination: number;
      is_moon_up: number;
      is_sun_up: number;
    };
  };
}

export type TemperatureUnit = 'C' | 'F';
