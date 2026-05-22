import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ isOpen, onClose }){
  return (
    <aside className={[
      'fixed inset-y-0 left-0 z-40 w-[min(18rem,86vw)] shrink-0 border-r border-slate-200/70 bg-white/95 px-5 py-5 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl transition-transform duration-300 ease-out dark:border-slate-800 dark:bg-slate-950/95 lg:static lg:z-auto lg:flex lg:w-80 lg:flex-col lg:translate-x-0 lg:px-6 lg:py-8 lg:shadow-none',
      isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 lg:translate-x-0 lg:opacity-100',
    ].join(' ')}>
      <div className="mb-6 flex items-center justify-between gap-3 lg:mb-8 lg:justify-start">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 text-sm font-bold text-white shadow-glow shadow-cyan-500/25">
            M
          </div>
          <div>
            <div className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">Mistora</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Ultraponics control</div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-sky-500/40 dark:hover:text-sky-300 lg:hidden"
        >
          <CloseIcon />
        </button>
      </div>

      <nav className="space-y-1.5 sm:space-y-2">
        {[
          { to: '/overview', label: 'Overview' },
          { to: '/trends', label: 'Trends' },
          { to: '/controls', label: 'Controls' },
          { to: '/logs', label: 'Logs' },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) => [
              'flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 motion-safe:hover:-translate-y-0.5',
              isActive
                ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-cyan-800 ring-1 ring-cyan-500/15 shadow-sm dark:from-cyan-400/10 dark:to-blue-400/10 dark:text-cyan-200 dark:ring-cyan-400/10'
                : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white',
            ].join(' ')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

function CloseIcon(){
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[2]">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  )
}
