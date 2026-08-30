'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Panel } from '@/components/panel'

export function AuthCard() {
  const params = useSearchParams()
  const [mode, setMode] = useState<'login' | 'signup'>(
    params.get('mode') === 'signup' ? 'signup' : 'login',
  )

  const isSignup = mode === 'signup'

  return (
    <Panel className="w-full max-w-md p-6 sm:p-8">
      {/* Toggle */}
      <div className="mb-6 grid grid-cols-2 gap-1 rounded-lg bg-black/25 p-1">
        {(['login', 'signup'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={
              'rounded-md py-2 font-display text-sm font-semibold uppercase tracking-wider transition-colors ' +
              (mode === m
                ? 'bg-primary text-primary-foreground'
                : 'text-panel-foreground/60 hover:text-panel-foreground')
            }
          >
            {m === 'login' ? 'Login' : 'Sign Up'}
          </button>
        ))}
      </div>

      <h1 className="font-display text-2xl font-bold text-panel-foreground">
        {isSignup ? 'Create your account' : 'Welcome back'}
      </h1>
      <p className="mt-1 text-sm text-panel-foreground/60">
        {isSignup
          ? 'Join the crew and save your production progress.'
          : 'Sign in to get back on set.'}
      </p>

      <form
        className="mt-6 flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        {isSignup && (
          <Field label="Display name" htmlFor="name">
            <input
              id="name"
              name="name"
              required
              className={inputClass}
              placeholder="Crew member name"
            />
          </Field>
        )}
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="you@email.com"
          />
        </Field>
        <Field label="Password" htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            required
            className={inputClass}
            placeholder="••••••••"
          />
        </Field>

        <button
          type="submit"
          className="mt-2 rounded-md bg-cta-green px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-transform hover:-translate-y-0.5"
        >
          {isSignup ? 'Create Account' : 'Login'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-panel-foreground/60">
        {isSignup ? 'Already have an account? ' : 'New to Crew On Set? '}
        <button
          type="button"
          onClick={() => setMode(isSignup ? 'login' : 'signup')}
          className="font-semibold text-primary hover:underline"
        >
          {isSignup ? 'Login' : 'Create one'}
        </button>
      </p>

      <p className="mt-4 text-center text-xs text-panel-foreground/40">
        <Link href="/" className="hover:text-panel-foreground/70">
          Back to home
        </Link>
      </p>
    </Panel>
  )
}

const inputClass =
  'w-full rounded-md border border-white/15 bg-black/20 px-4 py-2.5 text-panel-foreground placeholder:text-panel-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40'

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block font-display text-xs uppercase tracking-widest text-primary">
        {label}
      </span>
      {children}
    </label>
  )
}
