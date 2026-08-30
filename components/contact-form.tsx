'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

const INTERESTS = ['General', 'Sponsorship', 'Press', 'Feedback'] as const

export function ContactForm() {
  const [interest, setInterest] =
    useState<(typeof INTERESTS)[number]>('General')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg bg-white/5 px-6 py-14 text-center">
        <CheckCircle2 className="h-12 w-12 text-cta-green" />
        <h3 className="font-display text-2xl font-bold text-panel-foreground">
          Message sent!
        </h3>
        <p className="max-w-sm text-panel-foreground/60">
          Thanks for reaching out. Our crew will get back to you as soon as the
          cameras stop rolling.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <fieldset>
        <legend className="mb-2 font-display text-xs uppercase tracking-widest text-primary">
          I&apos;m reaching out about
        </legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setInterest(option)}
              className={
                'rounded-md px-4 py-2 font-display text-sm font-semibold uppercase tracking-wider transition-colors ' +
                (interest === option
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white/10 text-panel-foreground/70 hover:bg-white/20')
              }
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            name="name"
            required
            className={inputClass}
            placeholder="Your name"
          />
        </Field>
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
      </div>

      <Field label="Organization (optional)" htmlFor="org">
        <input
          id="org"
          name="org"
          className={inputClass}
          placeholder="Studio, brand, or school"
        />
      </Field>

      <Field label="Message" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClass + ' resize-y'}
          placeholder={
            interest === 'Sponsorship'
              ? 'Tell us how you\u2019d like to support Crew On Set...'
              : 'How can we help?'
          }
        />
      </Field>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-md bg-cta-green px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-transform hover:-translate-y-0.5"
      >
        <Send className="h-4 w-4" />
        Send Message
      </button>
    </form>
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
