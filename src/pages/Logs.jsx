import React, { useEffect, useMemo, useState } from 'react'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import PageHeader from '../components/PageHeader'
import { db } from '../firebase'

export default function Logs(){
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const logsQuery = query(
      collection(db, 'activity_logs'),
      orderBy('createdAt', 'desc'),
      limit(120),
    )

    const unsubscribe = onSnapshot(logsQuery, (snapshot) => {
      const nextLogs = snapshot.docs.map((documentSnapshot) => {
        const data = documentSnapshot.data()
        return {
          id: documentSnapshot.id,
          type: data.type || 'system',
          title: data.title || 'System event',
          detail: data.detail || 'No details provided.',
          severity: data.severity || 'info',
          createdAt: data.createdAt?.toDate?.() || null,
        }
      })

      setLogs(nextLogs)
      setErrorMessage('')
      setIsLoading(false)
    }, () => {
      setErrorMessage('Unable to load activity logs right now. Verify Firestore rules and try again.')
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  const filterOptions = [
    { value: 'all', label: 'All events' },
    { value: 'threshold_change', label: 'Threshold changes' },
    { value: 'mist_cycle', label: 'Mist usage' },
    { value: 'mode_change', label: 'Mode switches' },
    { value: 'system', label: 'System events' },
  ]

  const severityClasses = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200',
    warning: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200',
    info: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200',
    error: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200',
  }

  const filteredLogs = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return logs.filter((log) => {
      const matchesFilter = activeFilter === 'all' ? true : log.type === activeFilter
      const matchesSearch = normalizedSearch.length === 0
        ? true
        : `${log.title} ${log.detail}`.toLowerCase().includes(normalizedSearch)

      return matchesFilter && matchesSearch
    })
  }, [activeFilter, logs, searchTerm])

  const metrics = useMemo(() => {
    const thresholdCount = logs.filter((log) => log.type === 'threshold_change').length
    const mistCount = logs.filter((log) => log.type === 'mist_cycle').length

    return {
      total: logs.length,
      thresholdCount,
      mistCount,
    }
  }, [logs])

  const groupedLogs = useMemo(() => {
    return filteredLogs.reduce((groupMap, log) => {
      const dateLabel = log.createdAt
        ? log.createdAt.toLocaleDateString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
        : 'Pending timestamp'

      if (!groupMap[dateLabel]) {
        groupMap[dateLabel] = []
      }

      groupMap[dateLabel].push(log)
      return groupMap
    }, {})
  }, [filteredLogs])

  const getEventTypeLabel = (type) => {
    if (type === 'threshold_change') {
      return 'Threshold'
    }

    if (type === 'mist_cycle') {
      return 'Mist'
    }

    if (type === 'mode_change') {
      return 'Mode'
    }

    return 'System'
  }

  return (
    <section className="space-y-5">
      <PageHeader
        label="Activity stream"
        title="Event Logs"
        subtitle="Searchable history of threshold updates, mist cycles, and operating mode changes."
      />

      <div className="grid gap-3 md:grid-cols-3">
        <article className="dashboard-card-soft p-4">
          <p className="surface-label">All events</p>
          <p className="font-display mt-2 text-2xl font-bold text-slate-900 dark:text-white">{metrics.total}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Live records captured in this feed.</p>
        </article>

        <article className="dashboard-card-soft p-4">
          <p className="surface-label">Threshold updates</p>
          <p className="font-display mt-2 text-2xl font-bold text-slate-900 dark:text-white">{metrics.thresholdCount}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Calibration changes saved by operators.</p>
        </article>

        <article className="dashboard-card-soft p-4">
          <p className="surface-label">Mist usage</p>
          <p className="font-display mt-2 text-2xl font-bold text-slate-900 dark:text-white">{metrics.mistCount}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Manual mist cycles triggered on demand.</p>
        </article>
      </div>

      <div className="dashboard-card-soft space-y-4 p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
          <label className="space-y-1">
            <span className="surface-label">Search</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by event title or details"
              className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
            />
          </label>

          <label className="space-y-1">
            <span className="surface-label">Filter</span>
            <select
              value={activeFilter}
              onChange={(event) => setActiveFilter(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </div>

        {errorMessage ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
            {errorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-8 text-center text-sm text-slate-600 dark:border-slate-800/70 dark:bg-slate-950/40 dark:text-slate-300">
            Loading activity stream...
          </div>
        ) : null}

        {!isLoading && filteredLogs.length === 0 ? (
          <div className="rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-8 text-center dark:border-slate-800/70 dark:bg-slate-950/40">
            <p className="text-base font-semibold text-slate-900 dark:text-white">No matching events found</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Save threshold changes or trigger a mist cycle in Controls to populate this timeline.
            </p>
          </div>
        ) : null}

        {!isLoading ? (
          <div className="space-y-5">
            {Object.entries(groupedLogs).map(([dateLabel, dateLogs]) => (
              <section key={dateLabel} className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="surface-title text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{dateLabel}</h3>
                  <span className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-900/65 dark:text-slate-300">
                    {dateLogs.length} events
                  </span>
                </div>

                <div className="space-y-3">
                  {dateLogs.map((log) => (
                    <article key={log.id} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 transition duration-200 dark:border-slate-800/70 dark:bg-slate-950/45">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${severityClasses[log.severity] || severityClasses.info}`}>
                          {log.severity}
                        </span>
                        <span className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:border-slate-700 dark:bg-slate-900/65 dark:text-slate-300">
                          {getEventTypeLabel(log.type)}
                        </span>
                        <span className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:border-slate-700 dark:bg-slate-900/65 dark:text-slate-300">
                          {log.createdAt
                            ? log.createdAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
                            : 'Pending'}
                        </span>
                      </div>

                      <h4 className="text-base font-semibold text-slate-900 dark:text-white">{log.title}</h4>
                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{log.detail}</p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
