import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { User, LogOut, Settings, CreditCard, ShieldCheck, ChevronRight, MapPin } from 'lucide-react'
import Link from 'next/link'

export default async function MyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const signOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  const menuItems = [
    { name: '会員ステータス', icon: ShieldCheck, value: profile?.membership_status || '通常会員' },
    { name: 'ホーム店舗', icon: MapPin, value: profile?.home_store || '未設定' },
    { name: '会員ID', icon: CreditCard, value: profile?.member_id || '---' },
  ]

  return (
    <div className="pb-24">
      <header className="p-8 pb-12 bg-gradient-to-b from-yellow-50 to-white text-center space-y-4">
        <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-white overflow-hidden">
          <User size={48} className="text-gray-300" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{profile?.full_name || 'メンバー'} 様</h1>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </header>

      <div className="px-6 -mt-6 space-y-6">
        {/* Info Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 divide-y divide-gray-50 overflow-hidden">
          {menuItems.map((item) => (
            <div key={item.name} className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3 text-gray-500">
                <item.icon size={18} />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">設定</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <Link href="#" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3 text-gray-700">
                <Settings size={18} />
                <span className="text-sm font-medium">通知設定</span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </Link>
          </div>
        </div>

        {/* Logout */}
        <form action={signOut}>
          <button className="w-full flex items-center justify-center space-x-2 py-4 text-red-500 font-bold bg-red-50 rounded-2xl hover:bg-red-100 transition-colors">
            <LogOut size={18} />
            <span>ログアウト</span>
          </button>
        </form>
      </div>
    </div>
  )
}
