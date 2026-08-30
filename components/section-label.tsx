import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Muted-brown pill used to label prominent sections. */
export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md bg-brown px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.2em] text-brown-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}
