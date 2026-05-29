import React from 'react'
import PageHeader from '../components/PageHeader'

const teamMembers = [
  { name: 'Baladad, Kier Nino', role: 'Software Development', focus: 'System concept, interface direction, and final integration.' },
  { name: 'Bubos, Cefren Pao', role: 'Prototype Development', focus: 'Embedded logic, control routines, and sensor updates.' },
  { name: 'Codilan, Ralph Lorenz', role: 'Technical and Documentation', focus: 'Embedded logic, control routines, and sensor updates.' },
  { name: 'Corcino, Daniel Justine', role: 'Technical and Documentation', focus: 'Sensor wiring, device reliability, and ESP32 coordination.' },
  { name: 'De Mesa, Charisse Anne', role: 'Prototype Development', focus: 'Layout refinement, visual hierarchy, and screen polish.' },
  { name: 'Gerona, Geonell', role: 'Prototype Development', focus: 'Trend interpretation, thresholds, and summary reporting.' },
  { name: 'Lagrimas, Angelo', role: 'Software Development', focus: 'Firestore structure, persistence, and app data flow.' },
  { name: 'Lazona, John Karlo', role: 'Prototype Development', focus: 'Project write-up, presentation support, and references.' },
  { name: 'Navea, Carl Timothy', role: 'Prototype Development', focus: 'Background study, proposal framing, and demo preparation.' },
]

function PhotoPlaceholder({ label, accent }){
  return (
    <div className={`relative flex h-full min-h-[9.5rem] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/25 bg-gradient-to-br ${accent} text-white shadow-lg shadow-slate-950/10`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_40%)]" />
      <div className="relative flex flex-col items-center gap-2 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-white/15 text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur-sm">
          Photo
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/90">{label}</p>
      </div>
    </div>
  )
}

export default function About(){
  return (
    <section className="space-y-5">
      <PageHeader
        label="Project Team"
        title="About the Group"
        subtitle="A polished team profile for the people behind the system, with placeholders for every member and the school batch details."
      />

      <div className="dashboard-card-soft overflow-hidden p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Built by a 9-member team.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-[0.95rem]">
              Replace the placeholders with the final names, portraits, school, program, and batch information.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 shadow-sm dark:border-slate-800/70 dark:bg-slate-950/50">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <div>
                <span className="surface-label">School</span>
                <p className="mt-1 font-semibold text-slate-900 dark:text-white">School Name Placeholder</p>
              </div>
              <div>
                <span className="surface-label">Batch</span>
                <p className="mt-1 font-semibold text-slate-900 dark:text-white">Batch / Section Placeholder</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {teamMembers.map((member, index) => (
            <article key={member.name} className="group overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10 dark:border-slate-800/70 dark:bg-slate-950/45">
              <div className="grid gap-4 sm:grid-cols-[minmax(7.5rem,8.5rem)_1fr]">
                <div className="relative aspect-square overflow-hidden rounded-[1.4rem]">
                  <PhotoPlaceholder
                    label={`Member ${String(index + 1).padStart(2, '0')}`}
                    accent={index % 3 === 0
                      ? 'from-cyan-500 via-sky-500 to-blue-600'
                      : index % 3 === 1
                        ? 'from-emerald-500 via-teal-500 to-cyan-600'
                        : 'from-slate-700 via-slate-600 to-sky-700'}
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <p className="surface-label">{member.role}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">{member.name}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}