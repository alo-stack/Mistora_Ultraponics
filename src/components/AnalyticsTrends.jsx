import React, {useMemo, useState} from 'react'
import TrendChart from './TrendChart'

function generateSampleData(points, seed=0, base=20, variance=2){
  // deterministic-ish sample generator for demo purposes
  const arr = []
  let v = base + (seed % 5)
  for(let i=0;i<points;i++){
    v = v + (Math.sin((i+seed)/5) * variance * 0.6) + ((Math.random()-0.5) * variance * 0.4)
    arr.push(Number(v.toFixed(2)))
  }
  return arr
}

export default function AnalyticsTrends(){
  const ranges = [
    {key: 'live', label: 'Live', points: 30},
    {key: '1h', label: '1 hr', points: 60},
    {key: '24h', label: '24 hrs', points: 96},
    {key: '7d', label: '7 days', points: 168},
  ]

  const [range, setRange] = useState('live')

  const active = ranges.find(r => r.key === range) || ranges[0]

  const temperature = useMemo(() => generateSampleData(active.points, 1, 24, 1.2), [active])
  const humidity = useMemo(() => generateSampleData(active.points, 3, 56, 4), [active])
  const ec = useMemo(() => generateSampleData(active.points, 5, 1.8, 0.4), [active])

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Trends & Analytics</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Deep dive into temperature, humidity and EC over selectable time ranges.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full bg-slate-100/60 dark:bg-slate-800/40 p-1 flex items-center gap-1 shadow-sm">
            {ranges.map(r => (
              <button
                key={r.key}
                onClick={() => setRange(r.key)}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-150 ${r.key === range ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow' : 'text-slate-600 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-slate-700/60'}`}
                aria-pressed={r.key === range}
                aria-label={`Show ${r.label}`}
              >
                <span className="block leading-none">{r.label}</span>
              </button>
            ))}
          </div>

          <div className="ml-2 text-xs text-slate-500 dark:text-slate-400">Showing: <span className="font-semibold text-slate-700 dark:text-slate-200">{ranges.find(r=>r.key===range)?.label}</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        <div className="h-full">
          <TrendChart data={temperature} title="Temperature" unit="°C" colors={{lineStart: '#fb7185', lineEnd: '#ef4444', fill: '#fb7185'}} />
        </div>
        <div className="h-full">
          <TrendChart data={humidity} title="Humidity" unit="%" colors={{lineStart: '#06b6d4', lineEnd: '#3b82f6', fill: '#06b6d4'}} />
        </div>
        <div className="h-full">
          <TrendChart data={ec} title="EC (Electrical Conductivity)" unit="mS/cm" colors={{lineStart: '#10b981', lineEnd: '#059669', fill: '#10b981'}} />
        </div>
      </div>

      <div className="mt-2 text-sm text-slate-500">Tip: Hover over the charts to see precise values. Use the range buttons to switch time windows.</div>
    </section>
  )
}
