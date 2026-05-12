'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Bell, Calendar, Stamp, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'ホーム', href: '/', icon: Home },
  { name: 'お知らせ', href: '/notices', icon: Bell },
  { name: 'イベント', href: '/events', icon: Calendar },
  { name: 'スタンプ', href: '/stamps', icon: Stamp },
  { name: 'マイページ', href: '/mypage', icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()

  // Don't show bottom nav on login or tutorial pages
  if (pathname === '/login' || pathname === '/signup' || pathname === '/tutorial') return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-yellow-500" : "text-gray-500"
              )}
            >
              <Icon size={24} className={cn(isActive && "fill-yellow-100")} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
