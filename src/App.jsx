import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Overview from './pages/Overview'
import Trends from './pages/Trends'
import Controls from './pages/Controls'
import Logs from './pages/Logs'

export default function App(){
  const location = useLocation()
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light'
    }

    const storedTheme = window.localStorage.getItem('mistora-theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('mistora-theme', theme)
  }, [theme])

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 lg:flex">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.10),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.85),rgba(248,250,252,1))] dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(34,197,94,0.10),transparent_26%),linear-gradient(180deg,rgba(2,6,23,1),rgba(15,23,42,1))]" />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
        />
      ) : null}
      <div className="relative flex min-h-screen flex-1 flex-col">
        <Topbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Navigate to="/overview" replace />} />
            <Route path="/overview" element={<Overview/>} />
            <Route path="/trends" element={<Trends/>} />
            <Route path="/controls" element={<Controls/>} />
            <Route path="/logs" element={<Logs/>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
