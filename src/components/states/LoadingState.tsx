"use client"
export default function LoadingState() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-8 h-48 animate-pulse" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-800 rounded-2xl p-6 h-24 animate-pulse" />
          ))}
        </div>

        <div>
          <div className="h-6 bg-slate-800 rounded w-32 mb-4 animate-pulse" />
          <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="bg-slate-800 rounded-2xl p-4 h-32 animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 h-96">
        <div className="h-6 bg-slate-700 rounded w-32 mb-6 animate-pulse" />
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-slate-700 rounded-lg h-12 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
