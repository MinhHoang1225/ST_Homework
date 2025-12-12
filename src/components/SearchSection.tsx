"use client";
import { useState, useRef } from "react";
import { SearchIcon } from "../assets/index";
import type { SearchSectionProps } from '../types/weather';

export default function SearchSection({
  onSearch,
  onSearchChange,
  searchResults,
  onSelectLocation,
  loading,
}: SearchSectionProps) {
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null); 

  const handleSearch = () => {
    if (searchValue.trim()) {
      onSelectLocation(searchValue);
      setSearchValue("");
    } else {
      onSearch("Berlin, Germany");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value);
    setShowDropdown(true);
  };

  return (
    <div className="mb-8 md:mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-8 text-center">
        How's the sky looking today?
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6 relative max-w-xl mx-auto">
        <div className="flex-1 relative">
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
              <img src={SearchIcon} alt="Search Icon" className="w-5 h-5" />
            </span>

            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for a place..."
              value={searchValue}
              onChange={handleInputChange}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {showDropdown && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50 w-full">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onSelectLocation(result);
                    setSearchValue("");
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-700 text-slate-50 border-b border-slate-700 last:border-b-0 transition-colors"
                >
                  {result}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-500 text-white font-semibold transition-colors md:w-auto"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <p className="text-slate-400 text-sm">⚙️ Search in progress</p>
        </div>
      )}
    </div>
  );
}
