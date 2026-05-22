import React, { useState } from 'react'
import SensorCard from '../components/SensorCard'
import PageHeader from '../components/PageHeader'

const sampleSensors = [
  { id: 'temp', label: 'Temperature', value: 24.3, unit: '°C', min: 15, max: 35 },
  { id: 'hum', label: 'Humidity', value: 68, unit: '%', min: 40, max: 80 },
  { id: 'ec', label: 'EC', value: 1.25, unit: 'mS/cm', min: 0.5, max: 2.5 },
]

export default function Overview(){
  const [sensors] = useState(sampleSensors)
  const metrics = [
    { label: 'Target range', value: '22-28°C', detail: 'Comfortable and stable' },
    { label: 'Air stability', value: '92%', detail: 'Above threshold' },
    { label: 'Auto cycles', value: '18 today', detail: '2 scheduled soon' },
  ]

  return (
    <section className="space-y-5 lg:space-y-6">
      <PageHeader
        label="System snapshot"
        title="Live Overview"
        subtitle="Key environment metrics at a glance — auto‑refreshing cards."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="dashboard-card-soft px-4 py-4 sm:px-5">
            <p className="surface-label">{metric.label}</p>
            <p className="surface-title mt-2 text-xl font-bold tracking-tight sm:text-2xl">{metric.value}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{metric.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {sensors.map((sensor) => (
          <SensorCard key={sensor.id} {...sensor} />
        ))}
      </div>
    </section>
  )
}
