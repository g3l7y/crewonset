'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Download } from 'lucide-react'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'

const DRIVE_URL = 'https://drive.google.com/'

export function Hero() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 pb-8 sm:px-6 lg:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionLabel>Video Commercial Sim</SectionLabel>
          <h1 className="mt-5 text-balance font-display text-5xl font-bold leading-[0.95] text-foreground sm:text-6xl lg:text-7xl">
            Lights. Camera.
            <span className="block text-primary">Action!</span>
          </h1>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Step onto the set of{' '}
            <span className="font-semibold text-foreground">Crew On Set</span> —
            the simulation where you direct, shoot, mix, and edit your way to
            the perfect commercial. Build your crew and roll the cameras.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-cta-green px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-transform hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" />
              Download Now
            </a>
            <Link
              href="/features"
              className="inline-flex items-center gap-2 rounded-md border border-foreground/20 px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-foreground/5"
            >
              Explore Features
            </Link>
          </div>
        </div>

        {/* Embedded story video */}
        <Panel className="overflow-hidden p-2.5">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
            {playing ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Crew On Set — Story Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <Image
                  src="/images/hero-set.png"
                  alt="Illustration of a busy film commercial production set"
                  fill
                  priority
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/40"
                  aria-label="Play story trailer"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cta-red text-white shadow-xl transition-transform group-hover:scale-110">
                    <Play className="h-7 w-7 translate-x-0.5 fill-current" />
                  </span>
                </button>
                <span className="absolute bottom-3 left-3 rounded bg-black/70 px-2 py-1 font-display text-xs uppercase tracking-widest text-white">
                  Story Trailer
                </span>
              </>
            )}
          </div>
        </Panel>
      </div>
    </section>
  )
}
