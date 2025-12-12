"use client"
import { RetryIcon,  } from "../../assets/index";

export default function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center"> 
    
      <div className="mb-6">
        <img src={RetryIcon} alt="Error"  />
      </div>

      <h2 className="text-4xl font-bold text-slate-50 mb-3">No search result found!</h2>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
      >
        <img src={RetryIcon} alt="Retry" className="w-5 h-5 animate-spin-slow" />
        Retry
      </button>
    </div>
  )
}