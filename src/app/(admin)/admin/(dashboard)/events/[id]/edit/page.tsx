import { protectAdminRoute } from '@/lib/auth-guard'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Save, Trash2 } from 'lucide-react'

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await protectAdminRoute()
  const supabase = await createClient()

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (!event) redirect('/admin/events')

  async function updateEvent(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const id = formData.get('id') as string
    
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      location: formData.get('location') as string,
      target_store: formData.get('target_store') as string,
      start_date: formData.get('start_date') as string,
      is_published: formData.get('is_published') === 'on',
      image_url: formData.get('image_url') as string,
    }

    await supabase.from('events').update(data).eq('id', id)
    redirect('/admin/events')
  }

  async function deleteEvent(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const id = formData.get('id') as string
    await supabase.from('events').delete().eq('id', id)
    redirect('/admin/events')
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link href="/admin/events" className="flex items-center text-gray-400 hover:text-gray-900 transition-colors w-fit">
          <ChevronLeft size={20} />
          <span className="text-sm font-medium">イベント一覧に戻る</span>
        </Link>
        <form action={deleteEvent}>
          <input type="hidden" name="id" value={event.id} />
          <button className="text-red-400 hover:text-red-600 p-2 transition-colors">
            <Trash2 size={20} />
          </button>
        </form>
      </div>

      <h1 className="text-2xl font-bold mb-8">イベント編集</h1>

      <form action={updateEvent} className="space-y-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl">
        <input type="hidden" name="id" value={event.id} />
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">イベント名</label>
          <input name="title" defaultValue={event.title} required className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none" />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">説明文</label>
          <textarea name="description" rows={5} defaultValue={event.description} required className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">開催日時</label>
            <input 
              type="datetime-local" 
              name="start_date" 
              defaultValue={event.start_date ? new Date(event.start_date).toISOString().slice(0, 16) : ''} 
              required 
              className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none font-bold" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">場所 / 対象店舗</label>
            <input name="location" defaultValue={event.location || event.target_store} placeholder="例：スタジオA / 全店" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-2xl">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" name="is_published" defaultChecked={event.is_published} className="w-6 h-6 rounded-lg accent-green-500" />
            <span className="text-sm font-bold text-gray-700">公開中</span>
          </label>
        </div>

        <button type="submit" className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-100 transition-all flex items-center justify-center space-x-2">
          <Save size={20} />
          <span>変更を保存する</span>
        </button>
      </form>
    </div>
  )
}
