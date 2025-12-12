"use client";
import { bgImageLarge, bgImageSmall } from "../assets/index";
import type { WeatherCardProps } from "../types/weather";

export default function WeatherCard({ data }: WeatherCardProps) {
  const iconSizeClass = "w-20 h-20 md:w-24 md:h-24";

  return (
    <div className="from-indigo-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden h-48 flex flex-col justify-between">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="hidden md:block absolute inset-0 bg-no-repeat bg-cover bg-center z-10"
          style={{ backgroundImage: `url(${bgImageLarge})` }}
        ></div>

        <div
          className="block md:hidden absolute inset-0 bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImageSmall})` }}
        ></div>
      </div>

      <div className="relative z-10">
        <h3 className="text-3xl font-bold mb-1">{data.location}</h3>
        <p className="text-indigo-100">{data.date}</p>
      </div>

      <div className="relative z-10 flex items-end justify-between">
        <div className="flex items-center">
          <img
            src={data.icon}
            alt="Current Weather Icon"
            className={iconSizeClass}
          />
        </div>

        <div className="text-7xl md:text-8xl font-bold">
          {data.temperature}°
        </div>
      </div>
    </div>
  );
}
