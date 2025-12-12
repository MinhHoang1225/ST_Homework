"use client";
import ErrorState from "./states/ErrorState";
import LoadingState from "./states/LoadingState";
import WeatherCard from "./WeatherCard";
import MetricsGrid from "./MetricsGrid";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import NoResultsState from "./states/NoResultsState";

export default function WeatherContent({
  weatherData,
  loading,
  error,
  onRetry,
  selectedDay,
  onSelectDay,
}: WeatherContentProps) {
  const data = weatherData as WeatherData;

  if (error) {
    return <ErrorState onRetry={onRetry} />;
  }

  if (loading) {
    return <LoadingState />;
  }

  if (!weatherData) {
    return <NoResultsState />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-stretch">
      <div className="lg:col-span-2 flex flex-col space-y-6">
        <WeatherCard data={data} />
        <MetricsGrid data={data} />
        <DailyForecast data={data} />
      </div>
      <div className="lg:col-span-1 h-full">
        <HourlyForecast
          data={data}
          selectedDay={selectedDay}
          onSelectDay={onSelectDay}
        />
      </div>
    </div>
  );
}
