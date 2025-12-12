// src/utils/weatherApi.js

// =========================================================================
// BƯỚC 1: IMPORT API KEY VÀ HÌNH ẢNH ICONS
// =========================================================================

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

// IMPORT ICONS (Đảm bảo đường dẫn này là chính xác trong cấu trúc dự án của bạn)
import SunnyIcon from '../assets/images/icon-sunny.webp'; 
import PartlyCloudyIcon from '../assets/images/icon-partly-cloudy.webp';
import CloudyIcon from '../assets/images/icon-partly-cloudy.webp';
import OvercastIcon from '../assets/images/icon-overcast.webp';
import DrizzleIcon from '../assets/images/icon-drizzle.webp';
import RainIcon from '../assets/images/icon-rain.webp';
import StormIcon from '../assets/images/icon-storm.webp';
import SnowIcon from '../assets/images/icon-snow.webp';
import FogIcon from '../assets/images/icon-fog.webp';
import DefaultIcon from '../assets/images/icon-sunny.webp'; 


// =========================================================================
// BƯỚC 2: HÀM ÁNH XẠ ICON (Mã OWM sang Đường dẫn File)
// =========================================================================

function getWeatherIcon(iconCode) {
    if (iconCode.startsWith('01')) return SunnyIcon;
    if (iconCode.startsWith('02')) return PartlyCloudyIcon;
    if (iconCode.startsWith('03')) return PartlyCloudyIcon;
    if (iconCode.startsWith('04')) return OvercastIcon;
    if (iconCode.startsWith('09')) return DrizzleIcon;
    if (iconCode.startsWith('10')) return RainIcon;
    if (iconCode.startsWith('11')) return StormIcon;
    if (iconCode.startsWith('13')) return SnowIcon;
    if (iconCode.startsWith('50')) return FogIcon;
    return DefaultIcon;
}


// =========================================================================
// BƯỚC 3: HÀM XỬ LÝ DỮ LIỆU DỰ BÁO HÀNG NGÀY (7 ngày + đệm dữ liệu giả)
// =========================================================================

function getDailyForecast(forecastList, unit) {
    const dailyData = {};

    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toLocaleDateString('en-US'); 
        
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(item.main.temp);
        
        if (!dailyData[dayKey]) {
            dailyData[dayKey] = {
                day: dayName,
                icon: getWeatherIcon(item.weather[0].icon), 
                high: temp,
                low: temp,
            };
        } else {
            if (temp > dailyData[dayKey].high) dailyData[dayKey].high = temp;
            if (temp < dailyData[dayKey].low) dailyData[dayKey].low = temp;
        }
    });

    const realDays = Object.values(dailyData);
    
    // Đệm (pad) dữ liệu giả nếu số ngày thực tế ít hơn 7
    while (realDays.length < 7) {
        // Lấy ngày cuối cùng có dữ liệu hoặc ngày hôm nay
        const lastDate = realDays.length > 0 
            ? new Date(forecastList[forecastList.length - 1].dt * 1000) 
            : new Date();
        
        // Tính ngày tiếp theo
        const nextDate = new Date(lastDate);
        nextDate.setDate(lastDate.getDate() + 1);
        
        const nextDayName = nextDate.toLocaleDateString('en-US', { weekday: 'short' });

        realDays.push({
            day: nextDayName,
            icon: DefaultIcon, 
            high: unit === 'metric' ? 25 : 77, // Giá trị giả lập theo đơn vị
            low: unit === 'metric' ? 15 : 59,  // Giá trị giả lập theo đơn vị
            isFake: true 
        });
    }

    // Chỉ lấy 7 ngày đầu tiên
    return realDays.slice(0, 7);
}


// =========================================================================
// BƯỚC 4: HÀM ĐỊNH DẠNG DỮ LIỆU CUỐI CÙNG
// =========================================================================

function formatApiData(current, forecast, unit) {
    
    // TRẢ VỀ TOÀN BỘ DỮ LIỆU DỰ BÁO THEO GIỜ
    const allHourlyForecast = forecast.list.map(item => ({
        dayName: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }), 
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        temp: Math.round(item.main.temp),
        icon: getWeatherIcon(item.weather[0].icon) 
    }));

    const dailyData = getDailyForecast(forecast.list, unit);
    
    // --- Trả về định dạng cuối cùng ---
    return {
        location: `${current.name}, ${current.sys.country}`,
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }),
        temperature: Math.round(current.main.temp),
        feelsLike: Math.round(current.main.feels_like),
        humidity: current.main.humidity,
        wind: Math.round(current.wind.speed * (unit === 'metric' ? 3.6 : 2.237)), 
        windUnit: unit === "metric" ? "km/h" : "mph",
        precipitation: 0, 
        precipitationUnit: unit === "metric" ? "mm" : "in",
        icon: getWeatherIcon(current.weather[0].icon),
        hourly: allHourlyForecast, 
        daily: dailyData,
    };
}


// =========================================================================
// BƯỚC 5: HÀM GỌI API CHÍNH (EXPORT)
// =========================================================================

export async function fetchWeatherData(location, unit) {
    if (!API_KEY) {
        throw new Error("API Key is missing. Please check your .env file and server restart.");
    }

    const currentWeatherUrl = `${BASE_URL}weather?q=${location}&appid=${API_KEY}&units=${unit}`;
    const currentWeatherRes = await fetch(currentWeatherUrl);
    
    if (!currentWeatherRes.ok) {
        throw new Error("Location not found or API connection error.");
    }
    const currentData = await currentWeatherRes.json();
    
    const { lat, lon } = currentData.coord;
    const forecastUrl = `${BASE_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;
    const forecastRes = await fetch(forecastUrl);
    
    if (!forecastRes.ok) {
        throw new Error("Failed to fetch forecast data.");
    }
    const forecastData = await forecastRes.json();
    
    const formattedData = formatApiData(currentData, forecastData, unit);
    return formattedData;
}