'use client'

import { useMemo, useState } from 'react'
import { Search, RotateCcw, Trash2, X, AlertTriangle } from 'lucide-react'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'
import { cn } from '@/lib/utils'

interface Player {
  id: number
  username: string
  email: string
  level: number
  coins: number
  lastActive: string
  activity: string
  status: 'online' | 'offline' | 'flagged'
}

const INITIAL_PLAYERS: Player[] = [
  {
    id: 1,
    username: 'director_ace',
    email: 'ace@crewonset.gg',
    level: 24,
    coins: 2450,
    lastActive: '2m ago',
    activity: 'Shooting "City Lights" commercial',
    status: 'online',
  },
  {
    id: 2,
    username: 'boom_operator_lea',
    email: 'lea.b@gmail.com',
    level: 18,
    coins: 980,
    lastActive: '1h ago',
    activity: 'Editing reel in post-production',
    status: 'online',
  },
  {
    id: 3,
    username: 'grip_marco',
    email: 'marco99@outlook.com',
    level: 3,
    coins: 120,
    lastActive: '5h ago',
    activity: 'Completed tutorial set',
    status: 'offline',
  },
  {
    id: 4,
    username: 'cam_ops_nina',
    email: 'nina.cam@yahoo.com',
    level: 31,
    coins: 5610,
    lastActive: 'Yesterday',
    activity: 'Purchased Director Bomber Jacket',
    status: 'offline',
  },
  {
    id: 5,
    username: 'gaffer_theo',
    email: 'theo.light@gmail.com',
    level: 12,
    coins: 340,
    lastActive: '3d ago',
    activity: 'Reported for spam in chat',
    status: 'flagged',
  },
  {
    id: 6,
    username: 'editor_sam',
    email: 'sam.edits@proton.me',
    level: 27,
    coins: 3120,
    lastActive: '20m ago',
    activity: 'Uploaded final cut for review',
    status: 'online',
  },
]

const STATUS_STYLE: Record<Player['status'], string> = {
  online: 'bg-cta-green/20 text-cta-green',
  offline: 'bg-white/10 text-panel-foreground/50',
  flagged: 'bg-cta-red/20 text-cta-red',
}

export default function PlayerManagementPage() {
  const [players, setPlayers] = useState(INITIAL_PLAYERS)
  const [query, setQuery] = useState('')
  const [confirm, setConfirm] = useState<{
    player: Player
    action: 'delete' | 'reset'
  } | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return players
    return players.filter(
      (p) =>
        p.username.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q),
    )
  }, [players, query])

  function runAction() {
    if (!confirm) return
    if (confirm.action === 'delete') {
      setPlayers((prev) => prev.filter((p) => p.id !== confirm.player.id))
    } else {
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === confirm.player.id
            ? { ...p, level: 1, coins: 0, activity: 'Account reset by admin' }
            : p,
        ),
      )
    }
    setConfirm(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>Player Management</SectionLabel>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-panel-foreground/60">
            Review player activity and take action. Deletes and resets sync
            across both the web platform and the game client.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-panel-foreground/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search username or email"
            className="w-full rounded-md bg-black/25 py-2.5 pl-9 pr-3 text-sm text-panel-foreground ring-1 ring-white/10 outline-none placeholder:text-panel-foreground/40 focus:ring-primary"
          />
        </div>
      </div>

      <Panel flush className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 font-display text-xs uppercase tracking-wider text-panel-foreground/50">
                <th className="px-5 py-3 font-semibold">Player</th>
                <th className="px-5 py-3 font-semibold">Level</th>
                <th className="px-5 py-3 font-semibold">C-Coins</th>
                <th className="px-5 py-3 font-semibold">Recent Activity</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-white/5">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cta-blue font-display text-xs font-bold uppercase text-white">
                        {p.username.slice(0, 2)}
                      </span>
                      <div className="min-w-0">
                        <p className="font-display font-semibold tracking-wide">
                          {p.username}
                        </p>
                        <p className="truncate text-xs text-panel-foreground/50">
                          {p.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-display font-semibold">
                    {p.level}
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-display font-semibold text-coin">
                      {p.coins.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-panel-foreground/70">
                    <p className="max-w-[220px] truncate">{p.activity}</p>
                    <p className="text-xs text-panel-foreground/40">
                      {p.lastActive}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-display text-[11px] font-semibold uppercase tracking-wider',
                        STATUS_STYLE[p.status],
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setConfirm({ player: p, action: 'reset' })}
                        className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wider text-panel-foreground/80 ring-1 ring-white/10 transition-colors hover:bg-cta-blue hover:text-white"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setConfirm({ player: p, action: 'delete' })
                        }
                        className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wider text-panel-foreground/80 ring-1 ring-white/10 transition-colors hover:bg-cta-red hover:text-white"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-panel-foreground/50"
                  >
                    No players match &ldquo;{query}&rdquo;.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>

      {confirm && (
        <ConfirmModal
          player={confirm.player}
          action={confirm.action}
          onCancel={() => setConfirm(null)}
          onConfirm={runAction}
        />
      )}
    </div>
  )
}

function ConfirmModal({
  player,
  action,
  onCancel,
  onConfirm,
}: {
  player: Player
  action: 'delete' | 'reset'
  onCancel: () => void
  onConfirm: () => void
}) {
  const isDelete = action === 'delete'
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/70"
        onClick={onCancel}
      />
      <Panel className="relative z-10 w-full max-w-md p-6">
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-panel-foreground/60 hover:bg-white/10"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <span
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-md',
            isDelete
              ? 'bg-cta-red/20 text-cta-red'
              : 'bg-cta-blue/20 text-cta-blue',
          )}
        >
          <AlertTriangle className="h-5 w-5" />
        </span>
        <h2 className="mt-4 font-display text-xl font-bold uppercase tracking-wide">
          {isDelete ? 'Delete account' : 'Reset account'}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-panel-foreground/60">
          {isDelete ? (
            <>
              This permanently removes{' '}
              <span className="font-semibold text-panel-foreground">
                {player.username}
              </span>{' '}
              from the web and game. This action cannot be undone.
            </>
          ) : (
            <>
              This resets{' '}
              <span className="font-semibold text-panel-foreground">
                {player.username}
              </span>{' '}
              to level 1 with 0 C-Coins across the web and game.
            </>
          )}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-panel-foreground/70 ring-1 ring-white/10 transition-colors hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              'rounded-md px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-white transition-colors',
              isDelete
                ? 'bg-cta-red hover:brightness-110'
                : 'bg-cta-blue hover:brightness-110',
            )}
          >
            {isDelete ? 'Delete' : 'Reset'}
          </button>
        </div>
      </Panel>
    </div>
  )
}
