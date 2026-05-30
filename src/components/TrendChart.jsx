import React, {useMemo, useRef, useState} from 'react'

function toNumber(value, fallback = 0){
  if (typeof value === 'number' && Number.isFinite(value)) return value
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function formatMetric(value, unit, decimals = 1){
  if (value == null || !Number.isFinite(value)) return '—'
  return `${Number(value.toFixed(decimals))}${unit ? ` ${unit}` : ''}`
}

function toneClasses(tone){
  if (tone === 'danger') return 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200'
  if (tone === 'warning') return 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200'
  if (tone === 'stable') return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200'
  return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
}

function colorBand(key){
  if (key === 'safe') return 'rgba(16,185,129,0.10)'
  if (key.includes('warning')) return 'rgba(245,158,11,0.10)'
  return 'rgba(244,63,94,0.08)'
}

export default function TrendChart({
  data = [],
  title = 'Sensor',
  unit = '',
  height = 140,
  colors = {lineStart: '#06b6d4', lineEnd: '#3b82f6', fill: '#0ea5e9'},
  thresholds,
  currentValue,
  statusLabel,
  statusTone = 'neutral',
  subtitle,
}){
  const w = 600, h = 120, pad = 12
  const id = useRef(Math.random().toString(36).slice(2,9)).current
  const [hoverIndex, setHoverIndex] = useState(null)

  const max = useMemo(() => Math.max(...data, 1), [data])
  const min = useMemo(() => Math.min(...data, 0), [data])
  const endValue = data[data.length - 1] ?? 0
  const displayValue = currentValue ?? endValue
  const avg = useMemo(() => {
    if (!data || data.length === 0) return 0
    return Number((data.reduce((s,v)=>s+v,0)/data.length).toFixed(2))
  }, [data])

  const thresholdMin = toNumber(thresholds?.min, min)
  const thresholdMax = toNumber(thresholds?.max, max)
  const domainSpan = Math.max(max - min, thresholdMax - thresholdMin, 1)
  const padding = Math.max(domainSpan * 0.18, Math.abs(thresholdMax - thresholdMin) * 0.25, 0.35)
  const domainMin = Math.min(min, thresholdMin) - padding
  const domainMax = Math.max(max, thresholdMax) + padding
  const yFor = (value) => pad + (1 - (value - domainMin)/(domainMax - domainMin || 1)) * (h - pad*2)

  const warningBuffer = Math.max((thresholdMax - thresholdMin) * 0.25, domainSpan * 0.08, unit === '%' ? 2.5 : 0.2)

  const bands = [
    {key: 'critical-low', lower: domainMin, upper: Math.min(thresholdMin - warningBuffer, domainMax)},
    {key: 'warning-low', lower: Math.max(domainMin, thresholdMin - warningBuffer), upper: thresholdMin},
    {key: 'safe', lower: thresholdMin, upper: thresholdMax},
    {key: 'warning-high', lower: thresholdMax, upper: Math.min(thresholdMax + warningBuffer, domainMax)},
    {key: 'critical-high', lower: Math.max(thresholdMax + warningBuffer, domainMin), upper: domainMax},
  ].filter((band) => Number.isFinite(band.lower) && Number.isFinite(band.upper) && band.upper > band.lower)

  const pointsArr = useMemo(() => data.map((v,i) => {
    const x = pad + (i/(Math.max(1,data.length-1))) * (w - pad*2)
    const y = yFor(v)
    return {x,y,v}
  }), [data, yFor])

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
  const currentTone = toneClasses(statusTone)

  return (
    <div className="dashboard-card-soft flex h-full flex-col bg-white/90 p-3.5 sm:p-5 dark:bg-slate-950/55">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <p className="uppercase text-xs tracking-wide text-slate-500 dark:text-slate-400">{title}</p>
          {subtitle ? <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p> : null}
        </div>

        <div className="text-right">
          <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">{formatMetric(displayValue, unit, unit === '%' ? 0 : 1)}</div>
          <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${currentTone}`}>
            {statusLabel || 'Live'}
          </span>
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

          {bands.map((band) => (
            <rect
              key={band.key}
              x="0"
              y={yFor(band.upper)}
              width={w}
              height={Math.max(0, yFor(band.lower) - yFor(band.upper))}
              fill={colorBand(band.key)}
            />
          ))}

          <path
            d={`M ${pad} ${h - pad} ${points ? `L ${points} L ${w - pad} ${h - pad} Z` : ''}`}
            fill={`url(#fill-${id})`}
          />

          <polyline fill="none" stroke={`url(#line-${id})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} />

          {Number.isFinite(thresholdMin) && (
            <line x1="0" y1={yFor(thresholdMin)} x2={w} y2={yFor(thresholdMin)} stroke="rgba(148,163,184,0.35)" strokeDasharray="4 4" strokeWidth="1" />
          )}

          {Number.isFinite(thresholdMax) && (
            <line x1="0" y1={yFor(thresholdMax)} x2={w} y2={yFor(thresholdMax)} stroke="rgba(148,163,184,0.35)" strokeDasharray="4 4" strokeWidth="1" />
          )}

          {hoverPoint && (
            <g>
              <line x1={hoverPoint.x} y1={pad} x2={hoverPoint.x} y2={h - pad} stroke="rgba(100,116,139,0.08)" className="dark:stroke-white/5" />
              <circle cx={hoverPoint.x} cy={hoverPoint.y} r={5} fill="#fff" stroke={colors.lineEnd} strokeWidth={2} />
            </g>
          )}
        </svg>

        {hoverPoint && (
          <div className="pointer-events-none absolute -translate-x-1/2" style={{left: `${(hoverPoint.x/w)*100}%`, top: 6}}>
            <div className="rounded-md border border-slate-200/80 bg-white/95 px-3 py-1 text-xs font-medium text-slate-700 shadow-md backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/95 dark:text-slate-100">
              {formatMetric(hoverPoint.v, unit, unit === '%' ? 0 : 1)}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 border-t border-slate-200/70 pt-3 text-xs text-slate-500 dark:border-slate-800/70 dark:text-slate-400">
        <div className="flex flex-wrap gap-2">
          <div className="rounded-md border border-slate-200/70 bg-white/70 px-2 py-0.5 text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200">Min <span className="font-semibold">{formatMetric(min, unit, unit === '%' ? 0 : 1)}</span></div>
          <div className="rounded-md border border-slate-200/70 bg-white/70 px-2 py-0.5 text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200">Avg <span className="font-semibold">{formatMetric(avg, unit, unit === '%' ? 0 : 1)}</span></div>
          <div className="rounded-md border border-slate-200/70 bg-white/70 px-2 py-0.5 text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200">Max <span className="font-semibold">{formatMetric(max, unit, unit === '%' ? 0 : 1)}</span></div>
          {thresholds ? (
            <div className="rounded-md border border-slate-200/70 bg-white/70 px-2 py-0.5 text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200">
              Target <span className="font-semibold">{thresholds.min} - {thresholds.max}{unit}</span>
            </div>
          ) : null}
        </div>
        <div className="mt-2 text-xs text-slate-400" />
      </div>
    </div>
  )
}
