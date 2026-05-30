import React, { useEffect, useState } from 'react'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import SensorCard from '../components/SensorCard'
import PageHeader from '../components/PageHeader'
import { db } from '../firebase'
import { defaultThresholds, normalizeThresholds, thresholdsDocRef } from '../lib/thresholds'


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
  const [sensors, setSensors] = useState([])
  const [latestLog, setLatestLog] = useState(null)
  const [thresholds, setThresholds] = useState(defaultThresholds)

  useEffect(() => {
    const unsubscribe = onSnapshot(thresholdsDocRef, (snapshot) => {
      if (!snapshot.exists()) {
        setThresholds(defaultThresholds)
        return
      }

      setThresholds(normalizeThresholds(snapshot.data().thresholds))
    }, () => {
      setThresholds(defaultThresholds)
    })

    return unsubscribe
  }, [])

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

  // subscribe to latest sensor reading and populate sensor cards
  useEffect(() => {
    const latestReadingQuery = query(
      collection(db, 'sensor_readings'),
      orderBy('timestamp', 'desc'),
      limit(1),
    )

    const unsubscribe = onSnapshot(latestReadingQuery, (snapshot) => {
      const doc = snapshot.docs[0]?.data()
      if (!doc) {
        setSensors([])
        return
      }

      const reading = {
        temperature: typeof doc.temperature === 'number' ? doc.temperature : Number(doc.temperature) || 0,
        humidity: typeof doc.humidity === 'number' ? doc.humidity : Number(doc.humidity) || 0,
        ec: typeof doc.ec === 'number' ? doc.ec : Number(doc.ec) || 0,
      }

      setSensors([
        { id: 'temp', label: 'Temperature', value: reading.temperature, unit: '°C' },
        { id: 'hum', label: 'Humidity', value: reading.humidity, unit: '%' },
        { id: 'ec', label: 'EC', value: reading.ec, unit: 'mS/cm' },
      ])
    }, () => {
      setSensors([])
    })

    return unsubscribe
  }, [])

  return (
    <section className="space-y-5 lg:space-y-6">
      <PageHeader
        label="System snapshot"
        title="Live Overview"
        subtitle="Key environment metrics at a glance — auto-refreshing cards."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {sensors.map((sensor) => {
          const thresholdKey = sensor.id === 'hum' ? 'humidity' : sensor.id
          const sensorThresholds = thresholds[thresholdKey] || defaultThresholds[thresholdKey]

          return (
            <SensorCard
              key={sensor.id}
              {...sensor}
              min={sensorThresholds.min}
              max={sensorThresholds.max}
            />
          )
        })}

        <article className="dashboard-card group rounded-2xl p-4 backdrop-blur sm:p-5 xl:col-span-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <p className="surface-label transition group-hover:text-slate-700 dark:group-hover:text-slate-200">Latest activity</p>
              <div className="mt-2 sm:mt-3">
                <p className="surface-title text-[1.65rem] font-bold tracking-tight leading-tight sm:text-3xl">
                  {latestLog ? latestLog.title : 'No recent events'}
                </p>
                {latestLog ? (
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-[0.95rem]">
                    {latestLog.detail}
                  </p>
                ) : null}
              </div>
            </div>
            <span className="dashboard-chip shrink-0 self-start text-slate-700 dark:text-slate-200">
              {latestLog ? latestLog.type.replace('_', ' ') : 'Idle'}
            </span>
          </div>

          <div className="mt-4 space-y-2 border-t border-slate-200/70 pt-4 dark:border-slate-800/70">
            <div className="flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <span>{latestLog ? 'Recorded' : 'No data available'}</span>
              <span>{latestLog ? formatEventDate(latestLog.createdAt) : '—'}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
