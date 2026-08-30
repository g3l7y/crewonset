'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { ADMIN_NAV } from './nav-items'
import { AdminSidebar } from './admin-sidebar'
import { AdminNotificationBell } from './admin-notification-bell'

const TITLES: Record<string, string> = {
  '/admin': 'Overview',
  '/admin/players': 'Player Management',
  '/admin/contacts': 'Contact Review Hub',
  '/admin/transactions': 'Transactions',
  '/admin/revenue': 'Advertisement Revenue',
}

export function AdminTopbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const title =
    TITLES[pathname] ??
    (pathname.startsWith('/admin/revenue')
      ? 'Advertisement Revenue'
      : ADMIN_NAV.find((n) => pathname.startsWith(n.href))?.label ?? 'Admin')

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-black/40 bg-panel px-4 text-panel-foreground sm:px-6">
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
        <AdminNotificationBell />
        <div className="flex items-center gap-2 rounded-md px-1.5 py-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cta-red font-display text-sm font-bold text-white">
            AD
          </span>
          <span className="hidden font-display text-sm font-semibold uppercase tracking-wide sm:inline">
            admin_root
          </span>
        </div>
      </div>

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
            <AdminSidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </header>
  )
}
