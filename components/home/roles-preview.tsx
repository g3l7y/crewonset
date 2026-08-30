import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'

export const ROLES = [
  {
    name: 'Director',
    image: '/images/role-director.png',
    blurb:
      'Call the shots. Plan the scene, guide the crew, and approve every take before it rolls.',
  },
  {
    name: 'Cameraman',
    image: '/images/role-cameraman.png',
    blurb:
      'Frame the story. Line up angles, nail focus, and capture the footage the edit needs.',
  },
  {
    name: 'AV Technician',
    image: '/images/role-av.png',
    blurb:
      'Own the sound and lights. Balance audio levels and set the mood on set.',
  },
  {
    name: 'Editor',
    image: '/images/role-editor.png',
    blurb:
      'Cut it together. Splice takes, sync audio, and deliver the finished commercial.',
  },
]

export function RolesPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <SectionLabel>Pick Your Role</SectionLabel>
          <h2 className="mt-4 text-balance font-display text-3xl font-bold text-foreground sm:text-4xl">
            Every great ad needs a crew
          </h2>
          <p className="mt-3 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            Four roles, one shared goal. Master a station or rotate through them
            all to see how a commercial comes together.
          </p>
        </div>
        <Link
          href="/features"
          className="inline-flex items-center gap-1.5 font-display text-sm font-semibold uppercase tracking-wider text-primary hover:underline"
        >
          See all features
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ROLES.map((role) => (
          <Panel key={role.name} className="flex flex-col p-3">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-background">
              <Image
                src={role.image || '/placeholder.svg'}
                alt={`${role.name} character illustration`}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 px-1 font-display text-xl font-bold text-panel-foreground">
              {role.name}
            </h3>
            <p className="mt-2 px-1 pb-2 text-sm leading-relaxed text-panel-foreground/60">
              {role.blurb}
            </p>
          </Panel>
        ))}
      </div>
    </section>
  )
}
