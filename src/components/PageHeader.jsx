import React from 'react'

export default function PageHeader({ label, title, subtitle }){
  return (
    <div className="mb-5 space-y-2 sm:mb-6">
      <p className="surface-label">{label}</p>
      <h2 className="surface-title text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-[0.95rem]">{subtitle}</p>
      ) : null}
    </div>
  )
}
