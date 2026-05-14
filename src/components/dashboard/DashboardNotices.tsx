import { createClient } from '@/utils/supabase/server'
import { Bell, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export async function DashboardNotices() {
  const supabase = await createClient()
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(3)

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold flex items-center space-x-2">
          <Bell size={20} className="text-yellow-500" />
          <span>お知らせ</span>
        </h2>
        <Link href="/notices" className="text-sm text-gray-500 flex items-center">
          すべて見る <ChevronRight size={16} />
        </Link>
      </div>
      <div className="space-y-3">
        {(notices || []).map((notice) => (
          <Link 
            key={notice.id} 
            href={`/notices/${notice.id}`}
            className="block bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-yellow-200 transition-colors"
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">
                {notice.category}
              </span>
              <span className="text-[10px] text-gray-400 font-mono">
                {notice.published_at ? new Date(notice.published_at).toISOString().split('T')[0].replace(/-/g, '.') : '----.--.--'}
              </span>
            </div>
            <h3 className="font-bold text-gray-800 line-clamp-1">{notice.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function DashboardNoticesSkeleton() {
  return (
    <section className="space-y-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-6 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-gray-100 rounded-xl" />
        ))}
      </div>
    </section>
  )
}
