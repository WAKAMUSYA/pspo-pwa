import { protectAdminRoute } from '@/lib/auth-guard'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Plus, Edit2, Calendar, MapPin, Eye, EyeOff } from 'lucide-react'

export default async function AdminEventsPage() {
  await protectAdminRoute()
  const supabase = await createClient()

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('start_date', { ascending: true })

  return (
    <div className="p-6 md:p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar size={24} className="text-emerald-500" />
            イベント管理
          </h1>
          <p className="text-sm text-gray-500">ワークショップや特別レッスンの管理</p>
        </div>
        <Link 
          href="/admin/events/new" 
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-100 flex items-center gap-2"
        >
          <Plus size={20} />
          新規作成
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events?.map((event: any) => (
          <div key={event.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group hover:border-emerald-200 transition-all">
            <div className="h-32 bg-emerald-50 relative">
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 ${event.is_published ? 'bg-white text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                  {event.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
                  {event.is_published ? '公開中' : '下書き'}
                </span>
              </div>
              <Link href={`/admin/events/${event.id}/edit`} className="absolute top-4 right-4 p-2 bg-white rounded-xl text-gray-400 hover:text-emerald-600 transition-colors shadow-sm">
                <Edit2 size={18} />
              </Link>
            </div>
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 line-clamp-1">{event.title}</h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-xs text-gray-500 gap-2">
                  <Calendar size={14} />
                  <span>{event.start_date ? new Date(event.start_date).toLocaleDateString('ja-JP') : '未設定'}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 gap-2">
                  <MapPin size={14} />
                  <span>{event.location || event.target_store || '未設定'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
