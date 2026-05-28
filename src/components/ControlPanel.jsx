import React from 'react'

export default function ControlPanel({isAuto, onToggleAutoMode, onManualMist}){
  const modeLabel = isAuto ? 'Automation is active' : 'Manual control is active'
  const modeDetail = isAuto
    ? 'The system will balance mist output using the calibrated threshold ranges.'
    : 'Manual overrides will take priority until automation is re-enabled.'

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="dashboard-card-soft p-3 sm:p-4">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Auto Mode</p>
            <h3 className="font-display mt-1 text-base font-bold text-slate-900 dark:text-white sm:text-lg">Adaptive watering control</h3>
          </div>

          <button
            type="button"
            onClick={onToggleAutoMode}
            className={[
              'inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold tracking-tight transition motion-safe:hover:-translate-y-0.5 sm:w-auto sm:px-5',
              isAuto
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_14px_30px_-18px_rgba(16,185,129,0.85)]'
                : 'border border-slate-200 bg-white text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200',
            ].join(' ')}
          >
            {isAuto ? 'Auto mode enabled' : 'Enable auto mode'}
          </button>

          <div className={`rounded-2xl border px-3 py-2.5 text-sm ${isAuto ? 'border-emerald-200/80 bg-emerald-50/70 text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200' : 'border-slate-200/80 bg-slate-50/70 text-slate-700 dark:border-slate-800/80 dark:bg-slate-950/60 dark:text-slate-300'}`}>
            <p className="font-semibold">{modeLabel}</p>
            <p className="mt-1 leading-5">{modeDetail}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
          When enabled, the system automatically balances mist output based on live sensor readings and the calibrated thresholds.
        </p>
      </div>

      <div className="dashboard-card-soft p-3 text-slate-900 dark:text-slate-100 sm:p-4">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Manual Override</p>
            <h3 className="font-display mt-1 text-base font-bold text-slate-900 dark:text-white sm:text-lg">Trigger a mist cycle</h3>
          </div>

          <button
            type="button"
            onClick={onManualMist}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(6,182,212,0.95)] transition motion-safe:hover:-translate-y-0.5 hover:bg-cyan-400 sm:w-auto sm:px-5"
          >
            Mist now
          </button>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Use this when a quick correction is needed outside the automation window.
        </p>
      </div>
    </div>
  )
}
