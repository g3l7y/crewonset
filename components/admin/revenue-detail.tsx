'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  MousePointerClick,
  Users,
  FileText,
  Wallet,
  Tag,
  Timer,
  BellRing,
} from 'lucide-react'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'
import type { AdCampaign } from './ad-data'

export function RevenueDetail({ campaign }: { campaign: AdCampaign }) {
  // Fixed expiry timestamp derived once from the campaign's remaining hours.
  const expiry = useMemo(
    () => Date.now() + campaign.endsInHours * 3600 * 1000,
    [campaign.endsInHours],
  )
  const [remaining, setRemaining] = useState(() => expiry - Date.now())
  const [expired, setExpired] = useState(false)
  // Live metrics tick upward to simulate real-time tracking.
  const [clicks, setClicks] = useState(campaign.clicks)
  const [visits, setVisits] = useState(campaign.visits)
  const notified = useRef(false)

  useEffect(() => {
    const t = setInterval(() => {
      const left = expiry - Date.now()
      setRemaining(left)
      if (left <= 0 && !notified.current) {
        notified.current = true
        setExpired(true)
      }
    }, 1000)
    return () => clearInterval(t)
  }, [expiry])

  useEffect(() => {
    if (expired) return
    const t = setInterval(() => {
      setClicks((c) => c + Math.floor(Math.random() * 4))
      setVisits((v) => v + Math.floor(Math.random() * 2))
    }, 3000)
    return () => clearInterval(t)
  }, [expired])

  const parts = splitDuration(Math.max(0, remaining))

  return (
    <div className="space-y-6">
      <Link
        href="/admin/contacts"
        className="inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-wider text-panel-foreground/60 transition-colors hover:text-panel-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to live ads
      </Link>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>Ad Revenue Tracking</SectionLabel>
          <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide">
            {campaign.brand}
          </h2>
          <p className="text-sm text-panel-foreground/60">{campaign.model}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-cta-green/20 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wider text-cta-green">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
          Live campaign
        </span>
      </div>

      {expired && (
        <Panel className="border-l-0 p-4 ring-2 ring-cta-red/50">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-cta-red/20 text-cta-red">
              <BellRing className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-wider text-cta-red">
                Admin notification triggered
              </p>
              <p className="text-sm text-panel-foreground/70">
                The contract countdown reached zero. A &ldquo;Done&rdquo;
                notice has been queued to {campaign.brand}.
              </p>
            </div>
          </div>
        </Panel>
      )}

      {/* Countdown */}
      <Panel className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Timer className="h-4 w-4 text-coin" />
          <h3 className="font-display text-sm font-bold uppercase tracking-wider">
            Time to expiration
          </h3>
        </div>
        <div className="flex gap-3">
          <TimeCell value={parts.days} label="Days" />
          <TimeCell value={parts.hours} label="Hours" />
          <TimeCell value={parts.minutes} label="Mins" />
          <TimeCell value={parts.seconds} label="Secs" expired={expired} />
        </div>
      </Panel>

      {/* Live metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Panel className="p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-cta-blue/20 text-cta-blue">
            <MousePointerClick className="h-5 w-5" />
          </span>
          <p className="mt-4 font-display text-3xl font-bold tabular-nums">
            {clicks.toLocaleString()}
          </p>
          <p className="mt-1 font-display text-xs uppercase tracking-wider text-panel-foreground/50">
            Total clicks
          </p>
        </Panel>
        <Panel className="p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/25 text-primary-foreground">
            <Users className="h-5 w-5" />
          </span>
          <p className="mt-4 font-display text-3xl font-bold tabular-nums">
            {visits.toLocaleString()}
          </p>
          <p className="mt-1 font-display text-xs uppercase tracking-wider text-panel-foreground/50">
            In-game visits
          </p>
        </Panel>
      </div>

      {/* Contract details */}
      <Panel className="p-6">
        <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">
          Contract details
        </h3>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          <Detail
            icon={<Tag className="h-4 w-4 text-panel-foreground/50" />}
            label="Brand"
            value={campaign.brand}
          />
          <Detail
            icon={<Tag className="h-4 w-4 text-panel-foreground/50" />}
            label="Exact model"
            value={campaign.model}
          />
          <Detail
            icon={<FileText className="h-4 w-4 text-panel-foreground/50" />}
            label="Product type"
            value={campaign.productType}
          />
          <Detail
            icon={<FileText className="h-4 w-4 text-panel-foreground/50" />}
            label="Contract no."
            value={campaign.contract}
          />
          <Detail
            icon={<Wallet className="h-4 w-4 text-panel-foreground/50" />}
            label="Budget"
            value={campaign.budget}
          />
        </dl>
      </Panel>
    </div>
  )
}

function TimeCell({
  value,
  label,
  expired,
}: {
  value: number
  label: string
  expired?: boolean
}) {
  return (
    <div className="flex-1 rounded-lg bg-black/30 p-4 text-center ring-1 ring-white/5">
      <p
        className={`font-display text-3xl font-bold tabular-nums sm:text-4xl ${
          expired ? 'text-cta-red' : 'text-panel-foreground'
        }`}
      >
        {String(value).padStart(2, '0')}
      </p>
      <p className="mt-1 font-display text-[10px] uppercase tracking-widest text-panel-foreground/40">
        {label}
      </p>
    </div>
  )
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3">
      <dt className="flex items-center gap-2 font-display text-xs uppercase tracking-wider text-panel-foreground/50">
        {icon}
        {label}
      </dt>
      <dd className="font-medium text-panel-foreground/90">{value}</dd>
    </div>
  )
}

function splitDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}
