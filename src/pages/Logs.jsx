import React from 'react'
import PageHeader from '../components/PageHeader'

export default function Logs(){
  const logs = [
    { time: '08:42', label: 'Humidity normalized', detail: 'Auto mode reduced mist output after target was reached.', group: 'Recent activity', tone: 'success' },
    { time: '08:21', label: 'Manual mist cycle', detail: 'Operator triggered a 30 second override from the control panel.', group: 'Recent activity', tone: 'warning' },
    { time: '07:58', label: 'Controller online', detail: 'ESP32 connected and started streaming sensor data.', group: 'System events', tone: 'info' },
  ]

  const groupedLogs = logs.reduce((groups, log) => {
    if (!groups[log.group]) {
      groups[log.group] = []
    }

    groups[log.group].push(log)
    return groups
  }, {})

  const toneClasses = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300',
    warning: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300',
    info: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300',
  }

  return (
    <section className="space-y-6">
      <PageHeader
        label="Activity stream"
        title="Event Logs"
        subtitle="Searchable history of system events, warnings, and alerts."
      />

      <div className="space-y-5">
        {Object.entries(groupedLogs).map(([groupName, groupLogs]) => (
          <div key={groupName} className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="surface-title text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">{groupName}</h3>
              <span className="rounded-full border border-slate-200/80 bg-white/75 px-3 py-1 text-xs font-semibold text-slate-500 backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/55 dark:text-slate-300">
                {groupLogs.length} events
              </span>
            </div>

            <div className="space-y-3">
              {groupLogs.map((log) => (
                <div key={log.time + log.label} className="dashboard-card-soft p-4 transition duration-300 motion-safe:hover:-translate-y-0.5 sm:p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${toneClasses[log.tone]}`}>
                      {log.tone}
                    </span>
                    <span className="rounded-full border border-slate-200/80 bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/55 dark:text-slate-300">
                      {log.time}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-base font-semibold text-slate-900 dark:text-white">{log.label}</h4>
                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{log.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
