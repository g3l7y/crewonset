'use client'

import { useEffect, useRef, useState } from 'react'
import { Bell, Trophy, UserPlus, ShoppingBag, Megaphone } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Alert {
  id: number
  icon: typeof Bell
  title: string
  detail: string
  time: string
  unread: boolean
}

const ALERTS: Alert[] = [
  {
    id: 1,
    icon: Trophy,
    title: 'Achievement unlocked',
    detail: 'You earned "First Cut" for editing your debut reel.',
    time: '2m ago',
    unread: true,
  },
  {
    id: 2,
    icon: UserPlus,
    title: 'New friend request',
    detail: 'boom_operator_lea wants to join your crew.',
    time: '1h ago',
    unread: true,
  },
  {
    id: 3,
    icon: ShoppingBag,
    title: 'Purchase confirmed',
    detail: 'Director Bomber Jacket synced to your avatar.',
    time: '3h ago',
    unread: true,
  },
  {
    id: 4,
    icon: Megaphone,
    title: 'Production wrapped',
    detail: 'Your "City Lights" commercial scored a B+ rating.',
    time: 'Yesterday',
    unread: false,
  },
]

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const unread = ALERTS.filter((a) => a.unread).length

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-md text-panel-foreground/80 transition-colors hover:bg-white/10 hover:text-panel-foreground"
        aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
        aria-expanded={open}
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-cta-red px-1 font-display text-[10px] font-bold leading-none text-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl bg-panel text-panel-foreground shadow-2xl ring-1 ring-black/30">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="font-display text-sm font-bold uppercase tracking-wider">
              Notifications
            </span>
            <span className="rounded bg-cta-red/20 px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-cta-red">
              {unread} new
            </span>
          </div>
          <ul className="max-h-96 divide-y divide-white/5 overflow-y-auto">
            {ALERTS.map((a) => {
              const Icon = a.icon
              return (
                <li
                  key={a.id}
                  className={cn(
                    'flex gap-3 px-4 py-3 transition-colors hover:bg-white/5',
                    a.unread && 'bg-white/[0.03]',
                  )}
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/25 text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold">
                      {a.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-snug text-panel-foreground/60">
                      {a.detail}
                    </p>
                    <p className="mt-1 text-[11px] text-panel-foreground/40">
                      {a.time}
                    </p>
                  </div>
                  {a.unread && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cta-red" />
                  )}
                </li>
              )
            })}
          </ul>
          <button
            type="button"
            className="w-full border-t border-white/10 py-3 text-center font-display text-xs font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-white/5"
          >
            Mark all as read
          </button>
        </div>
      )}
    </div>
  )
}
