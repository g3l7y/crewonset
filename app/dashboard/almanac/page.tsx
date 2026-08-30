'use client'

import { useState } from 'react'
import {
  Trophy,
  Flame,
  Star,
  Lock,
  Clapperboard,
  Scissors,
  Camera,
  Mic,
  Info,
  X,
  Film,
} from 'lucide-react'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'

const LEVEL = 12
const XP = 6400
const XP_NEXT = 8000

const ACHIEVEMENTS = [
  { name: 'First Cut', desc: 'Edit your debut reel', icon: Scissors, unlocked: true },
  { name: 'Action!', desc: 'Direct 10 productions', icon: Clapperboard, unlocked: true },
  { name: 'Steady Hands', desc: 'Shoot 100 clean clips', icon: Camera, unlocked: true },
  { name: 'Sound Off', desc: 'Master the AV booth', icon: Mic, unlocked: true },
  { name: 'Box Office', desc: 'Earn 10,000 C total', icon: Star, unlocked: false },
  { name: 'Auteur', desc: 'Reach level 25', icon: Trophy, unlocked: false },
]

type Log = {
  id: number
  title: string
  role: string
  icon: typeof Clapperboard
  color: string
  rating: string
  reward: string
  date: string
  events: string[]
}

const LOGS: Log[] = [
  {
    id: 1,
    title: 'City Lights',
    role: 'Director',
    icon: Clapperboard,
    color: 'bg-cta-green/20 text-cta-green',
    rating: 'B+',
    reward: '+320 C',
    date: 'Aug 28, 2026',
    events: [
      'Blocked 6 scenes and called action on the rooftop set.',
      'Managed a 3-person crew across a night shoot.',
      'Client approved the final cut on the first review.',
    ],
  },
  {
    id: 2,
    title: 'Fresh Brew',
    role: 'Editor',
    icon: Scissors,
    color: 'bg-cta-blue/20 text-cta-blue',
    rating: 'A-',
    reward: '+410 C',
    date: 'Aug 26, 2026',
    events: [
      'Stitched 4 scenes into a 30-second spot.',
      'Color-graded footage to a warm morning palette.',
      'Synced background score to the pour shot.',
    ],
  },
  {
    id: 3,
    title: 'Night Market',
    role: 'Cameraman',
    icon: Camera,
    color: 'bg-primary/25 text-primary-foreground',
    rating: 'B',
    reward: '+260 C',
    date: 'Aug 24, 2026',
    events: [
      'Captured 12 B-roll clips of the neon stalls.',
      'Used a gimbal for a smooth tracking shot.',
      'Handled low-light exposure without noise.',
    ],
  },
]

export default function AlmanacPage() {
  const [active, setActive] = useState<Log | null>(null)
  const pct = Math.round((XP / XP_NEXT) * 100)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <SectionLabel>Career</SectionLabel>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground text-balance">
          Almanac
        </h2>
        <p className="mt-1 max-w-xl text-muted-foreground">
          Track your level, achievements, and every production you&apos;ve
          wrapped on set.
        </p>
      </div>

      {/* Level */}
      <Panel className="p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-cta-red/20 text-cta-red">
              <Flame className="h-8 w-8" />
            </span>
            <div>
              <p className="font-display text-xs uppercase tracking-widest text-panel-foreground/50">
                Current Level
              </p>
              <p className="font-display text-4xl font-bold text-panel-foreground">
                {LEVEL}
              </p>
            </div>
          </div>
          <div className="min-w-0 flex-1 sm:max-w-sm">
            <div className="mb-2 flex items-center justify-between font-display text-xs uppercase tracking-wider text-panel-foreground/50">
              <span>XP</span>
              <span>
                {XP.toLocaleString()} / {XP_NEXT.toLocaleString()}
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-black/30">
              <div
                className="h-full rounded-full bg-coin"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-panel-foreground/50">
              {(XP_NEXT - XP).toLocaleString()} XP to level {LEVEL + 1}
            </p>
          </div>
        </div>
      </Panel>

      {/* Achievements */}
      <section>
        <h3 className="mb-4 font-display text-xl font-bold tracking-wide text-foreground">
          Achievements
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {ACHIEVEMENTS.map((a) => {
            const Icon = a.icon
            return (
              <Panel
                key={a.name}
                className={`p-5 ${a.unlocked ? '' : 'opacity-60'}`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${
                      a.unlocked
                        ? 'bg-coin/20 text-coin'
                        : 'bg-black/30 text-panel-foreground/40'
                    }`}
                  >
                    {a.unlocked ? (
                      <Icon className="h-5 w-5" />
                    ) : (
                      <Lock className="h-5 w-5" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold uppercase tracking-wide text-panel-foreground">
                      {a.name}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-panel-foreground/55">
                      {a.desc}
                    </p>
                  </div>
                </div>
              </Panel>
            )
          })}
        </div>
      </section>

      {/* Production logs */}
      <section>
        <h3 className="mb-4 font-display text-xl font-bold tracking-wide text-foreground">
          Production Logs
        </h3>
        <Panel className="p-2">
          <ul className="divide-y divide-white/5">
            {LOGS.map((log) => {
              const Icon = log.icon
              return (
                <li
                  key={log.id}
                  className="flex flex-wrap items-center gap-4 p-4"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${log.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-semibold text-panel-foreground">
                      {log.title}
                    </p>
                    <p className="mt-0.5 text-xs text-panel-foreground/55">
                      {log.role} • Rated {log.rating} • {log.reward}
                    </p>
                  </div>
                  <span className="hidden text-xs text-panel-foreground/40 sm:inline">
                    {log.date}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActive(log)}
                    className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-white/10"
                  >
                    <Info className="h-3.5 w-3.5" /> See Info
                  </button>
                </li>
              )
            })}
          </ul>
        </Panel>
      </section>

      {active && <LogModal log={active} onClose={() => setActive(null)} />}
    </div>
  )
}

function LogModal({ log, onClose }: { log: Log; onClose: () => void }) {
  const Icon = log.icon
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />
      <Panel className="relative w-full max-w-lg p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md text-panel-foreground/60 transition-colors hover:bg-white/10 hover:text-panel-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-4">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md ${log.color}`}
          >
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-display text-xl font-bold uppercase tracking-wide text-panel-foreground">
              {log.title}
            </h3>
            <p className="text-xs text-panel-foreground/55">
              {log.role} • {log.date}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-md bg-black/25 p-3 text-center">
            <p className="font-display text-xs uppercase tracking-wider text-panel-foreground/50">
              Rating
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-cta-green">
              {log.rating}
            </p>
          </div>
          <div className="rounded-md bg-black/25 p-3 text-center">
            <p className="font-display text-xs uppercase tracking-wider text-panel-foreground/50">
              Reward
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-coin">
              {log.reward}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-3 inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest text-primary">
            <Film className="h-4 w-4" /> Gameplay Events
          </p>
          <ul className="flex flex-col gap-2.5">
            {log.events.map((e, i) => (
              <li key={i} className="flex gap-3 text-sm text-panel-foreground/80">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {e}
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    </div>
  )
}
