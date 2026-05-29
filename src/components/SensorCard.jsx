import React from 'react'

export default function SensorCard({label, value, unit, min=0, max=100}){
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min || 1)) * 100))
  const trend = pct > 66 ? 'High' : pct < 33 ? 'Low' : 'Stable'
  const accentClass = pct > 66
    ? 'from-amber-500 to-orange-500'
    : pct < 33
      ? 'from-cyan-500 to-sky-500'
      : 'from-emerald-500 to-teal-500'
  const statusText = trend === 'High' ? 'Above target' : trend === 'Low' ? 'Below target' : 'Within target'

  return (
    <article className="dashboard-card group rounded-2xl p-4 backdrop-blur sm:p-5">

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="surface-label transition group-hover:text-slate-700 dark:group-hover:text-slate-200">{label}</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="surface-title text-2xl font-bold tracking-tight sm:text-3xl">{value}</span>
            <span className="pb-1 text-sm font-medium text-slate-500 dark:text-slate-400 sm:text-[0.95rem]">{unit}</span>
          </div>
        </div>

        <span className={`shrink-0 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-950/60 dark:text-slate-200`}>
          {trend}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${accentClass} transition-all duration-300`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{statusText}</span>
          <span>{min} - {max}</span>
        </div>
      </div>
    </article>
  )
}
