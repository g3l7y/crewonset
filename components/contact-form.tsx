'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

type Reason = 'Concern' | 'Partnership'

export function ContactForm() {
  const [reason, setReason] = useState<Reason>('Concern')
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
      <Field label="I'm reaching out about..." htmlFor="reason">
        <select
          id="reason"
          name="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value as Reason)}
          className={inputClass}
        >
          <option value="Concern">Concern</option>
          <option value="Partnership">Partnership</option>
        </select>
      </Field>

      {reason === 'Concern' ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Username" htmlFor="username">
              <input
                id="username"
                name="username"
                required
                className={inputClass}
                placeholder="Your username"
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

          <Field label="Concern Type" htmlFor="concernType">
            <select id="concernType" name="concernType" className={inputClass}>
              <option value="Bug Report">Bug Report</option>
              <option value="Account Issue">Account Issue</option>
              <option value="Gameplay">Gameplay</option>
              <option value="Other">Other</option>
            </select>
          </Field>

          <Field label="File Attachment (optional)" htmlFor="concernFile">
            <input
              id="concernFile"
              name="concernFile"
              type="file"
              className={fileInputClass}
            />
          </Field>

          <Field label="Mail" htmlFor="concernMail">
            <textarea
              id="concernMail"
              name="concernMail"
              required
              rows={5}
              className={inputClass + ' resize-y'}
              placeholder="Describe your concern in detail..."
            />
          </Field>
        </>
      ) : (
        <>
          <Field label="Contact Email" htmlFor="contactEmail">
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              required
              className={inputClass}
              placeholder="you@company.com"
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Product Type" htmlFor="productType">
              <select
                id="productType"
                name="productType"
                className={inputClass}
              >
                <option value="Camera">Camera</option>
                <option value="Lens">Lens</option>
                <option value="Equipments">Equipments</option>
                <option value="Software">Software</option>
                <option value="Other">Other</option>
              </select>
            </Field>
            <Field label="Exact Model" htmlFor="model">
              <input
                id="model"
                name="model"
                required
                className={inputClass}
                placeholder="e.g. Sony FX3"
              />
            </Field>
          </div>

          <Field label="Link" htmlFor="link">
            <input
              id="link"
              name="link"
              type="url"
              className={inputClass}
              placeholder="https://..."
            />
          </Field>

          <Field label="File Attachment (optional)" htmlFor="partnerFile">
            <input
              id="partnerFile"
              name="partnerFile"
              type="file"
              className={fileInputClass}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Proposed Budget" htmlFor="budget">
              <input
                id="budget"
                name="budget"
                className={inputClass}
                placeholder="e.g. $5,000"
              />
            </Field>
            <Field label="Advertisement Duration" htmlFor="duration">
              <input
                id="duration"
                name="duration"
                className={inputClass}
                placeholder="e.g. 30 days, 2 weeks, 1 month"
              />
            </Field>
          </div>

          <Field label="Mail" htmlFor="partnerMail">
            <textarea
              id="partnerMail"
              name="partnerMail"
              required
              rows={5}
              className={inputClass + ' resize-y'}
              placeholder="Tell us how you'd like to partner with Crew On Set..."
            />
          </Field>
        </>
      )}

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

const fileInputClass =
  'w-full rounded-md border border-white/15 bg-black/20 px-4 py-2 text-sm text-panel-foreground/70 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-1.5 file:font-display file:text-xs file:font-semibold file:uppercase file:tracking-wider file:text-primary-foreground hover:file:opacity-90 focus:border-primary focus:outline-none'

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
