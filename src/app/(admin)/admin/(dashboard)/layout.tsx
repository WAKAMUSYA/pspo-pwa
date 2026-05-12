import Link from 'next/link'
import { LayoutDashboard, Users, Bell, Calendar, LogOut, ShieldCheck, ExternalLink } from 'lucide-react'

import { protectAdminRoute } from '@/lib/auth-guard'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 権限チェックを実行
  await protectAdminRoute()

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: '会員管理', href: '/admin/members', icon: Users },
    { name: 'お知らせ管理', href: '/admin/notices', icon: Bell },
    { name: 'イベント管理', href: '/admin/events', icon: Calendar },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full shadow-2xl">
        <div className="p-8">
          <div className="flex items-center space-x-3 text-white mb-10">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">PSPO Admin</span>
          </div>

          <Link
            href="/login"
            target="_blank"
            className="flex items-center space-x-3 px-4 py-3.5 rounded-2xl bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20 transition-all mb-6 group"
          >
            <ExternalLink size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm">メンバーページを確認</span>
          </Link>
          
          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3.5 rounded-2xl hover:bg-white/5 hover:text-white transition-all group"
              >
                <item.icon size={20} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                <span className="font-semibold text-sm">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/5">
          <Link href="/admin/login" className="flex items-center space-x-3 text-sm font-medium hover:text-white transition-colors group">
            <div className="bg-white/5 p-2 rounded-lg group-hover:bg-white/10 transition-colors">
              <LogOut size={18} />
            </div>
            <span>ログアウト</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
