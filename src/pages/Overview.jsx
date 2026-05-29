import React, { useEffect, useState } from 'react'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import SensorCard from '../components/SensorCard'
import PageHeader from '../components/PageHeader'
import { db } from '../firebase'

const sampleSensors = [
  { id: 'temp', label: 'Temperature', value: 24.3, unit: '°C', min: 15, max: 35 },
  { id: 'hum', label: 'Humidity', value: 68, unit: '%', min: 40, max: 80 },
  { id: 'ec', label: 'EC', value: 1.25, unit: 'mS/cm', min: 0.5, max: 2.5 },
]

const formatEventDate = (createdAt) => {
  if (!createdAt) return 'Unknown time'
  return createdAt.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function Overview(){
  const [sensors] = useState(sampleSensors)
  const [latestLog, setLatestLog] = useState(null)

  useEffect(() => {
    const logsQuery = query(
      collection(db, 'activity_logs'),
      orderBy('createdAt', 'desc'),
      limit(1),
    )

    const unsubscribe = onSnapshot(logsQuery, (snapshot) => {
      const latest = snapshot.docs[0]?.data()
      if (!latest) {
        setLatestLog(null)
        return
      }

      setLatestLog({
        id: snapshot.docs[0].id,
        type: latest.type || 'system',
        title: latest.title || 'System event',
        detail: latest.detail || 'No details provided.',
        severity: latest.severity || 'info',
        createdAt: latest.createdAt?.toDate?.() || null,
      })
    }, () => {
      setLatestLog(null)
    })

    return unsubscribe
  }, [])

  return (
    <section className="space-y-5 lg:space-y-6">
      <PageHeader
        label="System snapshot"
        title="Live Overview"
        subtitle="Key environment metrics at a glance — auto‑refreshing cards."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {sensors.map((sensor) => (
          <SensorCard key={sensor.id} {...sensor} />
        ))}

        <article className="dashboard-card group rounded-2xl p-4 backdrop-blur sm:p-5 xl:col-span-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="surface-label transition group-hover:text-slate-700 dark:group-hover:text-slate-200">Latest activity</p>
              <div className="mt-3">
                <p className="surface-title text-2xl font-bold tracking-tight sm:text-3xl">
                  {latestLog ? latestLog.title : 'No recent events'}
                </p>
                {latestLog ? (
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 sm:text-[0.95rem]">
                    {latestLog.detail}
                  </p>
                ) : null}
              </div>
            </div>
            <span className="shrink-0 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-950/60 dark:text-slate-200">
              {latestLog ? latestLog.type.replace('_', ' ') : 'Idle'}
            </span>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{latestLog ? 'Recorded' : 'No data available'}</span>
              <span>{latestLog ? formatEventDate(latestLog.createdAt) : '—'}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
