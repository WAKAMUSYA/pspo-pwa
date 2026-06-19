import { protectAdminRoute } from '@/lib/auth-guard'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Search, UserCog } from 'lucide-react'

export default async function MemberListPage() {
  await protectAdminRoute()
  const supabase = await createClient()

  const { data: members } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">会員管理</h1>
          <p className="text-sm text-gray-500">全会員のステータスと権限を管理します</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="名前やメールで検索..." 
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">会員情報</th>
                <th className="px-6 py-4">ロール</th>
                <th className="px-6 py-4">ステータス</th>
                <th className="px-6 py-4">スタンプ</th>
                <th className="px-6 py-4">登録日</th>
                <th className="px-6 py-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {members?.map((member: any) => (
                <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold">
                        {member.full_name?.[0] || '?'}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{member.full_name || '未設定'}</div>
                        <div className="text-xs text-gray-400">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      member.role === 'admin' ? 'bg-red-50 text-red-600' : 
                      member.role === 'staff' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'
                    }`}>
                      {member.role || 'member'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-gray-900">{member.total_stamps || 0}</span>
                      <span className="text-[10px] text-gray-400">個</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {member.created_at ? new Date(member.created_at).toLocaleDateString('ja-JP') : '---'}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/members/${member.id}`} className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-indigo-600 transition-all block w-fit">
                      <UserCog size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
