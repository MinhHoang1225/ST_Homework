"use client";
import { useState } from "react";
import { DropdownIcon } from "../assets/index";
import type { HourlyForecastProps } from '../types/weather';


export default function HourlyForecast({
  data,
  selectedDay,
  onSelectDay,
}: HourlyForecastProps) {
  const [showDayDropdown, setShowDayDropdown] = useState(false);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const filteredHourlyData = data.hourly
    .filter((hour) => hour.dayName === selectedDay)
    .slice(0, 7);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h3 className="text-xl font-bold text-slate-50">Hourly forecast</h3>

        <div className="relative">
          <button
            onClick={() => setShowDayDropdown(!showDayDropdown)}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-50 text-base border border-slate-600 transition-colors"
          >
            {selectedDay}
            <img
              src={DropdownIcon}
              alt="Dropdown"
              className={`w-3 h-3 transition-transform ${
                showDayDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showDayDropdown && (
            <div className="absolute right-0 w-40 bg-slate-700 border border-slate-600 rounded-lg shadow-xl z-50">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    onSelectDay(day);
                    setShowDayDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-slate-600 transition-colors border-b border-slate-600 last:border-b-0 ${
                    day === selectedDay
                      ? "bg-slate-600 text-white"
                      : "text-slate-300"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto pr-2">
        {filteredHourlyData.length > 0 ? (
          filteredHourlyData.map((hour, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <img src={hour.icon} alt="Hourly Icon" className="w-8 h-8" />
                <span className="text-slate-300 font-semibold text-base">
                  {hour.time}
                </span>
              </div>
              <span className="text-slate-50 font-semibold text-base">
                {hour.temp}°
              </span>
            </div>
          ))
        ) : (
          <p className="text-slate-400 text-center py-4">
            No hourly data available for {selectedDay}.
          </p>
        )}
      </div>
    </div>
  );
}
