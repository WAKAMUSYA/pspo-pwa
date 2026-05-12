import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ChevronLeft, Bell } from 'lucide-react'

export default async function NoticesPage() {
  const supabase = await createClient()
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex items-center">
        <Link href="/" className="p-2 -ml-2 text-gray-500">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">お知らせ</h1>
      </header>

      <div className="p-4 space-y-4">
        {notices?.map((notice) => (
          <Link 
            key={notice.id} 
            href={`/notices/${notice.id}`}
            className="flex items-start space-x-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform"
          >
            <div className="bg-yellow-50 p-3 rounded-xl shrink-0">
              <Bell size={24} className="text-yellow-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider">
                  {notice.category}
                </span>
                <span className="text-[10px] text-gray-400">
                  {new Date(notice.published_at).toLocaleDateString('ja-JP')}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 leading-snug">{notice.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{notice.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
