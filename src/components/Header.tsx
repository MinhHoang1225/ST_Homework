"use client";
import { useState } from "react";
import { Logo, UnitsIcon, DropdownIcon, CheckmarkIcon } from "../assets/index";
import type { HeaderProps } from '../types/weather';

export default function Header({ unit, onUnitChange }: HeaderProps) {
 const [showUnits, setShowUnits] = useState(false);

 const handleUnitToggle = (newUnit: 'metric' | 'imperial') => {
  onUnitChange(newUnit);
  setShowUnits(false);
 };
 
 const handleItemSelect = (newUnit: 'metric' | 'imperial') => {
  handleUnitToggle(newUnit);
 };

 const targetMode = unit === "metric" ? "Imperial" : "Metric";
 const targetUnit = unit === "metric" ? "imperial" : "metric";

 const renderCheckmark = (isActive: boolean) => {
   if (!isActive) return null;
   return <img src={CheckmarkIcon} alt="Checked" className="w-4 h-4 ml-2" />;
 };

 const activeClass = "bg-slate-700 text-white font-medium"; 
 const inactiveClass = "hover:bg-slate-700 text-slate-300";


 return (
  <header className=" bg-slate-950">
   <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
    <div className="flex items-center gap-2">
     <img src={Logo} alt="Weather Now Logo" />
    </div>

    <div className="relative">
     <button
      onClick={() => setShowUnits(!showUnits)}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-50 border border-slate-600 transition-colors"
     >
      <img src={UnitsIcon} alt="Units Icon" className="w-5 h-5" />
      <span>Units</span>
      <img 
       src={DropdownIcon} 
       alt="Dropdown" 
       className={`w-3 h-3 transition-transform ${showUnits ? 'rotate-180' : ''}`}
      />
     </button>

     {showUnits && (
      <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50">
       <div className="p-4">
        
        <button
         onClick={() => handleItemSelect(targetUnit as 'metric' | 'imperial')}
         className="w-full mb-4 px-3 py-2 rounded border border-indigo-600 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors text-sm"
        >
         Switch to {targetMode}
        </button>
        
        <div className="text-sm text-slate-400 mb-4 border-t border-slate-700 pt-4">
         <p className="font-semibold text-slate-300 mb-2">Temperature</p>
         <button
          onClick={() => handleItemSelect("metric")}
          className={`flex items-center justify-between w-full text-left px-3 py-2 rounded mb-2 transition-colors ${
           unit === "metric" ? activeClass : inactiveClass
          }`}
         >
          <span>Celsius (°C)</span> {renderCheckmark(unit === "metric")}
         </button>
         <button
          onClick={() => handleItemSelect("imperial")}
          className={`flex items-center justify-between w-full text-left px-3 py-2 rounded transition-colors ${
           unit === "imperial" ? activeClass : inactiveClass
          }`}
         >
          <span>Fahrenheit (°F)</span> {renderCheckmark(unit === "imperial")}
         </button>
        </div>

        <div className="text-sm text-slate-400 mb-4 border-t border-slate-700 pt-4">
         <p className="font-semibold text-slate-300 mb-2">Wind Speed</p>
         <button
          onClick={() => handleItemSelect("metric")}
          className={`flex items-center justify-between w-full text-left px-3 py-2 rounded mb-2 transition-colors ${
           unit === "metric" ? activeClass : inactiveClass
          }`}
         >
          <span>km/h (Metric)</span> {renderCheckmark(unit === "metric")}
         </button>
         <button
          onClick={() => handleItemSelect("imperial")}
          className={`flex items-center justify-between w-full text-left px-3 py-2 rounded transition-colors ${
           unit === "imperial" ? activeClass : inactiveClass
          }`}
         >
          <span>mph (Imperial)</span> {renderCheckmark(unit === "imperial")}
         </button>
        </div>

        <div className="text-sm text-slate-400 border-t border-slate-700 pt-4">
         <p className="font-semibold text-slate-300 mb-2">Precipitation</p>
         <button
          onClick={() => handleItemSelect("metric")}
          className={`flex items-center justify-between w-full text-left px-3 py-2 rounded mb-2 transition-colors ${
           unit === "metric" ? activeClass : inactiveClass
          }`}
         >
          <span>Millimeters (mm)</span> {renderCheckmark(unit === "metric")}
         </button>
         <button
          onClick={() => handleItemSelect("imperial")}
          className={`flex items-center justify-between w-full text-left px-3 py-2 rounded transition-colors ${
           unit === "imperial" ? activeClass : inactiveClass
          }`}
         >
          <span>Inches (in)</span> {renderCheckmark(unit === "imperial")}
         </button>
        </div>
       </div>
      </div>
     )}
    </div>
   </div>
  </header>
 );
}