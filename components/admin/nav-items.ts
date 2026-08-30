import {
  LayoutDashboard,
  Users,
  Inbox,
  Receipt,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'

export interface AdminNavItem {
  href: string
  label: string
  icon: LucideIcon
}

export const ADMIN_NAV: AdminNavItem[] = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/players', label: 'Players', icon: Users },
  { href: '/admin/contacts', label: 'Contact Hub', icon: Inbox },
  { href: '/admin/transactions', label: 'Transactions', icon: Receipt },
  { href: '/admin/revenue', label: 'Ad Revenue', icon: TrendingUp },
]
