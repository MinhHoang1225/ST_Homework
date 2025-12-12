import type { DailyForecastProps } from '../types/weather';

export default function DailyForecast({ data }: DailyForecastProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-slate-50 mb-4">Daily forecast</h3>
      <div className="grid grid-cols-4 md:grid-cols-7 gap-3 overflow-x-auto pb-2">
        {data.daily.map((day, index) => (
          <div
            key={index}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-4 text-center hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <p className="text-slate-300 text-sm mb-3 font-semibold">{day.day}</p>
            
            <img 
              src={day.icon} 
              alt={`${day.day} weather icon`} 
              className="w-10 h-10 mx-auto mb-3"
            />
            
            <div className="flex justify-center gap-2">
              <p className="text-slate-50 font-semibold">{day.high}°</p>
              <p className="text-slate-500">{day.low}°</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}