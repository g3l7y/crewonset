import type { Metadata } from 'next'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'

export const metadata: Metadata = {
  title: 'Team — Crew On Set',
  description:
    'Meet the crew behind Crew On Set — the students who directed, designed, and built the game.',
}

const TEAM = [
  {
    name: 'Princess',
    role: 'Project Lead & Game Designer',
    image: '/images/team-princess.png',
  },
  {
    name: 'Rae',
    role: 'Programmer & Systems',
    image: '/images/team-rae.png',
  },
  {
    name: 'Joseph',
    role: 'Art & Animation',
    image: '/images/team-joseph.png',
  },
  {
    name: 'Mckelvin',
    role: 'Audio & Level Design',
    image: '/images/team-mckelvin.png',
  },
]

export default function TeamPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-4 pt-14 pb-6 sm:px-6">
        <SectionLabel>The Crew</SectionLabel>
        <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          Meet the team behind the cameras
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Crew On Set is a student capstone project brought to life by a small
          crew wearing a lot of hats. Here are the people who made it.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <Panel key={member.name} className="p-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-background">
                <Image
                  src={member.image || '/placeholder.svg'}
                  alt={`Portrait of ${member.name}`}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="mt-4 text-center font-display text-xl font-bold text-panel-foreground">
                {member.name}
              </h2>
              <p className="mt-1 text-center text-sm text-primary">
                {member.role}
              </p>
            </Panel>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
