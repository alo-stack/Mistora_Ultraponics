import React, { useEffect, useState } from 'react'

export default function Topbar({ theme, onToggleTheme, onOpenSidebar, espOnline = true }){
  const [now, setNow] = useState(() => new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/65 px-4 py-3 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/65 sm:px-6 sm:py-4 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            aria-label="Open navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-500/40 dark:hover:text-sky-300 lg:hidden"
          >
            <MenuIcon />
          </button>

          <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">Mistora Dashboard</p>
        </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <div className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-medium sm:text-sm ${espOnline ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300' : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300'}`}>
            <span className={`h-2.5 w-2.5 rounded-full ${espOnline ? 'bg-emerald-500 shadow-[0_0_0_4px_rgba(34,197,94,0.15)]' : 'bg-slate-400'}`} />
            {espOnline ? 'ESP32 Online' : 'ESP32 Offline'}
          </div>

          <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 sm:block">
            {now}
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-500/40 dark:hover:text-sky-300"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  )
}

function MenuIcon(){
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[2]">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon(){
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M21 12.7A9 9 0 1 1 11.3 3a7.5 7.5 0 0 0 9.7 9.7Z" />
    </svg>
  )
}

function SunIcon(){
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M12 18a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V19a1 1 0 0 1 1-1Zm0-14a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Zm8 8a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-1.5a1 1 0 1 1 0-2H20Zm-14 0a1 1 0 0 1 1 1 1 1 0 0 1-1 1H4.5a1 1 0 1 1 0-2H6Zm11.657 5.657a1 1 0 0 1 1.414 0l1.06 1.06a1 1 0 0 1-1.414 1.415l-1.06-1.06a1 1 0 0 1 0-1.415ZM6.28 6.28a1 1 0 0 1 1.415 0l1.06 1.06A1 1 0 0 1 7.34 8.755L6.28 7.694a1 1 0 0 1 0-1.414Zm11.79 1.06a1 1 0 0 1 0-1.414l1.06-1.06a1 1 0 1 1 1.415 1.414l-1.06 1.06a1 1 0 0 1-1.415 0ZM6.28 17.72a1 1 0 0 1 0-1.415l1.06-1.06a1 1 0 0 1 1.415 1.415l-1.06 1.06a1 1 0 0 1-1.414 0ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
    </svg>
  )
}
