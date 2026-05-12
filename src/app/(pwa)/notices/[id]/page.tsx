import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Share2 } from 'lucide-react'

export default async function NoticeDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: notice } = await supabase
    .from('notices')
    .select('*')
    .eq('id', id)
    .single()

  if (!notice) notFound()

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex justify-between items-center">
        <Link href="/notices" className="p-2 text-gray-500">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-sm font-bold text-gray-400">お知らせ</h1>
        <button className="p-2 text-gray-500">
          <Share2 size={20} />
        </button>
      </header>

      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded uppercase tracking-wider">
            {notice.category}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">{notice.title}</h1>
          <p className="text-sm text-gray-400 font-mono">
            {notice.published_at ? new Date(notice.published_at).toISOString().split('T')[0].replace(/-/g, '.') : '----.--.--'}
          </p>
        </div>

        <div className="w-full h-[200px] bg-gray-100 rounded-3xl overflow-hidden relative">
          {/* Fallback pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-200 opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center text-yellow-300">
            <Share2 size={48} />
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {notice.content}
        </div>
      </div>
    </div>
  )
}
