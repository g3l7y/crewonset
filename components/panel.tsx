import type { ReactNode, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Hide the corner rivet details */
  flush?: boolean
}

/**
 * Industrial dark-gray content panel with rounded corners and
 * metallic rivet/screw details in all four corners.
 */
export function Panel({
  children,
  className,
  flush = false,
  ...props
}: PanelProps) {
  return (
    <div
      className={cn(
        'relative rounded-xl bg-panel text-panel-foreground shadow-lg ring-1 ring-black/20',
        className,
      )}
      {...props}
    >
      {!flush && <Rivets />}
      {children}
    </div>
  )
}

function Rivets() {
  const base =
    'absolute h-2 w-2 rounded-full bg-rivet shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),inset_0_-1px_1px_rgba(0,0,0,0.6)]'
  return (
    <>
      <span aria-hidden className={cn(base, 'left-2.5 top-2.5')} />
      <span aria-hidden className={cn(base, 'right-2.5 top-2.5')} />
      <span aria-hidden className={cn(base, 'bottom-2.5 left-2.5')} />
      <span aria-hidden className={cn(base, 'bottom-2.5 right-2.5')} />
    </>
  )
}
