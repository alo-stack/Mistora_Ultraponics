import React from 'react'

export default function ControlPanel({isAuto, setIsAuto}){
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Auto Mode</p>
            <h3 className="font-display mt-1 text-lg font-bold text-slate-900 dark:text-white">Adaptive watering control</h3>
          </div>

          <button
            type="button"
            onClick={() => setIsAuto(!isAuto)}
            className={[
              'inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition',
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
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-slate-900 p-5 text-white shadow-soft dark:border-slate-800">
        <p className="text-sm font-medium text-slate-300">Manual Override</p>
        <h3 className="font-display mt-1 text-lg font-bold">Trigger a mist cycle</h3>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          Use this when a quick correction is needed outside the automation window.
        </p>

        <button
          type="button"
          className="mt-5 inline-flex items-center rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Mist now
        </button>
      </div>
    </div>
  )
}
