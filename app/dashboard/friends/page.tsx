'use client'

import { useState } from 'react'
import {
  UserPlus,
  Check,
  X,
  Circle,
  Clock,
  Send,
  Search,
} from 'lucide-react'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'

type Tab = 'friends' | 'incoming' | 'outgoing'

interface Person {
  id: number
  name: string
  level: number
  status?: 'online' | 'offline' | 'in-game'
}

const FRIENDS: Person[] = [
  { id: 1, name: 'boom_operator_lea', level: 15, status: 'in-game' },
  { id: 2, name: 'gaffer_marco', level: 9, status: 'online' },
  { id: 3, name: 'script_supervisor_j', level: 22, status: 'offline' },
  { id: 4, name: 'colorist_nina', level: 18, status: 'online' },
  { id: 5, name: 'grip_teddy', level: 6, status: 'offline' },
]

const INCOMING: Person[] = [
  { id: 6, name: 'foley_artist_sam', level: 11 },
  { id: 7, name: 'dp_ramon', level: 27 },
]

const OUTGOING: Person[] = [
  { id: 8, name: 'best_boy_kim', level: 8 },
  { id: 9, name: 'set_designer_ivy', level: 14 },
]

const STATUS_COLOR: Record<NonNullable<Person['status']>, string> = {
  online: 'text-cta-green',
  'in-game': 'text-cta-blue',
  offline: 'text-panel-foreground/30',
}

const inputClass =
  'w-full rounded-md border border-white/15 bg-black/20 px-4 py-2.5 text-panel-foreground placeholder:text-panel-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40'

export default function FriendsPage() {
  const [tab, setTab] = useState<Tab>('friends')

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'friends', label: 'Friends', count: FRIENDS.length },
    { key: 'incoming', label: 'Incoming', count: INCOMING.length },
    { key: 'outgoing', label: 'Outgoing', count: OUTGOING.length },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div>
        <SectionLabel>Social</SectionLabel>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground text-balance">
          Friends
        </h2>
        <p className="mt-1 max-w-xl text-muted-foreground">
          Build your crew. Add players, manage requests, and see who&apos;s on
          set right now.
        </p>
      </div>

      {/* Add friend */}
      <Panel className="p-5 sm:p-6">
        <p className="mb-3 inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest text-primary">
          <UserPlus className="h-4 w-4" /> Send a friend request
        </p>
        <form
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-panel-foreground/40" />
            <input
              className={inputClass + ' pl-10'}
              placeholder="Search by in-game username"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-cta-blue px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
          >
            <Send className="h-4 w-4" /> Send Request
          </button>
        </form>
      </Panel>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-1 rounded-lg bg-panel p-1 ring-1 ring-black/20">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={
              'inline-flex items-center justify-center gap-2 rounded-md py-2.5 font-display text-xs font-semibold uppercase tracking-wider transition-colors sm:text-sm ' +
              (tab === t.key
                ? 'bg-primary text-primary-foreground'
                : 'text-panel-foreground/60 hover:text-panel-foreground')
            }
          >
            {t.label}
            <span
              className={
                'flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold ' +
                (tab === t.key
                  ? 'bg-black/25 text-primary-foreground'
                  : 'bg-black/25 text-panel-foreground/70')
              }
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Lists */}
      {tab === 'friends' && (
        <Panel className="p-2">
          <ul className="divide-y divide-white/5">
            {FRIENDS.map((p) => (
              <li key={p.id} className="flex items-center gap-4 p-4">
                <Avatar name={p.name} />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-semibold text-panel-foreground">
                    {p.name}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-panel-foreground/55">
                    <Circle
                      className={`h-2 w-2 fill-current ${STATUS_COLOR[p.status ?? 'offline']}`}
                    />
                    Level {p.level} •{' '}
                    {p.status === 'in-game'
                      ? 'On set'
                      : p.status === 'online'
                        ? 'Online'
                        : 'Offline'}
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-md bg-white/5 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wider text-panel-foreground/60 transition-colors hover:bg-cta-red/20 hover:text-cta-red"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      {tab === 'incoming' && (
        <Panel className="p-2">
          <ul className="divide-y divide-white/5">
            {INCOMING.map((p) => (
              <li key={p.id} className="flex items-center gap-4 p-4">
                <Avatar name={p.name} />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-semibold text-panel-foreground">
                    {p.name}
                  </p>
                  <p className="mt-0.5 text-xs text-panel-foreground/55">
                    Level {p.level} • wants to join your crew
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-md bg-cta-green px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
                  >
                    <Check className="h-3.5 w-3.5" /> Accept
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wider text-panel-foreground/60 transition-colors hover:bg-cta-red/20 hover:text-cta-red"
                  >
                    <X className="h-3.5 w-3.5" /> Decline
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      {tab === 'outgoing' && (
        <Panel className="p-2">
          <ul className="divide-y divide-white/5">
            {OUTGOING.map((p) => (
              <li key={p.id} className="flex items-center gap-4 p-4">
                <Avatar name={p.name} />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-semibold text-panel-foreground">
                    {p.name}
                  </p>
                  <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-panel-foreground/55">
                    <Clock className="h-3 w-3" /> Level {p.level} • pending
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-md bg-white/5 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wider text-panel-foreground/60 transition-colors hover:bg-cta-red/20 hover:text-cta-red"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  )
}

function Avatar({ name }: { name: string }) {
  const initials = name.slice(0, 2).toUpperCase()
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/30 font-display text-sm font-bold uppercase text-panel-foreground">
      {initials}
    </span>
  )
}
