import Image from 'next/image'
import Link from 'next/link'
import {
  Film,
  Trophy,
  Coins,
  Flame,
  Clapperboard,
  Scissors,
  Camera,
  ArrowRight,
} from 'lucide-react'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'

const STATS = [
  { label: 'Current Level', value: '12', icon: Flame, tint: 'text-cta-red' },
  { label: 'Productions', value: '28', icon: Film, tint: 'text-cta-blue' },
  { label: 'Achievements', value: '17', icon: Trophy, tint: 'text-coin' },
  { label: 'C Coins', value: '2,450', icon: Coins, tint: 'text-coin' },
]

const ACTIVITY = [
  {
    icon: Clapperboard,
    title: 'Wrapped "City Lights" commercial',
    meta: 'Directed • Rated B+ • +320 C',
    time: '2 hours ago',
    color: 'bg-cta-green/20 text-cta-green',
  },
  {
    icon: Scissors,
    title: 'Edited final cut for "Fresh Brew"',
    meta: 'Editor role • 4 scenes stitched',
    time: 'Yesterday',
    color: 'bg-cta-blue/20 text-cta-blue',
  },
  {
    icon: Camera,
    title: 'Shot B-roll on "Night Market"',
    meta: 'Cameraman • 12 clips captured',
    time: '2 days ago',
    color: 'bg-primary/25 text-primary-foreground',
  },
  {
    icon: Trophy,
    title: 'Unlocked "First Cut" achievement',
    meta: 'Milestone • +50 C bonus',
    time: '3 days ago',
    color: 'bg-coin/20 text-coin',
  },
]

const OWNED = [
  { name: 'Director Jacket', type: 'Outfit', img: '/images/item-director-jacket.png' },
  { name: 'Camera Vest', type: 'Outfit', img: '/images/item-camera-vest.png' },
  { name: 'Studio Headphones', type: 'Accessory', img: '/images/item-headphones.png' },
  { name: 'Editor Hoodie', type: 'Outfit', img: '/images/item-editor-hoodie.png' },
  { name: 'Red Cap', type: 'Accessory', img: '/images/item-cap.png' },
  { name: 'Signature Hair', type: 'Hair', img: '/images/item-hair.png' },
]

export default function DashboardHome() {
  return (
    <div className="flex flex-col gap-8">
      {/* Welcome */}
      <div>
        <SectionLabel>On Set</SectionLabel>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground text-balance">
          Welcome back, director_ace
        </h2>
        <p className="mt-1 max-w-xl text-muted-foreground">
          Here&apos;s the latest from your production slate. Keep the crew rolling.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => {
          const Icon = s.icon
          return (
            <Panel key={s.label} className="p-5">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-panel-foreground/50">
                  {s.label}
                </span>
                <Icon className={`h-5 w-5 ${s.tint}`} />
              </div>
              <p className="mt-3 font-display text-3xl font-bold text-panel-foreground">
                {s.value}
              </p>
            </Panel>
          )
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Recent activity */}
        <section className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-xl font-bold tracking-wide text-foreground">
              Recent Activity
            </h3>
            <Link
              href="/dashboard/almanac"
              className="inline-flex items-center gap-1 font-display text-xs uppercase tracking-widest text-primary hover:underline"
            >
              View almanac <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <Panel className="p-2">
            <ul className="divide-y divide-white/5">
              {ACTIVITY.map((a) => {
                const Icon = a.icon
                return (
                  <li key={a.title} className="flex gap-4 p-4">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${a.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm font-semibold text-panel-foreground">
                        {a.title}
                      </p>
                      <p className="mt-0.5 text-xs text-panel-foreground/55">
                        {a.meta}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-panel-foreground/40">
                      {a.time}
                    </span>
                  </li>
                )
              })}
            </ul>
          </Panel>
        </section>

        {/* Owned items */}
        <section className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-xl font-bold tracking-wide text-foreground">
              Your Wardrobe
            </h3>
            <Link
              href="/dashboard/shop"
              className="inline-flex items-center gap-1 font-display text-xs uppercase tracking-widest text-primary hover:underline"
            >
              Shop <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <Panel className="p-4">
            <div className="grid grid-cols-3 gap-3">
              {OWNED.map((item) => (
                <div
                  key={item.name}
                  className="group flex flex-col items-center rounded-lg bg-black/20 p-3 text-center ring-1 ring-white/5"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-md bg-background/90">
                    <Image
                      src={item.img || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-contain p-1.5"
                      sizes="120px"
                    />
                  </div>
                  <p className="mt-2 font-display text-[11px] font-semibold uppercase leading-tight tracking-wide text-panel-foreground">
                    {item.name}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-panel-foreground/40">
                    {item.type}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </section>
      </div>
    </div>
  )
}
