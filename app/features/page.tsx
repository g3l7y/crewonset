import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Clapperboard,
  Camera,
  Volume2,
  Scissors,
  Users,
  Trophy,
  Download,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'
import { ROLES } from '@/components/home/roles-preview'

export const metadata: Metadata = {
  title: 'Features — Crew On Set',
  description:
    'Explore the roles and gameplay features of Crew On Set: direct, shoot, mix, and edit commercials as a crew.',
}

const ROLE_ICONS = [Clapperboard, Camera, Volume2, Scissors]

const GAMEPLAY = [
  {
    icon: Users,
    title: 'Co-op Crew',
    body: 'Team up and split the stations, or run solo and rotate through every role on set.',
  },
  {
    icon: Clapperboard,
    title: 'Scene by Scene',
    body: 'Work through a storyboard shot by shot, hitting the brief before the deadline.',
  },
  {
    icon: Trophy,
    title: 'Rated Takes',
    body: 'Every commercial is scored on timing, quality, and teamwork. Chase a perfect cut.',
  },
]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-6 sm:px-6">
        <SectionLabel>Features</SectionLabel>
        <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          Everything you need to make an ad
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Crew On Set puts the whole production pipeline in your hands. Master
          four distinct roles and see a commercial through from first slate to
          final cut.
        </p>
      </section>

      {/* Roles detail */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {ROLES.map((role, i) => {
            const Icon = ROLE_ICONS[i]
            return (
              <Panel key={role.name} className="flex gap-4 p-5">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-background">
                  <Image
                    src={role.image || '/placeholder.svg'}
                    alt={`${role.name} character illustration`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 pt-1">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-xl font-bold text-panel-foreground">
                      {role.name}
                    </h2>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-panel-foreground/60">
                    {role.blurb}
                  </p>
                </div>
              </Panel>
            )
          })}
        </div>
      </section>

      {/* Gameplay pillars */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="text-center">
          <SectionLabel>Gameplay</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-3xl font-bold text-foreground sm:text-4xl">
            Built around teamwork
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {GAMEPLAY.map(({ icon: Icon, title, body }) => (
            <Panel key={title} className="p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-panel-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-panel-foreground/60">
                {body}
              </p>
            </Panel>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Panel className="flex flex-col items-center gap-5 p-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="font-display text-2xl font-bold text-panel-foreground">
              Ready to roll?
            </h2>
            <p className="mt-2 text-panel-foreground/60">
              Download Crew On Set and get your first commercial in the can.
            </p>
          </div>
          <Link
            href="/download"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-cta-green px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-transform hover:-translate-y-0.5"
          >
            <Download className="h-4 w-4" />
            Download Now
          </Link>
        </Panel>
      </section>

      <SiteFooter />
    </main>
  )
}
