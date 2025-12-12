export default function MetricsGrid({ data }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <p className="text-slate-400 text-sm mb-2">Feels Like</p>
        <p className="text-3xl font-bold text-slate-50">{data.feelsLike}°</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <p className="text-slate-400 text-sm mb-2">Humidity</p>
        <p className="text-3xl font-bold text-slate-50">{data.humidity}%</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <p className="text-slate-400 text-sm mb-2">Wind</p>
        <p className="text-3xl font-bold text-slate-50">
          {data.wind} {data.windUnit}
        </p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <p className="text-slate-400 text-sm mb-2">Precipitation</p>
        <p className="text-3xl font-bold text-slate-50">
          {data.precipitation} {data.precipitationUnit}
        </p>
      </div>
    </div>
  )
}
