import React, { useState } from 'react'
import SensorCard from '../components/SensorCard'

const sampleSensors = [
  { id: 'temp', label: 'Temperature', value: 24.3, unit: '°C', min: 15, max: 35 },
  { id: 'hum', label: 'Humidity', value: 68, unit: '%', min: 40, max: 80 },
  { id: 'ec', label: 'EC', value: 1.25, unit: 'mS/cm', min: 0.5, max: 2.5 },
]

export default function Overview(){
  const [sensors] = useState(sampleSensors)
  const metrics = [
    { label: 'Target range', value: '22-28°C' },
    { label: 'Air stability', value: '92%' },
    { label: 'Auto cycles', value: '18 today' },
  ]

  return (
    <section className="space-y-5 lg:space-y-6">
      <div className="flex flex-col gap-2 sm:gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">System snapshot</p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Live overview</h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Monitor the most important environment values at a glance. The cards update instantly when the data changes.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-3xl border border-slate-200/80 bg-white/80 px-4 py-4 shadow-soft dark:border-slate-800 dark:bg-slate-900/80 sm:px-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{metric.label}</p>
            <p className="font-display mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {sensors.map((sensor) => (
          <SensorCard key={sensor.id} {...sensor} />
        ))}
      </div>
    </section>
  )
}
