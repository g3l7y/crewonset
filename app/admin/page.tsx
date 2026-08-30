import type { ReactNode } from 'react'
import Link from 'next/link'
import {
  Users,
  Download,
  Coins,
  Megaphone,
  ArrowUpRight,
  UserPlus,
  Inbox,
  CreditCard,
  TimerOff,
} from 'lucide-react'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'

const METRICS = [
  {
    label: 'Total Users',
    value: '12,480',
    delta: '+318 this week',
    icon: Users,
    tone: 'blue' as const,
  },
  {
    label: 'Game Downloads',
    value: '48,912',
    delta: '+1,204 this week',
    icon: Download,
    tone: 'green' as const,
  },
  {
    label: 'C-Coins Sold',
    value: '2.1M',
    delta: '₱486,300 revenue',
    icon: Coins,
    tone: 'coin' as const,
  },
  {
    label: 'Active Ads',
    value: '7',
    delta: '3 pending review',
    icon: Megaphone,
    tone: 'brown' as const,
  },
]

const TONE_RING: Record<string, string> = {
  blue: 'bg-cta-blue/20 text-cta-blue',
  green: 'bg-cta-green/20 text-cta-green',
  coin: 'bg-coin/20 text-coin',
  brown: 'bg-primary/25 text-primary-foreground',
}

const ACTIVITY = [
  {
    icon: TimerOff,
    tone: 'red',
    text: 'Lumina Lens "L-900 Pro" ad contract expired.',
    time: 'Just now',
  },
  {
    icon: Inbox,
    tone: 'brown',
    text: 'Northgate Optics submitted a brand application.',
    time: '12m ago',
  },
  {
    icon: CreditCard,
    tone: 'green',
    text: '₱1,500 top-up via G-Cash credited to director_ace.',
    time: '40m ago',
  },
  {
    icon: UserPlus,
    tone: 'blue',
    text: 'New player grip_marco registered an account.',
    time: '2h ago',
  },
]

const ACT_TONE: Record<string, string> = {
  red: 'bg-cta-red/20 text-cta-red',
  green: 'bg-cta-green/20 text-cta-green',
  blue: 'bg-cta-blue/20 text-cta-blue',
  brown: 'bg-primary/25 text-primary-foreground',
}

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <SectionLabel>Control Room</SectionLabel>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-panel-foreground/60">
          Monitor platform health across players, downloads, revenue, and
          active sponsorships from a single command center.
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {METRICS.map((m) => {
          const Icon = m.icon
          return (
            <Panel key={m.label} className="p-5">
              <div className="flex items-start justify-between">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-md ${TONE_RING[m.tone]}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-cta-green" />
              </div>
              <p className="mt-4 font-display text-3xl font-bold tracking-wide">
                {m.value}
              </p>
              <p className="mt-1 font-display text-xs font-semibold uppercase tracking-wider text-panel-foreground/60">
                {m.label}
              </p>
              <p className="mt-2 text-xs text-panel-foreground/40">{m.delta}</p>
            </Panel>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent activity */}
        <Panel className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold uppercase tracking-wider">
              Recent Activity
            </h2>
          </div>
          <ul className="divide-y divide-white/5">
            {ACTIVITY.map((a, i) => {
              const Icon = a.icon
              return (
                <li key={i} className="flex items-center gap-3 py-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${ACT_TONE[a.tone]}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="min-w-0 flex-1 text-sm text-panel-foreground/80">
                    {a.text}
                  </p>
                  <span className="shrink-0 text-xs text-panel-foreground/40">
                    {a.time}
                  </span>
                </li>
              )
            })}
          </ul>
        </Panel>

        {/* Quick links */}
        <Panel className="p-6">
          <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wider">
            Quick Actions
          </h2>
          <div className="flex flex-col gap-3">
            <QuickLink
              href="/admin/players"
              icon={<Users className="h-4 w-4" />}
              label="Manage players"
            />
            <QuickLink
              href="/admin/contacts"
              icon={<Inbox className="h-4 w-4" />}
              label="Review submissions"
            />
            <QuickLink
              href="/admin/transactions"
              icon={<CreditCard className="h-4 w-4" />}
              label="View transactions"
            />
            <QuickLink
              href="/admin/revenue"
              icon={<Megaphone className="h-4 w-4" />}
              label="Track ad revenue"
            />
          </div>
        </Panel>
      </div>
    </div>
  )
}

function QuickLink({
  href,
  icon,
  label,
}: {
  href: string
  icon: ReactNode
  label: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-md bg-black/25 px-4 py-3 font-display text-sm font-semibold uppercase tracking-wider text-panel-foreground/80 ring-1 ring-white/5 transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  )
}
