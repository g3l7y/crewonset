import Link from 'next/link'
import { Download, Handshake } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/home/hero'
import { RolesPreview } from '@/components/home/roles-preview'
import { SectionLabel } from '@/components/section-label'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <Hero />
      <RolesPreview />

      {/* Closing CTA band */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="overflow-hidden rounded-2xl bg-primary px-6 py-12 text-center sm:px-12 sm:py-16">
          <SectionLabel className="bg-black/25 text-white">
            Ready When You Are
          </SectionLabel>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
            Grab the game and get your crew on set
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-primary-foreground/80">
            Free to download. Support the project by becoming a sponsor and help
            us keep the cameras rolling.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 rounded-md bg-cta-green px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-transform hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" />
              Download Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-white/15 px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-white/25"
            >
              <Handshake className="h-4 w-4" />
              Become a Sponsor
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
