import React from 'react'

export default function Logs(){
  const logs = [
    { time: '08:42', label: 'Humidity normalized', detail: 'Auto mode reduced mist output after target was reached.' },
    { time: '08:21', label: 'Manual mist cycle', detail: 'Operator triggered a 30 second override from the control panel.' },
    { time: '07:58', label: 'Controller online', detail: 'ESP32 connected and started streaming sensor data.' },
  ]

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Activity stream</p>
        <h2 className="font-display mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Logs</h2>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div key={log.time + log.label} className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">{log.label}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{log.detail}</p>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                {log.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
