'use client'

import { useMemo, useState } from 'react'
import { Coins, Wallet, TrendingUp } from 'lucide-react'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'
import { cn } from '@/lib/utils'

type Gateway = 'G-Cash' | 'UnionBank' | 'PayPal'

interface Txn {
  id: string
  date: string
  time: string
  player: string
  coins: number
  amount: number
  gateway: Gateway
}

const GATEWAY_STYLE: Record<Gateway, string> = {
  'G-Cash': 'bg-cta-blue/20 text-cta-blue',
  UnionBank: 'bg-cta-green/20 text-cta-green',
  PayPal: 'bg-primary/25 text-primary-foreground',
}

const TXNS: Txn[] = [
  {
    id: 'TXN-90418',
    date: 'Aug 30, 2026',
    time: '2:14 PM',
    player: 'director_ace',
    coins: 1500,
    amount: 1500,
    gateway: 'G-Cash',
  },
  {
    id: 'TXN-90417',
    date: 'Aug 30, 2026',
    time: '11:02 AM',
    player: 'cam_ops_nina',
    coins: 5000,
    amount: 4800,
    gateway: 'PayPal',
  },
  {
    id: 'TXN-90416',
    date: 'Aug 29, 2026',
    time: '9:47 PM',
    player: 'editor_sam',
    coins: 3000,
    amount: 2950,
    gateway: 'UnionBank',
  },
  {
    id: 'TXN-90415',
    date: 'Aug 29, 2026',
    time: '6:31 PM',
    player: 'boom_operator_lea',
    coins: 800,
    amount: 800,
    gateway: 'G-Cash',
  },
  {
    id: 'TXN-90414',
    date: 'Aug 29, 2026',
    time: '1:20 PM',
    player: 'gaffer_theo',
    coins: 500,
    amount: 500,
    gateway: 'G-Cash',
  },
  {
    id: 'TXN-90413',
    date: 'Aug 28, 2026',
    time: '8:05 PM',
    player: 'director_ace',
    coins: 10000,
    amount: 9500,
    gateway: 'PayPal',
  },
  {
    id: 'TXN-90412',
    date: 'Aug 28, 2026',
    time: '3:52 PM',
    player: 'cam_ops_nina',
    coins: 2000,
    amount: 1950,
    gateway: 'UnionBank',
  },
]

const FILTERS: Array<'All' | Gateway> = [
  'All',
  'G-Cash',
  'UnionBank',
  'PayPal',
]

export default function TransactionsPage() {
  const [filter, setFilter] = useState<'All' | Gateway>('All')

  const rows = useMemo(
    () => (filter === 'All' ? TXNS : TXNS.filter((t) => t.gateway === filter)),
    [filter],
  )

  const totalRevenue = TXNS.reduce((sum, t) => sum + t.amount, 0)
  const totalCoins = TXNS.reduce((sum, t) => sum + t.coins, 0)

  return (
    <div className="space-y-6">
      <div>
        <SectionLabel>Transactions</SectionLabel>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-panel-foreground/60">
          Chronological ledger of every real-money C-Coin purchase. Funds route
          to the admin bank account.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Panel className="p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-cta-green/20 text-cta-green">
            <Wallet className="h-5 w-5" />
          </span>
          <p className="mt-4 font-display text-2xl font-bold">
            ₱{totalRevenue.toLocaleString()}
          </p>
          <p className="mt-1 font-display text-xs uppercase tracking-wider text-panel-foreground/50">
            Gross revenue
          </p>
        </Panel>
        <Panel className="p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-coin/20 text-coin">
            <Coins className="h-5 w-5" />
          </span>
          <p className="mt-4 font-display text-2xl font-bold">
            {totalCoins.toLocaleString()}
          </p>
          <p className="mt-1 font-display text-xs uppercase tracking-wider text-panel-foreground/50">
            C-Coins issued
          </p>
        </Panel>
        <Panel className="p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-cta-blue/20 text-cta-blue">
            <TrendingUp className="h-5 w-5" />
          </span>
          <p className="mt-4 font-display text-2xl font-bold">{TXNS.length}</p>
          <p className="mt-1 font-display text-xs uppercase tracking-wider text-panel-foreground/50">
            Transactions
          </p>
        </Panel>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-full px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wider ring-1 transition-colors',
              filter === f
                ? 'bg-primary text-primary-foreground ring-primary'
                : 'bg-black/20 text-panel-foreground/60 ring-white/10 hover:bg-white/5',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <Panel flush className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 font-display text-xs uppercase tracking-wider text-panel-foreground/50">
                <th className="px-5 py-3 font-semibold">Transaction</th>
                <th className="px-5 py-3 font-semibold">Date &amp; Time</th>
                <th className="px-5 py-3 font-semibold">Player</th>
                <th className="px-5 py-3 font-semibold">C-Coins</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Gateway</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((t) => (
                <tr key={t.id} className="transition-colors hover:bg-white/5">
                  <td className="px-5 py-4 font-mono text-xs text-panel-foreground/70">
                    {t.id}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium">{t.date}</p>
                    <p className="text-xs text-panel-foreground/40">{t.time}</p>
                  </td>
                  <td className="px-5 py-4 font-display font-semibold tracking-wide">
                    {t.player}
                  </td>
                  <td className="px-5 py-4 font-display font-semibold text-coin">
                    +{t.coins.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 font-display font-semibold">
                    ₱{t.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2.5 py-1 font-display text-[11px] font-semibold uppercase tracking-wider',
                        GATEWAY_STYLE[t.gateway],
                      )}
                    >
                      {t.gateway}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}
