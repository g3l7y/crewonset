import {
  LayoutDashboard,
  UserRound,
  BookOpen,
  Users,
  ShoppingBag,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

export const DASHBOARD_NAV: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/profile', label: 'Profile', icon: UserRound },
  { href: '/dashboard/almanac', label: 'Almanac', icon: BookOpen },
  { href: '/dashboard/friends', label: 'Friends', icon: Users },
  { href: '/dashboard/shop', label: 'Shop', icon: ShoppingBag },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]
