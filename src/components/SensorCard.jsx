import React from 'react'

export default function SensorCard({label, value, unit, min=0, max=100}){
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min || 1)) * 100))
  const trend = pct > 66 ? 'High' : pct < 33 ? 'Low' : 'Stable'
  const accentClass = pct > 66
    ? 'from-amber-500 to-orange-500'
    : pct < 33
      ? 'from-cyan-500 to-sky-500'
      : 'from-emerald-500 to-teal-500'
  const textColor = pct > 66 ? 'text-amber-500' : pct < 33 ? 'text-cyan-500' : 'text-emerald-500'
  const textColorDark = pct > 66 ? 'dark:text-amber-200' : pct < 33 ? 'dark:text-cyan-200' : 'dark:text-emerald-200'
  const statusText = trend === 'High' ? 'Above target' : trend === 'Low' ? 'Below target' : 'Within target'
  const statusKey = trend === 'High' ? 'Above' : trend === 'Low' ? 'Below' : 'Within'
  const guides = {
    Temperature: {
      Below: 'Too cold: Slow growth, poor uptake',
      Within: 'Optimal: Good O₂, healthy roots',
      Above: 'Too warm: Root rot, low O₂',
    },
    Humidity: {
      Below: 'Too dry: Roots desiccate fast',
      Within: 'Optimal: Moist, active roots',
      Above: 'Too humid: Mold, bacterial growth',
    },
    EC: {
      Below: 'Too dilute: Deficiency, pale leaves',
      Within: 'Optimal: Balanced nutrients',
      Above: 'Too strong: Nutrient burn, stress',
    },
  }
  const guideText = (guides[label] && guides[label][statusKey]) || ''

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

        <span className={`shrink-0 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur ${textColor} ${textColorDark}`}>
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
        {guideText ? (
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="text-sm font-normal">{guideText}</span>
          </div>
        ) : null}
      </div>
    </article>
  )
}
