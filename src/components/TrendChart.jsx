import React from 'react'

export default function TrendChart({data=[]}){
  const w = 600, h = 120, pad = 8
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const points = data.map((v,i) => {
    const x = pad + (i/(Math.max(1,data.length-1))) * (w - pad*2)
    const y = pad + (1 - (v - min)/(max - min || 1)) * (h - pad*2)
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Sensor trend</p>
          <p className="font-display text-lg font-bold text-slate-900 dark:text-white">Stable over the last intervals</p>
        </div>
        <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Live</div>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="160" preserveAspectRatio="none" className="block">
        <defs>
          <linearGradient id="mistoraChartLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="mistoraChartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1={h - pad} x2={w} y2={h - pad} stroke="rgba(148,163,184,0.25)" strokeWidth="1" />
        <path
          d={`M ${pad} ${h - pad} ${points ? `L ${points} L ${w - pad} ${h - pad} Z` : ''}`}
          fill="url(#mistoraChartFill)"
        />
        <polyline fill="none" stroke="url(#mistoraChartLine)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} />
      </svg>
    </div>
  )
}
