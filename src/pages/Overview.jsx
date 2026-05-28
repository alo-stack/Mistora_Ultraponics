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
  

  return (
    <section className="space-y-5 lg:space-y-6">
      <PageHeader
        label="System snapshot"
        title="Live Overview"
        subtitle="Key environment metrics at a glance — auto‑refreshing cards."
      />

      {/* Metric overview removed per request */}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {sensors.map((sensor) => (
          <SensorCard key={sensor.id} {...sensor} />
        ))}
      </div>
    </section>
  )
}
