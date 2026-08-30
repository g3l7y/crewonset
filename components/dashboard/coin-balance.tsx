import { Coins } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CoinBalance({
  amount,
  className,
}: {
  amount: number
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md bg-black/25 px-3 py-1.5 font-display text-sm font-semibold tracking-wide text-coin ring-1 ring-coin/30',
        className,
      )}
    >
      <Coins className="h-4 w-4" />
      {amount.toLocaleString()}
      <span className="text-panel-foreground/50">C</span>
    </span>
  )
}
