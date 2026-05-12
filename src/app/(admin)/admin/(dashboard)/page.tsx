'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Bell, 
  Calendar, 
  Users, 
  LogOut, 
  Megaphone, 
  Settings,
  ArrowRight
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const stats = [
    { name: 'お知らせ管理', icon: Megaphone, color: 'text-amber-500', bg: 'bg-amber-50', href: '/admin/notices', desc: 'ニュースの配信・編集' },
    { name: 'イベント管理', icon: Calendar, color: 'text-emerald-500', bg: 'bg-emerald-50', href: '/admin/events', desc: 'ワークショップ・予約管理' },
    { name: 'ユーザー管理', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50', href: '/admin/members', desc: '会員情報の確認・権限変更' },
    { name: 'システム設定', icon: Settings, color: 'text-slate-500', bg: 'bg-slate-50', href: '#', desc: 'アプリ基本設定（準備中）' },
  ]

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 mt-1">システムの状況とクイックアクセス</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={item.href} className="group">
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
                <div className={`${item.bg} ${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2 flex-grow">{item.desc}</p>
                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">
                  <span>Open Management</span>
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">お知らせ「GW営業について」が公開されました</p>
                  <p className="text-xs text-gray-400 mt-0.5">2時間前 • 管理者</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-indigo-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">管理者アクション</h2>
            <p className="text-slate-400 text-sm">セッションを終了して安全にログアウトします。</p>
          </div>
          <button 
            onClick={handleLogout}
            className="mt-12 w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all flex items-center justify-center space-x-2 border border-white/10"
          >
            <LogOut size={20} />
            <span>ログアウト</span>
          </button>
        </div>
      </div>
    </div>
  )
}
