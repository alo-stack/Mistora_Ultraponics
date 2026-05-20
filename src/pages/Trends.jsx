import React from 'react'
import TrendChart from '../components/TrendChart'

export default function Trends(){
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Historical view</p>
        <h2 className="font-display mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Trends</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          A compact trend chart helps confirm whether the system is moving toward the target range.
        </p>
      </div>

      <TrendChart data={[24, 25, 24.5, 24.3, 23.8, 24]} />
    </section>
  )
}
