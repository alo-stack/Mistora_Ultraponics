import React from 'react'
import TrendChart from '../components/TrendChart'
import PageHeader from '../components/PageHeader'

const sensorTrends = [
  {
    id: 'temp',
    label: 'Temperature',
    title: 'Temperature over recent intervals',
    status: 'Live',
    statusClass: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
    data: [24.2, 24.8, 25.0, 24.6, 24.9, 24.3]
  },
  {
    id: 'humidity',
    label: 'Humidity',
    title: 'Humidity over recent intervals',
    status: 'Live',
    statusClass: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
    data: [65, 67, 69, 68, 67, 68]
  },
  {
    id: 'ec',
    label: 'EC',
    title: 'Conductivity over recent intervals',
    status: 'Live',
    statusClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    data: [1.15, 1.20, 1.25, 1.28, 1.24, 1.25]
  }
]

export default function Trends(){
  return (
    <section className="space-y-6">
      <PageHeader
        label="Historical Trends"
        title="Trends & Analytics"
        subtitle="Compare metrics, spot anomalies, and visualize history."
      />

      <div className="grid gap-4 xl:grid-cols-3">
        {sensorTrends.map(trend => (
          <TrendChart key={trend.id} {...trend} />
        ))}
      </div>
    </section>
  )
}
