import React, {useMemo, useRef, useState} from 'react'

export default function TrendChart({
  data = [],
  title = 'Sensor',
  unit = '',
  height = 140,
  colors = {lineStart: '#06b6d4', lineEnd: '#3b82f6', fill: '#0ea5e9'},
}){
  const w = 600, h = 120, pad = 12
  const id = useRef(Math.random().toString(36).slice(2,9)).current
  const [hoverIndex, setHoverIndex] = useState(null)

  const max = useMemo(() => Math.max(...data, 1), [data])
  const min = useMemo(() => Math.min(...data, 0), [data])
  const startValue = data[0] ?? 0
  const endValue = data[data.length - 1] ?? 0
  const avg = useMemo(() => {
    if (!data || data.length === 0) return 0
    return Number((data.reduce((s,v)=>s+v,0)/data.length).toFixed(2))
  }, [data])

  const pointsArr = useMemo(() => data.map((v,i) => {
    const x = pad + (i/(Math.max(1,data.length-1))) * (w - pad*2)
    const y = pad + (1 - (v - min)/(max - min || 1)) * (h - pad*2)
    return {x,y,v}
  }), [data, min, max])

  const points = pointsArr.map(p => `${p.x},${p.y}`).join(' ')

  function handleMove(e){
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - pad
    const pct = Math.min(1, Math.max(0, x / (rect.width - pad*2)))
    const idx = Math.round(pct * (Math.max(1, data.length - 1)))
    setHoverIndex(idx)
  }

  function handleLeave(){ setHoverIndex(null) }

  const hoverPoint = hoverIndex != null ? pointsArr[hoverIndex] : null

  return (
    <div className="dashboard-card-soft p-4 sm:p-5 flex flex-col h-full bg-white dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="uppercase text-xs tracking-wide text-slate-500 dark:text-slate-400">{title}</p>
        </div>

        <div className="text-right">
          <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">{endValue}{unit ? ` ${unit}` : ''}</div>
        </div>
      </div>

      <div className="relative flex-1" onMouseMove={handleMove} onMouseLeave={handleLeave}>
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={height} preserveAspectRatio="none" className="block" role="img" aria-label={`${title} trend chart`}>
          <defs>
            <linearGradient id={`line-${id}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor={colors.lineStart} />
              <stop offset="100%" stopColor={colors.lineEnd} />
            </linearGradient>
            <linearGradient id={`fill-${id}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={colors.fill} stopOpacity="0.18" />
              <stop offset="100%" stopColor={colors.fill} stopOpacity="0" />
            </linearGradient>
          </defs>

          <line x1="0" y1={h - pad} x2={w} y2={h - pad} stroke="rgba(148,163,184,0.12)" strokeWidth="1" className="dark:opacity-30" />

          <path
            d={`M ${pad} ${h - pad} ${points ? `L ${points} L ${w - pad} ${h - pad} Z` : ''}`}
            fill={`url(#fill-${id})`}
          />

          <polyline fill="none" stroke={`url(#line-${id})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} />

          {hoverPoint && (
            <g>
              <line x1={hoverPoint.x} y1={pad} x2={hoverPoint.x} y2={h - pad} stroke="rgba(100,116,139,0.08)" className="dark:stroke-white/5" />
              <circle cx={hoverPoint.x} cy={hoverPoint.y} r={5} fill="#fff" stroke={colors.lineEnd} strokeWidth={2} />
            </g>
          )}
        </svg>

        {hoverPoint && (
          <div className="pointer-events-none absolute -translate-x-1/2" style={{left: `${(hoverPoint.x/w)*100}%`, top: 6}}>
            <div className="bg-white shadow-md rounded-md px-3 py-1 text-xs font-medium text-slate-700">
              {hoverPoint.v}{unit ? ` ${unit}` : ''}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 border-t pt-3 flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex gap-2">
          <div className="px-2 py-0.5 text-xs rounded-md text-slate-600 border border-slate-100 bg-white/60 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">Min <span className="font-semibold">{min}{unit ? ` ${unit}` : ''}</span></div>
          <div className="px-2 py-0.5 text-xs rounded-md text-slate-600 border border-slate-100 bg-white/60 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">Avg <span className="font-semibold">{avg}{unit ? ` ${unit}` : ''}</span></div>
          <div className="px-2 py-0.5 text-xs rounded-md text-slate-600 border border-slate-100 bg-white/60 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">Max <span className="font-semibold">{max}{unit ? ` ${unit}` : ''}</span></div>
        </div>
        <div className="text-xs text-slate-400" />
      </div>
    </div>
  )
}
