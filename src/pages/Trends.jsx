import React from 'react'
import TrendChart from '../components/TrendChart'
import PageHeader from '../components/PageHeader'

export default function Trends(){
  return (
    <section className="space-y-6">
      <PageHeader
        label="Historical Trends"
        title="Trends & Analytics"
        subtitle="Compare metrics, spot anomalies, and visualize history."
      />

      <TrendChart data={[24, 25, 24.5, 24.3, 23.8, 24]} />
    </section>
  )
}
