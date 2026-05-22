import React from 'react'

export default function ControlPanel({isAuto, setIsAuto}){
  const modeLabel = isAuto ? 'Automation is active' : 'Manual control is active'
  const modeDetail = isAuto
    ? 'The system will balance mist output using live sensor readings.'
    : 'Manual overrides will take priority until automation is re-enabled.'

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="dashboard-card-soft p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Auto Mode</p>
            <h3 className="font-display mt-1 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">Adaptive watering control</h3>
          </div>

          <button
            type="button"
            onClick={() => setIsAuto(!isAuto)}
            className={[
              'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition motion-safe:hover:-translate-y-0.5 sm:self-start',
              isAuto
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
            ].join(' ')}
          >
            {isAuto ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
          When enabled, the system automatically balances mist output based on live sensor readings.
        </p>

        <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${isAuto ? 'border-emerald-200/80 bg-emerald-50/70 text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200' : 'border-slate-200/80 bg-slate-50/70 text-slate-700 dark:border-slate-800/80 dark:bg-slate-950/60 dark:text-slate-300'}`}>
          <p className="font-semibold">{modeLabel}</p>
          <p className="mt-1 leading-6">{modeDetail}</p>
        </div>
      </div>

      <div className="dashboard-card-soft p-4 text-slate-900 dark:text-slate-100 sm:p-5">
        <p className="text-sm font-medium text-slate-300">Manual Override</p>
        <h3 className="font-display mt-1 text-lg font-bold sm:text-xl">Trigger a mist cycle</h3>
        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Use this when a quick correction is needed outside the automation window.
        </p>

        <button
          type="button"
          className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-cyan-200/80 bg-cyan-500/90 px-4 py-3 text-sm font-semibold text-white transition motion-safe:hover:-translate-y-0.5 hover:bg-cyan-500 dark:border-cyan-500/20 dark:bg-cyan-500/85 sm:w-auto"
        >
          Mist now
        </button>
      </div>
    </div>
  )
}
