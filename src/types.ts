export interface Condition {
  text: string;
  icon: string;
}

export interface DayDetails {
  maxtemp_c: number;
  mintemp_c: number;
  maxwind_kph: number;
  condition: Condition;
  avghumidity: number;
}

export interface HourlyForecastData {
  time: string;
  temp_c: number;
  humidity: number;
  condition: {
    icon: string;
    text?: string;
  };
}
export interface LocationDetail {
  locationName?: string;
  icons?: string;
  temperature_C?: number;
}
export interface TodayForecast {
  maxTemp: number;
  minTemp: number;
}
export interface ForecastDay {
  date: string;
  day: DayDetails;
  hour: HourlyForecastData[];
}

export interface CurrentWeather {
  temperature_C?: number;
  temperature_F?: number;
  description?: string;
  sunset?: string;
  sunrise?: string;
  icons?: string;
  humidity?: number;
  locationName?: string;
  airQuality?: number;
  windSpeed?: number;
  feelslike_c?: number;
  uv?: number;
  pressure?: number;
  dewPoint?: number;
  precipitations?: number;
  visibility?: number;
  isDay?: number;
  aqi?: number;
}
