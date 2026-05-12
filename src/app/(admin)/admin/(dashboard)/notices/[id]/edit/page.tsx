import { protectAdminRoute } from '@/lib/auth-guard'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Save, Trash2 } from 'lucide-react'

export default async function EditNoticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await protectAdminRoute()
  const supabase = await createClient()

  const { data: notice } = await supabase
    .from('notices')
    .select('*')
    .eq('id', id)
    .single()

  if (!notice) redirect('/admin/notices')

  async function updateNotice(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const id = formData.get('id') as string
    
    const data = {
      title: formData.get('title') as string,
      body: formData.get('body') as string,
      category: formData.get('category') as string,
      target_store: formData.get('target_store') as string,
      is_published: formData.get('is_published') === 'on',
      is_important: formData.get('is_important') === 'on',
      image_url: formData.get('image_url') as string,
    }

    await supabase.from('notices').update(data).eq('id', id)
    redirect('/admin/notices')
  }

  async function deleteNotice(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const id = formData.get('id') as string
    await supabase.from('notices').delete().eq('id', id)
    redirect('/admin/notices')
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link href="/admin/notices" className="flex items-center text-gray-400 hover:text-gray-900 transition-colors w-fit">
          <ChevronLeft size={20} />
          <span className="text-sm font-medium">お知らせ一覧に戻る</span>
        </Link>
        <form action={deleteNotice}>
          <input type="hidden" name="id" value={notice.id} />
          <button className="text-red-400 hover:text-red-600 p-2 transition-colors">
            <Trash2 size={20} />
          </button>
        </form>
      </div>

      <h1 className="text-2xl font-bold mb-8">お知らせ編集</h1>

      <form action={updateNotice} className="space-y-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl">
        <input type="hidden" name="id" value={notice.id} />
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">タイトル</label>
          <input name="title" defaultValue={notice.title} required className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500 outline-none" />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">内容</label>
          <textarea name="body" rows={6} defaultValue={notice.body} required className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500 outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">カテゴリ</label>
            <select name="category" defaultValue={notice.category} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500 outline-none font-bold">
              <option value="news">ニュース</option>
              <option value="important">重要</option>
              <option value="event">イベント</option>
              <option value="campaign">キャンペーン</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">対象店舗</label>
            <input name="target_store" defaultValue={notice.target_store} placeholder="全店" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500 outline-none" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 rounded-2xl">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" name="is_published" defaultChecked={notice.is_published} className="w-6 h-6 rounded-lg accent-green-500" />
            <span className="text-sm font-bold text-gray-700">公開中</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" name="is_important" defaultChecked={notice.is_important} className="w-6 h-6 rounded-lg accent-red-500" />
            <span className="text-sm font-bold text-red-500">重要マークを付ける</span>
          </label>
        </div>

        <button type="submit" className="w-full py-5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-2xl shadow-lg shadow-amber-100 transition-all flex items-center justify-center space-x-2">
          <Save size={20} />
          <span>変更を保存する</span>
        </button>
      </form>
    </div>
  )
}
