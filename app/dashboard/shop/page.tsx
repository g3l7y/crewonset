'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Coins,
  Check,
  Plus,
  X,
  Wallet,
  ShieldCheck,
  Mail,
  RefreshCw,
} from 'lucide-react'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'

type Category = 'all' | 'Outfit' | 'Hair' | 'Accessory'

interface Item {
  id: number
  name: string
  type: Exclude<Category, 'all'>
  price: number
  img: string
  owned?: boolean
}

const ITEMS: Item[] = [
  { id: 1, name: 'Director Jacket', type: 'Outfit', price: 1200, img: '/images/item-director-jacket.png', owned: true },
  { id: 2, name: 'Camera Vest', type: 'Outfit', price: 950, img: '/images/item-camera-vest.png', owned: true },
  { id: 3, name: 'Editor Hoodie', type: 'Outfit', price: 800, img: '/images/item-editor-hoodie.png' },
  { id: 4, name: 'Studio Headphones', type: 'Accessory', price: 450, img: '/images/item-headphones.png' },
  { id: 5, name: 'Red Cap', type: 'Accessory', price: 300, img: '/images/item-cap.png' },
  { id: 6, name: 'Signature Hair', type: 'Hair', price: 600, img: '/images/item-hair.png' },
]

const TOPUP = [
  { coins: 500, price: '₱120' },
  { coins: 1200, price: '₱250' },
  { coins: 3000, price: '₱600' },
  { coins: 6500, price: '₱1,200' },
]

const GATEWAYS = ['G-Cash', 'UnionBank', 'PayPal'] as const

const CATEGORIES: Category[] = ['all', 'Outfit', 'Hair', 'Accessory']

export default function ShopPage() {
  const [category, setCategory] = useState<Category>('all')
  const [topupOpen, setTopupOpen] = useState(false)

  const visible =
    category === 'all' ? ITEMS : ITEMS.filter((i) => i.type === category)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>Wardrobe</SectionLabel>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground text-balance">
            Shop
          </h2>
          <p className="mt-1 max-w-xl text-muted-foreground">
            Customize your avatar with C Coins. Purchases sync instantly to your
            web and in-game character.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setTopupOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-coin px-5 py-3 font-display text-sm font-semibold uppercase tracking-wider text-[#3a2e00] shadow-md transition-transform hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" /> Top Up C Coins
        </button>
      </div>

      {/* Balance */}
      <Panel className="flex items-center justify-between p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-coin/20 text-coin">
            <Coins className="h-7 w-7" />
          </span>
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-panel-foreground/50">
              Your Balance
            </p>
            <p className="font-display text-3xl font-bold text-coin">
              2,450 <span className="text-panel-foreground/50">C</span>
            </p>
          </div>
        </div>
        <span className="hidden items-center gap-1.5 rounded-md bg-cta-green/15 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wider text-cta-green sm:inline-flex">
          <ShieldCheck className="h-3.5 w-3.5" /> Instant Avatar Sync
        </span>
      </Panel>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={
              'rounded-md px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider transition-colors ' +
              (category === c
                ? 'bg-primary text-primary-foreground'
                : 'bg-panel text-panel-foreground/60 ring-1 ring-black/20 hover:text-panel-foreground')
            }
          >
            {c === 'all' ? 'All Items' : c}
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((item) => (
          <Panel key={item.id} className="flex flex-col p-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-background/90">
              <Image
                src={item.img || '/placeholder.svg'}
                alt={item.name}
                fill
                className="object-contain p-2"
                sizes="200px"
              />
            </div>
            <p className="mt-3 font-display text-sm font-bold uppercase leading-tight tracking-wide text-panel-foreground">
              {item.name}
            </p>
            <p className="text-[11px] uppercase tracking-wider text-panel-foreground/40">
              {item.type}
            </p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 font-display text-sm font-bold text-coin">
                <Coins className="h-4 w-4" />
                {item.price.toLocaleString()}
              </span>
              {item.owned ? (
                <span className="inline-flex items-center gap-1 rounded-md bg-cta-green/15 px-2.5 py-1.5 font-display text-[11px] font-semibold uppercase tracking-wider text-cta-green">
                  <Check className="h-3.5 w-3.5" /> Owned
                </span>
              ) : (
                <button
                  type="button"
                  className="rounded-md bg-cta-green px-3 py-1.5 font-display text-[11px] font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
                >
                  Buy
                </button>
              )}
            </div>
          </Panel>
        ))}
      </div>

      {topupOpen && <TopUpModal onClose={() => setTopupOpen(false)} />}
    </div>
  )
}

function TopUpModal({ onClose }: { onClose: () => void }) {
  const [pack, setPack] = useState(TOPUP[1])
  const [gateway, setGateway] = useState<(typeof GATEWAYS)[number]>('G-Cash')
  const [done, setDone] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />
      <Panel className="relative w-full max-w-md p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md text-panel-foreground/60 transition-colors hover:bg-white/10 hover:text-panel-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="flex flex-col items-center py-4 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cta-green/20 text-cta-green">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold text-panel-foreground">
              Top-up complete
            </h3>
            <p className="mt-2 text-sm text-panel-foreground/60">
              {pack.coins.toLocaleString()} C Coins were added to your wallet via{' '}
              {gateway}.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-black/25 px-3 py-2 text-xs text-panel-foreground/60">
              <Mail className="h-4 w-4 text-primary" /> A receipt was emailed to
              ace@crewonset.gg
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-md bg-cta-green px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="inline-flex items-center gap-2 font-display text-xl font-bold uppercase tracking-wide text-panel-foreground">
              <Wallet className="h-5 w-5 text-coin" /> Top Up C Coins
            </h3>
            <p className="mt-1 text-sm text-panel-foreground/60">
              Buy coins with real money. Funds are securely routed to the game
              treasury.
            </p>

            <p className="mb-2 mt-6 font-display text-xs uppercase tracking-widest text-primary">
              Choose a bundle
            </p>
            <div className="grid grid-cols-2 gap-3">
              {TOPUP.map((t) => (
                <button
                  key={t.coins}
                  type="button"
                  onClick={() => setPack(t)}
                  className={
                    'rounded-lg p-4 text-left transition-colors ' +
                    (pack.coins === t.coins
                      ? 'bg-coin/15 ring-2 ring-coin'
                      : 'bg-black/25 ring-1 ring-white/10 hover:ring-white/25')
                  }
                >
                  <span className="inline-flex items-center gap-1 font-display text-lg font-bold text-coin">
                    <Coins className="h-4 w-4" />
                    {t.coins.toLocaleString()}
                  </span>
                  <p className="mt-1 font-display text-sm font-semibold text-panel-foreground">
                    {t.price}
                  </p>
                </button>
              ))}
            </div>

            <p className="mb-2 mt-6 font-display text-xs uppercase tracking-widest text-primary">
              Payment method
            </p>
            <div className="grid grid-cols-3 gap-2">
              {GATEWAYS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGateway(g)}
                  className={
                    'rounded-md px-2 py-2.5 font-display text-xs font-semibold uppercase tracking-wide transition-colors ' +
                    (gateway === g
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-black/25 text-panel-foreground/60 ring-1 ring-white/10 hover:text-panel-foreground')
                  }
                >
                  {g}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setDone(true)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-cta-green px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-transform hover:-translate-y-0.5"
            >
              <RefreshCw className="h-4 w-4" /> Pay {pack.price} with {gateway}
            </button>
            <p className="mt-3 text-center text-[11px] text-panel-foreground/40">
              Transactions are encrypted. An email receipt is sent automatically.
            </p>
          </>
        )}
      </Panel>
    </div>
  )
}
