'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Clapperboard, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DASHBOARD_NAV } from './nav-items'

export function DashboardSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className="flex items-center gap-2 border-b border-white/10 px-5 py-4"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Clapperboard className="h-5 w-5" />
        </span>
        <span className="font-display text-lg font-bold uppercase tracking-widest text-panel-foreground">
          Crew On Set
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {DASHBOARD_NAV.map((item) => {
          const Icon = item.icon
          const active =
            item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 font-display text-sm font-medium uppercase tracking-wider transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-panel-foreground/70 hover:bg-white/10 hover:text-panel-foreground',
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 font-display text-sm font-medium uppercase tracking-wider text-panel-foreground/70 transition-colors hover:bg-cta-red/20 hover:text-cta-red"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Link>
      </div>
    </div>
  )
}
