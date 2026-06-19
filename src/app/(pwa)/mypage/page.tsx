import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { User, LogOut, Settings, CreditCard, ShieldCheck, ChevronRight, MapPin } from 'lucide-react'
import Link from 'next/link'
import SubmitButton from '@/components/SubmitButton'
import { signOut } from './actions'

export default async function MyPage() {
  const supabase = await createClient()
  
  // 1. ユーザー情報の取得（より安全な形式に）
  const { data, error: authError } = await supabase.auth.getUser()
  const user = data?.user

  // 開発用バイパスのためコメントアウト
  // if (authError || !user) {
  //   console.error('MyPage Auth Error:', authError)
  //   redirect('/login')
  // }

  // 2. プロフィール情報の取得
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id || '')
    .single()

  if (profileError) {
    console.warn('MyPage Profile Fetch Warning:', profileError)
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
          <p className="text-sm text-gray-400">{user?.email || 'admin@pspo.jp'}</p>
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
          <SubmitButton 
            className="w-full py-4 text-red-500 font-bold bg-red-50 rounded-2xl hover:bg-red-100 transition-colors"
            icon="logout"
            loadingText="ログアウト中..."
          >
            ログアウト
          </SubmitButton>
        </form>
      </div>
    </div>
  )
}
