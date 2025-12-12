"use client";
// src/app/page.tsx (hoặc src/App.tsx)

import { useState, useCallback, useEffect } from "react"; 
import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import WeatherContent from "./components/WeatherContent";
import { fetchWeatherData } from "./utils/weatherApi";

export default function Page() {
    const initialDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }); 
    
    const [unit, setUnit] = useState("metric");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState([]);
    
    const [selectedDay, setSelectedDay] = useState(initialDay); 

    const handleSearch = useCallback(
        async (location) => {
            setLoading(true);
            setError(null);

            const searchLocation = location || "Berlin, Germany"; 

            try {
                const data = await fetchWeatherData(searchLocation, unit);
                
                setWeatherData(data);
                setSearchResults([]);
                
                setSelectedDay(initialDay); 

            } catch (err) {
                console.error("API Error:", err); 
                setError(
                    "We couldn't get the weather data for that location. Please try another city or check your API key."
                );
            } finally {
                setLoading(false);
            }
        },
        [unit] // Kích hoạt gọi lại API khi đơn vị thay đổi
    );
    
    useEffect(() => {
        if (!weatherData && !loading) {
            handleSearch("Berlin, Germany");
        }
    }, [handleSearch, weatherData, loading]); 

    const handleSearchChange = (value) => {
        if (value.trim()) {
            setSearchResults([
                `${value}`,
                `${value}, France`,
                `${value}, Germany`,
                `${value}, USA`,
            ]);
        } else {
            setSearchResults([]);
        }
    };

    const handleSelectLocation = (location) => {
        setSearchResults([]);
        handleSearch(location);
    };

    const handleUnitChange = (newUnit) => {
        if (newUnit !== unit) {
            setUnit(newUnit);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950">
            <Header unit={unit} onUnitChange={handleUnitChange} />
            <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
                <SearchSection
                    onSearch={handleSearch}
                    onSearchChange={handleSearchChange}
                    searchResults={searchResults}
                    onSelectLocation={handleSelectLocation}
                    loading={loading}
                />
                <WeatherContent
                    weatherData={weatherData}
                    loading={loading}
                    error={error}
                    onRetry={() => handleSearch(weatherData?.location)}
                    selectedDay={selectedDay}
                    onSelectDay={setSelectedDay}
                />
            </main>
        </div>
    );
}