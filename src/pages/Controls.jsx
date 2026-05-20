import React, { useState } from 'react'
import ControlPanel from '../components/ControlPanel'

export default function Controls(){
  const [isAuto, setIsAuto] = useState(true)

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Actuation</p>
        <h2 className="font-display mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Controls</h2>
      </div>

      <ControlPanel isAuto={isAuto} setIsAuto={setIsAuto} />
    </section>
  )
}
