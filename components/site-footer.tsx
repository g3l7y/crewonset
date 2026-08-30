import Link from 'next/link'
import { Clapperboard } from 'lucide-react'

const LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/download', label: 'Download' },
  { href: '/team', label: 'Team' },
  { href: '/contact', label: 'Contact' },
  { href: '/login', label: 'Login' },
]

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-black/30 bg-panel text-panel-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Clapperboard className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold uppercase tracking-widest">
              Crew On Set
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-panel-foreground/60">
            A video commercial production simulation. Direct, shoot, mix and
            edit your way to the perfect ad. Lights, camera, action.
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          <span className="font-display text-xs uppercase tracking-widest text-primary">
            Explore
          </span>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-panel-foreground/70 transition-colors hover:text-panel-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <span className="font-display text-xs uppercase tracking-widest text-primary">
            Get Started
          </span>
          <Link
            href="/download"
            className="rounded-md bg-cta-blue px-5 py-2.5 text-center font-display text-sm font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
          >
            Download Now
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-white/20 px-5 py-2.5 text-center font-display text-sm font-semibold uppercase tracking-wider text-panel-foreground/80 hover:bg-white/10"
          >
            Sponsor Us
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-panel-foreground/50 sm:px-6">
          © {new Date().getFullYear()} Crew On Set. A student capstone project.
          All rights reserved.
        </p>
      </div>
    </footer>
  )
}
