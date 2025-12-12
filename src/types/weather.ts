export interface DailyItem {
  day: string;
  icon: string; 
  high: number;
  low: number;
  isFake?: boolean; 
}

export interface DailyForecastProps {
  data: {
    daily: DailyItem[];
  };
}

export interface HeaderProps {
    unit: 'metric' | 'imperial'; 
    onUnitChange: (newUnit: 'metric' | 'imperial') => void;
}

export interface HourlyItem {
  dayName: string;
  time: string;
  temp: number;
  icon: string;
}

export interface HourlyForecastProps {
  data: {
    hourly: HourlyItem[];
  };
  selectedDay: string;
  onSelectDay: (day: string) => void;
}

export interface SearchSectionProps {
  onSearch: (location: string) => void;
  onSearchChange: (value: string) => void;
  searchResults: string[];
  onSelectLocation: (location: string) => void;
  loading: boolean;
}

export interface WeatherCardProps {
    data: {
        location: string;
        date: string;
        temperature: number;
        icon: string;
    };
}

interface WeatherData {
    location: string;
    date: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    wind: number;
    windUnit: string;
    precipitation: number;
    precipitationUnit: string;
    icon: string;
    hourly: HourlyItem[];
    daily: DailyItem[];
}

interface WeatherContentProps {
    weatherData: WeatherData | null; 
    loading: boolean;
    error: string | null; 
    onRetry: () => void;
    selectedDay: string;
    onSelectDay: (day: string) => void;
}