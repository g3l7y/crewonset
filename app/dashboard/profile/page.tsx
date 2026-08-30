'use client'

import { useState } from 'react'
import { UserRound, Mail, Lock, Check, X, Pencil, ShieldCheck } from 'lucide-react'
import { Panel } from '@/components/panel'
import { SectionLabel } from '@/components/section-label'

type Field = 'username' | 'email' | 'password'

const inputClass =
  'w-full rounded-md border border-white/15 bg-black/20 px-4 py-2.5 text-panel-foreground placeholder:text-panel-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40'

export default function ProfilePage() {
  const [username, setUsername] = useState('director_ace')
  const [email, setEmail] = useState('ace@crewonset.gg')
  const [editing, setEditing] = useState<Field | null>(null)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <SectionLabel>Account</SectionLabel>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground text-balance">
          Profile Info
        </h2>
        <p className="mt-1 max-w-xl text-muted-foreground">
          View and update your crew credentials. Changes are confirmed with your
          current password.
        </p>
      </div>

      {/* Identity banner */}
      <Panel className="flex flex-col items-center gap-5 p-6 sm:flex-row sm:p-8">
        <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-cta-blue font-display text-3xl font-bold text-white ring-4 ring-white/10">
          DA
        </span>
        <div className="text-center sm:text-left">
          <p className="font-display text-2xl font-bold uppercase tracking-wide text-panel-foreground">
            {username}
          </p>
          <p className="mt-1 text-sm text-panel-foreground/60">{email}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-cta-green/20 px-2.5 py-1 font-display text-xs font-semibold uppercase tracking-wider text-cta-green">
            <ShieldCheck className="h-3.5 w-3.5" /> Verified Player
          </span>
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <EditableField
          field="username"
          label="In-game Username"
          icon={UserRound}
          value={username}
          editing={editing === 'username'}
          onEdit={() => setEditing('username')}
          onCancel={() => setEditing(null)}
          onSave={(v) => {
            setUsername(v)
            setEditing(null)
          }}
        />
        <EditableField
          field="email"
          label="Email Address"
          icon={Mail}
          type="email"
          value={email}
          editing={editing === 'email'}
          onEdit={() => setEditing('email')}
          onCancel={() => setEditing(null)}
          onSave={(v) => {
            setEmail(v)
            setEditing(null)
          }}
        />
        <div className="lg:col-span-2">
          <PasswordField
            editing={editing === 'password'}
            onEdit={() => setEditing('password')}
            onCancel={() => setEditing(null)}
            onSave={() => setEditing(null)}
          />
        </div>
      </div>
    </div>
  )
}

function EditableField({
  field,
  label,
  icon: Icon,
  value,
  type = 'text',
  editing,
  onEdit,
  onCancel,
  onSave,
}: {
  field: Field
  label: string
  icon: typeof UserRound
  value: string
  type?: string
  editing: boolean
  onEdit: () => void
  onCancel: () => void
  onSave: (value: string) => void
}) {
  const [draft, setDraft] = useState(value)
  const [confirm, setConfirm] = useState('')

  return (
    <Panel className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest text-primary">
          <Icon className="h-4 w-4" /> {label}
        </span>
        {!editing && (
          <button
            type="button"
            onClick={() => {
              setDraft(value)
              setConfirm('')
              onEdit()
            }}
            className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wider text-panel-foreground/70 transition-colors hover:bg-white/10 hover:text-panel-foreground"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
        )}
      </div>

      {editing ? (
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            onSave(draft)
          }}
        >
          <label className="block">
            <span className="mb-1.5 block text-xs text-panel-foreground/50">
              New {label.toLowerCase()}
            </span>
            <input
              type={type}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className={inputClass}
              required
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-panel-foreground/50">
              Confirm current password
            </span>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={inputClass}
              placeholder="••••••••"
              required
            />
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-md bg-cta-green px-4 py-2 font-display text-sm font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
            >
              <Check className="h-4 w-4" /> Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-4 py-2 font-display text-sm font-semibold uppercase tracking-wider text-panel-foreground/70 transition-colors hover:bg-white/10"
            >
              <X className="h-4 w-4" /> Cancel
            </button>
          </div>
        </form>
      ) : (
        <p className="font-display text-lg font-semibold text-panel-foreground">
          {value}
        </p>
      )}
    </Panel>
  )
}

function PasswordField({
  editing,
  onEdit,
  onCancel,
  onSave,
}: {
  editing: boolean
  onEdit: () => void
  onCancel: () => void
  onSave: () => void
}) {
  return (
    <Panel className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest text-primary">
          <Lock className="h-4 w-4" /> Password
        </span>
        {!editing && (
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wider text-panel-foreground/70 transition-colors hover:bg-white/10 hover:text-panel-foreground"
          >
            <Pencil className="h-3.5 w-3.5" /> Change
          </button>
        )}
      </div>

      {editing ? (
        <form
          className="grid gap-4 sm:grid-cols-3"
          onSubmit={(e) => {
            e.preventDefault()
            onSave()
          }}
        >
          <label className="block">
            <span className="mb-1.5 block text-xs text-panel-foreground/50">
              Current password
            </span>
            <input type="password" className={inputClass} placeholder="••••••••" required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-panel-foreground/50">
              New password
            </span>
            <input type="password" className={inputClass} placeholder="••••••••" required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-panel-foreground/50">
              Confirm new password
            </span>
            <input type="password" className={inputClass} placeholder="••••••••" required />
          </label>
          <div className="flex gap-2 sm:col-span-3">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-md bg-cta-green px-4 py-2 font-display text-sm font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
            >
              <Check className="h-4 w-4" /> Update Password
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-4 py-2 font-display text-sm font-semibold uppercase tracking-wider text-panel-foreground/70 transition-colors hover:bg-white/10"
            >
              <X className="h-4 w-4" /> Cancel
            </button>
          </div>
        </form>
      ) : (
        <p className="font-display text-lg font-semibold tracking-[0.3em] text-panel-foreground">
          ••••••••••
        </p>
      )}
    </Panel>
  )
}
