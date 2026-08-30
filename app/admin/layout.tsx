import type { ReactNode } from 'react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminTopbar } from '@/components/admin/admin-topbar'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dark flex min-h-screen bg-admin-bg text-panel-foreground">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-black/40 bg-panel lg:block">
        <AdminSidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main
          className="flex-1"
          style={{
            backgroundImage:
              'linear-gradient(var(--admin-line) 1px, transparent 1px), linear-gradient(90deg, var(--admin-line) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        >
          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
