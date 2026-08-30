'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Eye,
  X,
  Paperclip,
  Mail,
  ChevronDown,
  Radio,
  ArrowUpRight,
  CircleDollarSign,
} from 'lucide-react'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'
import { cn } from '@/lib/utils'

type Status = 'Pending' | 'Approved' | 'On-going' | 'Done' | 'Declined'

const STATUSES: Status[] = [
  'Pending',
  'Approved',
  'On-going',
  'Done',
  'Declined',
]

const STATUS_STYLE: Record<Status, string> = {
  Pending: 'bg-white/10 text-panel-foreground/70',
  Approved: 'bg-cta-green/20 text-cta-green',
  'On-going': 'bg-cta-blue/20 text-cta-blue',
  Done: 'bg-primary/30 text-primary-foreground',
  Declined: 'bg-cta-red/20 text-cta-red',
}

// Describes the automated email fired when a status is selected.
const EMAIL_COPY: Record<Status, string> = {
  Pending: 'No email sent — submission awaiting review.',
  Approved:
    'Approval notice with the finalized contract emailed to the applicant.',
  'On-going':
    'Confirmation emailed with a unique link to their Advertisement Revenue Page.',
  Done: 'Grateful notice emailed — the ad display period has expired.',
  Declined: 'Respectful rejection notice emailed to the applicant.',
}

interface ConcernSub {
  id: number
  kind: 'concern'
  status: Status
  username: string
  email: string
  concernType: string
  attachment: string | null
  message: string
  submitted: string
}

interface BrandSub {
  id: number
  kind: 'brand'
  status: Status
  brand: string
  email: string
  productType: string
  model: string
  link: string
  attachment: string | null
  budget: string
  duration: string
  message: string
  submitted: string
}

type Submission = ConcernSub | BrandSub

const INITIAL: Submission[] = [
  {
    id: 1,
    kind: 'brand',
    status: 'Pending',
    brand: 'Northgate Optics',
    email: 'partners@northgate.com',
    productType: 'Lens',
    model: 'Northgate NG-50mm f/1.4',
    link: 'https://northgate.com/ng-50',
    attachment: 'ng-50-brief.pdf',
    budget: '₱120,000',
    duration: '2 months',
    message:
      'We would love to feature our new prime lens as an unlockable in-game camera attachment.',
    submitted: '12m ago',
  },
  {
    id: 2,
    kind: 'concern',
    status: 'Pending',
    username: 'grip_marco',
    email: 'marco99@outlook.com',
    concernType: 'Bug Report',
    attachment: 'crash-log.txt',
    message:
      'The editor timeline freezes whenever I try to scrub past the 3 minute mark on a project.',
    submitted: '1h ago',
  },
  {
    id: 3,
    kind: 'concern',
    status: 'On-going',
    username: 'cam_ops_nina',
    email: 'nina.cam@yahoo.com',
    concernType: 'Other',
    attachment: null,
    message:
      'Requesting a partnership for a community tournament — happy to discuss details.',
    submitted: 'Yesterday',
  },
  {
    id: 4,
    kind: 'brand',
    status: 'Approved',
    brand: 'Volt Audio',
    email: 'ads@voltaudio.io',
    productType: 'Equipment',
    model: 'Volt Boom Mic BM-7',
    link: 'https://voltaudio.io/bm7',
    attachment: 'volt-contract.pdf',
    budget: '₱85,000',
    duration: '45 days',
    message: 'Excited to bring our boom mic to the AV Technician role.',
    submitted: '2d ago',
  },
]

interface LiveAd {
  id: string
  brand: string
  model: string
  clicks: number
  visits: number
  ends: string
}

const LIVE_ADS: LiveAd[] = [
  {
    id: 'ad-lumina-l900',
    brand: 'Lumina Lens',
    model: 'Lumina L-900 Pro',
    clicks: 12840,
    visits: 4210,
    ends: 'in 6 days',
  },
  {
    id: 'ad-volt-bm7',
    brand: 'Volt Audio',
    model: 'Volt Boom Mic BM-7',
    clicks: 6120,
    visits: 1980,
    ends: 'in 31 days',
  },
]

export default function ContactReviewHubPage() {
  const [subs, setSubs] = useState<Submission[]>(INITIAL)
  const [active, setActive] = useState<Submission | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  function changeStatus(id: number, status: Status) {
    setSubs((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))
    setToast(`${status}: ${EMAIL_COPY[status]}`)
    window.setTimeout(() => setToast(null), 4200)
  }

  return (
    <div className="space-y-8">
      <div>
        <SectionLabel>Contact Review Hub</SectionLabel>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-panel-foreground/60">
          Review submitted concerns and brand applications. Changing a status
          triggers the matching automated email to the applicant.
        </p>
      </div>

      {/* Submissions */}
      <Panel flush className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-display text-lg font-bold uppercase tracking-wider">
            Submissions
          </h2>
          <span className="rounded bg-white/10 px-2 py-0.5 font-display text-xs font-semibold text-panel-foreground/60">
            {subs.length} total
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 font-display text-xs uppercase tracking-wider text-panel-foreground/50">
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">From</th>
                <th className="px-5 py-3 font-semibold">Subject</th>
                <th className="px-5 py-3 font-semibold">Submitted</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Info</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {subs.map((s) => (
                <tr key={s.id} className="transition-colors hover:bg-white/5">
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2.5 py-1 font-display text-[11px] font-semibold uppercase tracking-wider',
                        s.kind === 'brand'
                          ? 'bg-primary/25 text-primary-foreground'
                          : 'bg-cta-blue/20 text-cta-blue',
                      )}
                    >
                      {s.kind === 'brand' ? 'Brand Ad' : 'Concern'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-display font-semibold tracking-wide">
                      {s.kind === 'brand' ? s.brand : s.username}
                    </p>
                    <p className="truncate text-xs text-panel-foreground/50">
                      {s.email}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-panel-foreground/70">
                    <p className="max-w-[200px] truncate">
                      {s.kind === 'brand' ? s.model : s.concernType}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-xs text-panel-foreground/40">
                    {s.submitted}
                  </td>
                  <td className="px-5 py-4">
                    <StatusDropdown
                      value={s.status}
                      onChange={(st) => changeStatus(s.id, st)}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setActive(s)}
                        className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wider text-panel-foreground/80 ring-1 ring-white/10 transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        See Info
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Live advertisement list */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Radio className="h-4 w-4 text-cta-green" />
          <h2 className="font-display text-lg font-bold uppercase tracking-wider">
            Live Advertisements
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {LIVE_ADS.map((ad) => (
            <Panel key={ad.id} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cta-green/20 px-2.5 py-1 font-display text-[11px] font-semibold uppercase tracking-wider text-cta-green">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                    Live
                  </span>
                  <p className="mt-3 font-display text-lg font-bold uppercase tracking-wide">
                    {ad.brand}
                  </p>
                  <p className="text-sm text-panel-foreground/60">{ad.model}</p>
                </div>
                <CircleDollarSign className="h-5 w-5 text-coin" />
              </div>
              <div className="mt-4 flex items-center gap-6">
                <div>
                  <p className="font-display text-xl font-bold">
                    {ad.clicks.toLocaleString()}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-panel-foreground/40">
                    Clicks
                  </p>
                </div>
                <div>
                  <p className="font-display text-xl font-bold">
                    {ad.visits.toLocaleString()}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-panel-foreground/40">
                    In-game visits
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-display text-sm font-semibold text-cta-green">
                    Ends {ad.ends}
                  </p>
                </div>
              </div>
              <Link
                href={`/admin/revenue/${ad.id}`}
                className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-black/25 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-panel-foreground/80 ring-1 ring-white/5 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Eye className="h-3.5 w-3.5" />
                See Info — Revenue Page
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Panel>
          ))}
        </div>
      </div>

      {active && (
        <InfoModal submission={active} onClose={() => setActive(null)} />
      )}

      {/* Email automation toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex max-w-md -translate-x-1/2 items-start gap-3 rounded-lg bg-panel px-4 py-3 text-panel-foreground shadow-2xl ring-1 ring-white/10">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cta-green" />
          <p className="text-sm leading-snug">{toast}</p>
        </div>
      )}
    </div>
  )
}

function StatusDropdown({
  value,
  onChange,
}: {
  value: Status
  onChange: (s: Status) => void
}) {
  return (
    <div className="relative inline-flex">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Status)}
        className={cn(
          'cursor-pointer appearance-none rounded-full py-1 pl-3 pr-8 font-display text-[11px] font-semibold uppercase tracking-wider outline-none ring-1 ring-white/10 focus:ring-primary',
          STATUS_STYLE[value],
        )}
        aria-label="Change status"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s} className="bg-panel text-panel-foreground">
            {s}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-70" />
    </div>
  )
}

function InfoModal({
  submission,
  onClose,
}: {
  submission: Submission
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <Panel className="relative z-10 w-full max-w-lg p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-panel-foreground/60 hover:bg-white/10"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              'inline-flex rounded-full px-2.5 py-1 font-display text-[11px] font-semibold uppercase tracking-wider',
              submission.kind === 'brand'
                ? 'bg-primary/25 text-primary-foreground'
                : 'bg-cta-blue/20 text-cta-blue',
            )}
          >
            {submission.kind === 'brand'
              ? 'Brand Application'
              : 'General Concern'}
          </span>
          <span
            className={cn(
              'inline-flex rounded-full px-2.5 py-1 font-display text-[11px] font-semibold uppercase tracking-wider',
              STATUS_STYLE[submission.status],
            )}
          >
            {submission.status}
          </span>
        </div>

        <h2 className="mt-4 font-display text-xl font-bold uppercase tracking-wide">
          {submission.kind === 'brand'
            ? submission.brand
            : submission.username}
        </h2>

        <dl className="mt-4 space-y-3 text-sm">
          {submission.kind === 'concern' ? (
            <>
              <Row label="Username" value={submission.username} />
              <Row label="Email" value={submission.email} />
              <Row label="Concern type" value={submission.concernType} />
              <Attachment file={submission.attachment} />
              <Message text={submission.message} />
            </>
          ) : (
            <>
              <Row label="Contact email" value={submission.email} />
              <Row label="Product type" value={submission.productType} />
              <Row label="Exact model" value={submission.model} />
              <Row
                label="Product link"
                value={
                  <a
                    href={submission.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cta-blue underline-offset-2 hover:underline"
                  >
                    {submission.link}
                  </a>
                }
              />
              <Row label="Proposed budget" value={submission.budget} />
              <Row label="Ad duration" value={submission.duration} />
              <Attachment file={submission.attachment} />
              <Message text={submission.message} />
            </>
          )}
        </dl>
      </Panel>
    </div>
  )
}

function Row({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
      <dt className="font-display text-xs uppercase tracking-wider text-panel-foreground/50">
        {label}
      </dt>
      <dd className="text-right font-medium text-panel-foreground/90">
        {value}
      </dd>
    </div>
  )
}

function Attachment({ file }: { file: string | null }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3">
      <dt className="font-display text-xs uppercase tracking-wider text-panel-foreground/50">
        Attachment
      </dt>
      <dd>
        {file ? (
          <a
            href="#"
            className="inline-flex items-center gap-1.5 rounded-md bg-black/25 px-2.5 py-1 text-xs font-medium text-panel-foreground/80 ring-1 ring-white/10 hover:bg-white/5"
          >
            <Paperclip className="h-3.5 w-3.5" />
            {file}
          </a>
        ) : (
          <span className="text-xs text-panel-foreground/40">None</span>
        )}
      </dd>
    </div>
  )
}

function Message({ text }: { text: string }) {
  return (
    <div>
      <dt className="font-display text-xs uppercase tracking-wider text-panel-foreground/50">
        Message
      </dt>
      <dd className="mt-2 rounded-md bg-black/25 p-3 text-sm leading-relaxed text-panel-foreground/80 ring-1 ring-white/5">
        {text}
      </dd>
    </div>
  )
}
