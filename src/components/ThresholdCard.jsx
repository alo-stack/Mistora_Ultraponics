import React from 'react'

const sensorConfig = [
  { key: 'temp', label: 'Temperature', unit: '°C', step: '0.1', min: '-20', max: '60' },
  { key: 'humidity', label: 'Humidity', unit: '%', step: '1', min: '0', max: '100' },
  { key: 'ec', label: 'EC', unit: 'mS/cm', step: '0.01', min: '0', max: '10' },
]

export default function ThresholdCard({
  thresholds,
  onThresholdChange,
  onSave,
  onCancel,
  onReset,
  isLoading,
  isSaving,
  saveState,
  saveError,
}){
  const actionMessage = saveState === 'saved'
    ? 'Thresholds saved to Firestore.'
    : saveState === 'error'
      ? 'Unable to save. Check your connection and try again.'
      : 'Changes are local until you save them.'

  return (
    <div className="dashboard-card-soft p-3.5 sm:p-4">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="surface-label">Calibration</p>
          <h3 className="font-display mt-1 text-base font-bold text-slate-900 dark:text-white sm:text-lg">Threshold settings</h3>
        </div>
        <p className="max-w-lg text-xs leading-5 text-slate-600 dark:text-slate-300 sm:text-right sm:text-sm">
          Set the operating range for each sensor. These values drive the adaptive watering logic.
        </p>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {sensorConfig.map((sensor) => (
          <div key={sensor.key} className="rounded-2xl border border-slate-200/70 bg-slate-50/75 p-3 dark:border-slate-800/70 dark:bg-slate-950/40">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{sensor.label}</p>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{sensor.unit}</span>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <label className="space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Min</span>
                <input
                  type="number"
                  inputMode="decimal"
                  step={sensor.step}
                  min={sensor.min}
                  max={sensor.max}
                  value={thresholds[sensor.key].min}
                  onChange={(event) => onThresholdChange(sensor.key, 'min', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
                />
              </label>

              <label className="space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Max</span>
                <input
                  type="number"
                  inputMode="decimal"
                  step={sensor.step}
                  min={sensor.min}
                  max={sensor.max}
                  value={thresholds[sensor.key].max}
                  onChange={(event) => onThresholdChange(sensor.key, 'max', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-200/70 pt-4 dark:border-slate-800/70 sm:flex-row sm:items-center sm:justify-between">
        <div className="sm:max-w-md">
          <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
            {isLoading ? 'Loading saved thresholds from Firestore...' : actionMessage}
          </p>
          {saveError ? (
            <p className="mt-1 text-xs text-rose-500">{saveError}</p>
          ) : null}
        </div>

        <div className="grid gap-2 sm:flex sm:flex-wrap sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading || isSaving}
            className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onReset}
            disabled={isLoading || isSaving}
            className="inline-flex w-full items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-800 transition hover:border-amber-300 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200 dark:hover:border-amber-500/40 dark:hover:bg-amber-500/15 sm:w-auto"
          >
            Revert to default
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={isLoading || isSaving}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(6,182,212,0.95)] transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSaving ? 'Saving...' : 'Save thresholds'}
          </button>
        </div>
      </div>
    </div>
  )
}