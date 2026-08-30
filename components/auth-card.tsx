'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react'
import { Panel } from '@/components/panel'

type Mode = 'login' | 'signup' | 'forgot'

export function AuthCard() {
  const params = useSearchParams()
  const [mode, setMode] = useState<Mode>(
    params.get('mode') === 'signup' ? 'signup' : 'login',
  )
  const [sent, setSent] = useState(false)

  if (mode === 'forgot') {
    return (
      <Panel className="w-full max-w-md p-6 sm:p-8">
        <button
          type="button"
          onClick={() => {
            setMode('login')
            setSent(false)
          }}
          className="mb-6 inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-widest text-panel-foreground/60 transition-colors hover:text-panel-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to login
        </button>

        {sent ? (
          <div className="flex flex-col items-center py-4 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cta-green/20 text-cta-green">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold text-panel-foreground">
              Recovery code sent
            </h1>
            <p className="mt-2 text-sm text-panel-foreground/60">
              We&apos;ve emailed a 6-digit recovery code and a reset link to your
              inbox. Enter the code below to continue.
            </p>
            <input
              inputMode="numeric"
              maxLength={6}
              placeholder="••••••"
              className={
                inputClass +
                ' mt-6 text-center font-display text-2xl tracking-[0.5em]'
              }
            />
            <button
              type="button"
              className="mt-4 w-full rounded-md bg-cta-green px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-transform hover:-translate-y-0.5"
            >
              Verify Code
            </button>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-4 text-xs text-panel-foreground/50 hover:text-panel-foreground/80"
            >
              Didn&apos;t get it? Resend
            </button>
          </div>
        ) : (
          <>
            <h1 className="font-display text-2xl font-bold text-panel-foreground">
              Forgot password
            </h1>
            <p className="mt-1 text-sm text-panel-foreground/60">
              Enter your account email and we&apos;ll send a recovery code to
              reset your password.
            </p>
            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <Field label="Email" htmlFor="forgot-email">
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-panel-foreground/40" />
                  <input
                    id="forgot-email"
                    name="email"
                    type="email"
                    required
                    className={inputClass + ' pl-10'}
                    placeholder="you@email.com"
                  />
                </div>
              </Field>
              <button
                type="submit"
                className="mt-2 rounded-md bg-cta-blue px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-transform hover:-translate-y-0.5"
              >
                Send Recovery Code
              </button>
            </form>
          </>
        )}
      </Panel>
    )
  }

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
          : 'Sign in with your in-game username to get back on set.'}
      </p>

      {/* Google SSO */}
      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-md border border-white/15 bg-white px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-[#3c4043] transition-colors hover:bg-white/90"
      >
        <GoogleIcon />
        Sign in with Google
      </button>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/15" />
        <span className="font-display text-xs uppercase tracking-widest text-panel-foreground/40">
          or
        </span>
        <span className="h-px flex-1 bg-white/15" />
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <Field label="In-game username" htmlFor="username">
          <input
            id="username"
            name="username"
            required
            className={inputClass}
            placeholder="director_ace"
          />
        </Field>
        {isSignup && (
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
        )}
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

        {!isSignup && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setMode('forgot')}
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        <Link
          href="/dashboard"
          className="mt-2 rounded-md bg-cta-green px-6 py-3 text-center font-display text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-transform hover:-translate-y-0.5"
        >
          {isSignup ? 'Create Account' : 'Login'}
        </Link>
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

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  )
}
