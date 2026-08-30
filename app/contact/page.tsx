import type { Metadata } from 'next'
import { Mail, Handshake, Megaphone } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact & Sponsorship — Crew On Set',
  description:
    'Get in touch with the Crew On Set team or become a sponsor to support the project.',
}

const TIERS = [
  {
    icon: Handshake,
    title: 'Sponsor',
    body: 'Back the project financially and get your name in the credits and on this site.',
  },
  {
    icon: Megaphone,
    title: 'Partner',
    body: 'Collaborate on promotion, events, or in-game brand placements for your product.',
  },
  {
    icon: Mail,
    title: 'Just Say Hi',
    body: 'Feedback, press, or a question about the game? We read every message.',
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-4 pt-14 pb-6 sm:px-6">
        <SectionLabel>Contact &amp; Sponsorship</SectionLabel>
        <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          Let&apos;s make something together
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Whether you want to sponsor the crew, partner up, or just share some
          feedback, drop us a line and we&apos;ll be in touch.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Ways to support */}
        <div className="flex flex-col gap-5">
          {TIERS.map(({ icon: Icon, title, body }) => (
            <Panel key={title} className="flex gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-panel-foreground">
                  {title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-panel-foreground/60">
                  {body}
                </p>
              </div>
            </Panel>
          ))}
        </div>

        {/* Form */}
        <Panel className="p-6 sm:p-8">
          <ContactForm />
        </Panel>
      </section>

      <SiteFooter />
    </main>
  )
}
