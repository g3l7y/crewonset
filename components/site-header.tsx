'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Clapperboard } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/download', label: 'Download' },
  { href: '/team', label: 'Team' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/30 bg-panel text-panel-foreground">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Clapperboard className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold uppercase tracking-widest">
            Crew On Set
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-2 font-display text-sm font-medium uppercase tracking-wider transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-panel-foreground/70 hover:bg-white/10 hover:text-panel-foreground',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-md px-4 py-2 font-display text-sm font-semibold uppercase tracking-wider text-panel-foreground/80 transition-colors hover:text-panel-foreground"
          >
            Login
          </Link>
          <Link
            href="/login?mode=signup"
            className="rounded-md bg-cta-green px-4 py-2 font-display text-sm font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-white/10 md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 font-display text-sm font-medium uppercase tracking-wider text-panel-foreground/80 hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-md border border-white/20 px-4 py-2 text-center font-display text-sm font-semibold uppercase tracking-wider"
              >
                Login
              </Link>
              <Link
                href="/login?mode=signup"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-md bg-cta-green px-4 py-2 text-center font-display text-sm font-semibold uppercase tracking-wider text-white"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
