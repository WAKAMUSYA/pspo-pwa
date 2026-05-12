import { protectAdminRoute } from '@/lib/auth-guard'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Plus, Edit2, Eye, EyeOff, Megaphone } from 'lucide-react'

export default async function AdminNoticesPage() {
  await protectAdminRoute()
  const supabase = await createClient()

  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('published_at', { ascending: false })

  return (
    <div className="p-6 md:p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Megaphone size={24} className="text-amber-500" />
            お知らせ管理
          </h1>
          <p className="text-sm text-gray-500">ニュースや重要事項の管理</p>
        </div>
        <Link 
          href="/admin/notices/new" 
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-amber-100 flex items-center gap-2"
        >
          <Plus size={20} />
          新規作成
        </Link>
      </div>

      <div className="grid gap-4">
        {notices?.map((notice) => (
          <div key={notice.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-amber-200 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${notice.is_published ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}>
                {notice.is_published ? <Eye size={20} /> : <EyeOff size={20} />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-gray-900">{notice.title}</h2>
                  {notice.is_important && (
                    <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">IMPORTANT</span>
                  )}
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-3 mt-1">
                  <span>{notice.category}</span>
                  <span>•</span>
                  <span>{notice.published_at ? new Date(notice.published_at).toLocaleDateString('ja-JP') : '---'} 公開</span>
                </div>
              </div>
            </div>
            <Link href={`/admin/notices/${notice.id}/edit`} className="p-2 text-gray-400 hover:text-amber-600 transition-colors">
              <Edit2 size={20} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
