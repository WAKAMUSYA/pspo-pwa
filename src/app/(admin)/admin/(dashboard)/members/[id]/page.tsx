import { protectAdminRoute } from '@/lib/auth-guard'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Save, Shield } from 'lucide-react'

export default async function MemberEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: memberId } = await params
  await protectAdminRoute()
  const supabase = await createClient()

  const { data: member } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', memberId)
    .single()

  if (!member) redirect('/admin/members')

  async function updateMember(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const id = formData.get('id') as string
    
    await supabase.from('profiles').update({
      role: formData.get('role'),
      membership_status: formData.get('membership_status'),
      home_store: formData.get('home_store'),
      total_stamps: parseInt(formData.get('total_stamps') as string || '0'),
    }).eq('id', id)

    redirect('/admin/members')
  }

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto">
      <Link href="/admin/members" className="flex items-center text-gray-400 hover:text-gray-900 mb-6 transition-colors w-fit">
        <ChevronLeft size={20} />
        <span className="text-sm font-medium">会員一覧に戻る</span>
      </Link>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center text-2xl font-bold">
              {member.full_name?.[0] || '?'}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{member.full_name || '未設定'}</h1>
              <p className="text-indigo-100 text-sm">{member.email}</p>
            </div>
          </div>
        </div>

        <form action={updateMember} className="p-8 space-y-6">
          <input type="hidden" name="id" value={member.id} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                <Shield size={14} className="mr-1" /> 権限ロール
              </label>
              <select name="role" defaultValue={member.role} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-gray-700">
                <option value="member">メンバー (一般利用者)</option>
                <option value="staff">スタッフ (コンテンツ管理)</option>
                <option value="admin">管理者 (全権限)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-yellow-600 uppercase tracking-widest flex items-center">
                スタンプ数
              </label>
              <input 
                type="number"
                name="total_stamps" 
                defaultValue={member.total_stamps || 0} 
                min="0"
                className="w-full p-4 bg-yellow-50 rounded-2xl border-none focus:ring-2 focus:ring-yellow-400 outline-none font-bold text-yellow-700" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">会員ステータス</label>
            <input name="membership_status" defaultValue={member.membership_status} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">ホーム店舗</label>
            <input name="home_store" defaultValue={member.home_store} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>

          <button type="submit" className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2">
            <Save size={20} />
            <span>設定を保存する</span>
          </button>
        </form>
      </div>
    </div>
  )
}
