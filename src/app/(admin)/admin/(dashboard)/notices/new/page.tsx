import { protectAdminRoute } from '@/lib/auth-guard'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Save } from 'lucide-react'
import SubmitButton from '@/components/SubmitButton'

export default async function NewNoticePage() {
  await protectAdminRoute()

  async function createNotice(formData: FormData) {
    'use server'
    const supabase = await createClient()
    
    const data = {
      title: formData.get('title') as string,
      body: formData.get('body') as string,
      category: formData.get('category') as string,
      target_store: formData.get('target_store') as string,
      is_published: formData.get('is_published') === 'on',
      is_important: formData.get('is_important') === 'on',
      published_at: formData.get('published_at') || new Date().toISOString(),
      image_url: formData.get('image_url') as string,
    }

    const { error } = await supabase.from('notices').insert(data)
    if (error) {
      console.error(error)
      return
    }

    redirect('/admin/notices')
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <Link href="/admin/notices" className="flex items-center text-gray-400 hover:text-gray-900 mb-6 transition-colors w-fit">
        <ChevronLeft size={20} />
        <span className="text-sm font-medium">お知らせ一覧に戻る</span>
      </Link>

      <h1 className="text-2xl font-bold mb-8">お知らせ新規作成</h1>

      <form action={createNotice} className="space-y-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">タイトル</label>
          <input name="title" required className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500 outline-none" />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">内容</label>
          <textarea name="body" rows={6} required className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500 outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">カテゴリ</label>
            <select name="category" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500 outline-none font-bold">
              <option value="news">ニュース</option>
              <option value="important">重要</option>
              <option value="event">イベント</option>
              <option value="campaign">キャンペーン</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">対象店舗</label>
            <input name="target_store" placeholder="全店" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500 outline-none" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 rounded-2xl">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" name="is_published" className="w-6 h-6 rounded-lg accent-green-500" />
            <span className="text-sm font-bold text-gray-700">すぐに公開する</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" name="is_important" className="w-6 h-6 rounded-lg accent-red-500" />
            <span className="text-sm font-bold text-red-500">重要マークを付ける</span>
          </label>
        </div>

        <SubmitButton 
          className="w-full py-5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-2xl shadow-lg shadow-amber-100 transition-all"
          icon="save"
        >
          お知らせを保存・公開
        </SubmitButton>
      </form>
    </div>
  )
}
