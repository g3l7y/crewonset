'use client'

import { useState } from 'react'
import {
  Bell,
  Moon,
  Eye,
  Globe,
  Trophy,
  X,
  AlertTriangle,
  PowerOff,
  Trash2,
} from 'lucide-react'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'

interface Toggle {
  key: string
  label: string
  desc: string
  icon: typeof Bell
  on: boolean
}

const inputClass =
  'w-full rounded-md border border-white/15 bg-black/20 px-4 py-2.5 text-panel-foreground placeholder:text-panel-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40'

export default function SettingsPage() {
  const [toggles, setToggles] = useState<Toggle[]>([
    {
      key: 'notifications',
      label: 'Web notifications',
      desc: 'Show crucial alerts in the dashboard bell.',
      icon: Bell,
      on: true,
    },
    {
      key: 'dark',
      label: 'Reduced brightness',
      desc: 'Dim panels for late-night editing sessions.',
      icon: Moon,
      on: false,
    },
    {
      key: 'activity',
      label: 'Public activity feed',
      desc: 'Let friends see your recent productions.',
      icon: Eye,
      on: true,
    },
    {
      key: 'online',
      label: 'Show online status',
      desc: 'Display when you are on set to your crew.',
      icon: Globe,
      on: true,
    },
    {
      key: 'achievements',
      label: 'Achievement popups',
      desc: 'Celebrate unlocks with an on-screen banner.',
      icon: Trophy,
      on: true,
    },
  ])

  const [dialog, setDialog] = useState<null | 'deactivate' | 'delete'>(null)

  function flip(key: string) {
    setToggles((prev) =>
      prev.map((t) => (t.key === key ? { ...t, on: !t.on } : t)),
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <SectionLabel>Preferences</SectionLabel>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground text-balance">
          Settings
        </h2>
        <p className="mt-1 max-w-xl text-muted-foreground">
          Control how Crew On Set looks and behaves on the web, and manage your
          account.
        </p>
      </div>

      {/* Display preferences */}
      <section>
        <h3 className="mb-4 font-display text-xl font-bold tracking-wide text-foreground">
          Web Display
        </h3>
        <Panel className="p-2">
          <ul className="divide-y divide-white/5">
            {toggles.map((t) => {
              const Icon = t.icon
              return (
                <li key={t.key} className="flex items-center gap-4 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/25 text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-semibold text-panel-foreground">
                      {t.label}
                    </p>
                    <p className="mt-0.5 text-xs text-panel-foreground/55">
                      {t.desc}
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={t.on}
                    aria-label={t.label}
                    onClick={() => flip(t.key)}
                    className={
                      'relative h-6 w-11 shrink-0 rounded-full transition-colors ' +
                      (t.on ? 'bg-cta-green' : 'bg-black/40')
                    }
                  >
                    <span
                      className={
                        'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ' +
                        (t.on ? 'translate-x-[22px]' : 'translate-x-0.5')
                      }
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </Panel>
      </section>

      {/* Danger zone */}
      <section>
        <h3 className="mb-4 font-display text-xl font-bold tracking-wide text-cta-red">
          Account Management
        </h3>
        <Panel className="flex flex-col gap-4 p-6 ring-1 ring-cta-red/30 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-cta-red/20 text-cta-red">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-panel-foreground">
                Deactivate or delete account
              </p>
              <p className="mt-0.5 max-w-md text-xs text-panel-foreground/55">
                Deactivating hides your profile until you log back in. Deleting
                is permanent and syncs across web and game. Both require your
                password.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDialog('deactivate')}
              className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-panel-foreground/80 transition-colors hover:bg-white/10"
            >
              <PowerOff className="h-4 w-4" /> Deactivate
            </button>
            <button
              type="button"
              onClick={() => setDialog('delete')}
              className="inline-flex items-center gap-1.5 rounded-md bg-cta-red px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        </Panel>
      </section>

      {dialog && (
        <ConfirmDialog kind={dialog} onClose={() => setDialog(null)} />
      )}
    </div>
  )
}

function ConfirmDialog({
  kind,
  onClose,
}: {
  kind: 'deactivate' | 'delete'
  onClose: () => void
}) {
  const isDelete = kind === 'delete'
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

        <span
          className={
            'flex h-12 w-12 items-center justify-center rounded-xl ' +
            (isDelete
              ? 'bg-cta-red/20 text-cta-red'
              : 'bg-primary/25 text-primary-foreground')
          }
        >
          {isDelete ? (
            <Trash2 className="h-6 w-6" />
          ) : (
            <PowerOff className="h-6 w-6" />
          )}
        </span>

        <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-wide text-panel-foreground">
          {isDelete ? 'Delete account' : 'Deactivate account'}
        </h3>
        <p className="mt-1 text-sm text-panel-foreground/60">
          {isDelete
            ? 'This permanently erases your profile, wardrobe, and progress across web and game. This cannot be undone.'
            : 'Your profile will be hidden until you sign back in. Your progress is kept safe.'}
        </p>

        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            onClose()
          }}
        >
          <label className="block">
            <span className="mb-1.5 block font-display text-xs uppercase tracking-widest text-primary">
              Confirm your password
            </span>
            <input type="password" className={inputClass} placeholder="••••••••" required />
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              className={
                'flex-1 rounded-md px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5 ' +
                (isDelete ? 'bg-cta-red' : 'bg-primary')
              }
            >
              {isDelete ? 'Delete Forever' : 'Deactivate'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-white/5 px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-panel-foreground/70 transition-colors hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </form>
      </Panel>
    </div>
  )
}
