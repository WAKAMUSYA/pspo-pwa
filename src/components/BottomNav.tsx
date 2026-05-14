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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
      <div className="flex justify-around items-start h-20 pt-3 pb-[calc(env(safe-area-inset-bottom)+8px)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all active:scale-90",
                isActive ? "text-yellow-500" : "text-gray-400"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-colors",
                isActive ? "bg-yellow-50" : "bg-transparent"
              )}>
                <Icon size={26} className={cn(isActive && "fill-yellow-500/10")} />
              </div>
              <span className={cn(
                "text-[10px] font-bold tracking-tight",
                isActive ? "text-yellow-600" : "text-gray-400"
              )}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
