import { protectAdminRoute } from '@/lib/auth-guard'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Save } from 'lucide-react'
import { SubmitButton } from '@/components/SubmitButton'

export default async function NewEventPage() {
  await protectAdminRoute()

  async function createEvent(formData: FormData) {
    'use server'
    const supabase = await createClient()
    
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      location: formData.get('location') as string,
      target_store: formData.get('target_store') as string,
      start_date: formData.get('start_date') as string,
      is_published: formData.get('is_published') === 'on',
      image_url: formData.get('image_url') as string,
    }

    const { error } = await supabase.from('events').insert(data)
    if (error) {
      console.error(error)
      return
    }

    redirect('/admin/events')
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <Link href="/admin/events" className="flex items-center text-gray-400 hover:text-gray-900 mb-6 transition-colors w-fit">
        <ChevronLeft size={20} />
        <span className="text-sm font-medium">イベント一覧に戻る</span>
      </Link>

      <h1 className="text-2xl font-bold mb-8">イベント新規作成</h1>

      <form action={createEvent} className="space-y-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">イベント名</label>
          <input name="title" required className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none" />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">説明文</label>
          <textarea name="description" rows={5} required className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">開催日時</label>
            <input type="datetime-local" name="start_date" required className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">場所 / 対象店舗</label>
            <input name="location" placeholder="例：スタジオA / 全店" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-2xl">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" name="is_published" className="w-6 h-6 rounded-lg accent-green-500" />
            <span className="text-sm font-bold text-gray-700">すぐに公開する</span>
          </label>
        </div>

        <SubmitButton 
          className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-100 transition-all"
          icon={Save}
        >
          イベントを保存・公開
        </SubmitButton>
      </form>
    </div>
  )
}
