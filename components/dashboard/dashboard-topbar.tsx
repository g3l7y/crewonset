'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { DASHBOARD_NAV } from './nav-items'
import { DashboardSidebar } from './dashboard-sidebar'
import { NotificationBell } from './notification-bell'
import { CoinBalance } from './coin-balance'

const TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/profile': 'Profile Info',
  '/dashboard/almanac': 'Almanac',
  '/dashboard/friends': 'Friends',
  '/dashboard/shop': 'Shop',
  '/dashboard/settings': 'Settings',
}

export function DashboardTopbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const title =
    TITLES[pathname] ??
    DASHBOARD_NAV.find((n) => pathname.startsWith(n.href))?.label ??
    'Dashboard'

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-black/30 bg-panel px-4 text-panel-foreground sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="font-display text-lg font-bold uppercase tracking-wider sm:text-xl">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <CoinBalance amount={2450} />
        <NotificationBell />
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-2 rounded-md px-1.5 py-1 transition-colors hover:bg-white/10"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cta-blue font-display text-sm font-bold text-white">
            DA
          </span>
          <span className="hidden font-display text-sm font-semibold uppercase tracking-wide sm:inline">
            director_ace
          </span>
        </Link>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-panel shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md text-panel-foreground/70 hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            <DashboardSidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </header>
  )
}
