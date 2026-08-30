import type { Metadata } from 'next'
import Image from 'next/image'
import { Download, Monitor, Cpu, HardDrive } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'

export const metadata: Metadata = {
  title: 'Download — Crew On Set',
  description:
    'Download Crew On Set for free and start producing commercials with your crew.',
}

const DRIVE_URL = 'https://drive.google.com/'

const SPECS = [
  { icon: Monitor, label: 'OS', value: 'Windows 10 / 11 (64-bit)' },
  { icon: Cpu, label: 'Processor', value: 'Intel i3 / Ryzen 3 or better' },
  { icon: HardDrive, label: 'Storage', value: '1.5 GB available space' },
]

export default function DownloadPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-4 pt-14 pb-8 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionLabel>Download</SectionLabel>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Get Crew On Set
            </h1>
            <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
              The full game is free to download. Grab the latest build, install
              it, and get your crew rolling in minutes.
            </p>

            <a
              href={DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-cta-green px-7 py-3.5 font-display text-base font-semibold uppercase tracking-wider text-white shadow-md transition-transform hover:-translate-y-0.5"
            >
              <Download className="h-5 w-5" />
              Download for Windows
            </a>
            <p className="mt-3 text-sm text-muted-foreground">
              Latest build · Hosted on Google Drive
            </p>
          </div>

          <Panel className="overflow-hidden p-2.5">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-background">
              <Image
                src="/images/hero-set.png"
                alt="In-game illustration of the Crew On Set production set"
                fill
                className="object-cover"
              />
            </div>
          </Panel>
        </div>
      </section>

      {/* System requirements */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-foreground">
          System requirements
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {SPECS.map(({ icon: Icon, label, value }) => (
            <Panel key={label} className="p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-xs uppercase tracking-widest text-primary">
                {label}
              </p>
              <p className="mt-1 font-medium text-panel-foreground">{value}</p>
            </Panel>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
