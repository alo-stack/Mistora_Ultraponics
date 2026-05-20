import React from 'react'

export default function SensorCard({label, value, unit, min=0, max=100}){
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))
  const trend = pct > 66 ? 'High' : pct < 33 ? 'Low' : 'Stable'
  const accentClass = pct > 66
    ? 'from-amber-500 to-orange-500'
    : pct < 33
      ? 'from-cyan-500 to-sky-500'
      : 'from-emerald-500 to-teal-500'

  return (
    <article className="group rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-4 shadow-soft backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-glow dark:border-slate-800 dark:bg-slate-900/80 sm:p-5">
      <div className={`mb-4 h-1.5 rounded-full bg-gradient-to-r ${accentClass}`} />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 transition group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200">{label}</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</span>
            <span className="pb-1 text-sm font-medium text-slate-500 dark:text-slate-400">{unit}</span>
          </div>
        </div>

        <span className={`shrink-0 rounded-full bg-gradient-to-r ${accentClass} px-3 py-1 text-xs font-semibold text-white shadow-sm`}>
          {trend}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </article>
  )
}
