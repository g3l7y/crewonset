import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AuthCard } from '@/components/auth-card'

export const metadata: Metadata = {
  title: 'Login — Crew On Set',
  description: 'Log in or sign up to save your Crew On Set progress.',
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />
      <section className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
        <Suspense fallback={null}>
          <AuthCard />
        </Suspense>
      </section>
      <SiteFooter />
    </main>
  )
}
