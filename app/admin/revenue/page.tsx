import Link from 'next/link'
import { Lock, ArrowUpRight, MousePointerClick, Users } from 'lucide-react'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'
import { AD_CAMPAIGNS } from '@/components/admin/ad-data'

export default function AdRevenueIndexPage() {
  return (
    <div className="space-y-6">
      <div>
        <SectionLabel>Advertisement Revenue</SectionLabel>
        <div className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-panel-foreground/60">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-coin" />
          <p className="max-w-2xl">
            Restricted access. These pages are reachable only from the admin
            active-ads list or the brand&apos;s unique email link. Select a
            live campaign to view real-time metrics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {AD_CAMPAIGNS.map((ad) => (
          <Link key={ad.id} href={`/admin/revenue/${ad.id}`}>
            <Panel className="p-5 transition-transform hover:-translate-y-0.5">
              <div className="flex items-start justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cta-green/20 px-2.5 py-1 font-display text-[11px] font-semibold uppercase tracking-wider text-cta-green">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                  Live
                </span>
                <ArrowUpRight className="h-4 w-4 text-panel-foreground/40" />
              </div>
              <p className="mt-3 font-display text-lg font-bold uppercase tracking-wide">
                {ad.brand}
              </p>
              <p className="text-sm text-panel-foreground/60">{ad.model}</p>
              <div className="mt-4 flex items-center gap-6">
                <span className="inline-flex items-center gap-1.5 text-sm text-panel-foreground/70">
                  <MousePointerClick className="h-4 w-4 text-cta-blue" />
                  {ad.clicks.toLocaleString()}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-panel-foreground/70">
                  <Users className="h-4 w-4 text-primary-foreground" />
                  {ad.visits.toLocaleString()}
                </span>
              </div>
            </Panel>
          </Link>
        ))}
      </div>
    </div>
  )
}
