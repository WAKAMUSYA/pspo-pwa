import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Bell, Calendar, Stamp, Award, ChevronRight, Map, MousePointerClick, Gift } from 'lucide-react'
import Link from 'next/link'

export default async function HomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch data
  const [profileRes, noticesRes, eventsRes] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('notices').select('*').eq('is_published', true).order('published_at', { ascending: false }).limit(3),
    supabase.from('events').select('*').eq('is_published', true).order('start_date', { ascending: true }).limit(2),
  ])

  const profile = profileRes?.data
  const notices = noticesRes?.data || []
  const events = eventsRes?.data || []

  if (profileRes?.error) console.error('Profile Error Details:', profileRes.error)
  if (noticesRes?.error) console.error('Notices Error Details:', noticesRes.error)
  if (eventsRes?.error) console.error('Events Error Details:', eventsRes.error)

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">こんにちは、</h1>
          <p className="text-3xl font-bold text-yellow-500">{profile?.full_name || 'メンバー'} 様</p>
        </div>
        <div className="bg-yellow-100 p-2 rounded-full">
          <Award className="text-yellow-600" size={28} />
        </div>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-4 rounded-2xl text-white shadow-lg shadow-yellow-100">
          <div className="flex items-center space-x-2 mb-2">
            <Stamp size={20} />
            <span className="text-sm font-medium">スタンプ</span>
          </div>
          <p className="text-3xl font-bold">{profile?.total_stamps || 0} <span className="text-sm font-normal">個</span></p>
        </div>
        <Link href="/badges" className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-2 mb-2 text-gray-500">
            <Award size={20} />
            <span className="text-sm font-medium">バッジ</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">3 <span className="text-sm font-normal text-gray-500">個</span></p>
        </Link>
      </div>

      {/* Quick Services */}
      <section className="grid grid-cols-3 gap-3">
        <a 
          href="https://book.ntmg.com/Dj7rP223yP1WgSyqjaZkt6KknWMNMQdm4JMEpOvi/maps/a2577052-a3e6-4e63-8284-98452513610d?lng=ja-JP"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-2 active:scale-95 transition-all"
        >
          <div className="bg-blue-50 p-2 rounded-xl">
            <Map size={24} className="text-blue-500" />
          </div>
          <span className="text-[10px] font-bold text-gray-700">店舗マップ</span>
        </a>
        <a 
          href="https://pspo24.hacomono.jp/home"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-2 active:scale-95 transition-all"
        >
          <div className="bg-emerald-50 p-2 rounded-xl">
            <MousePointerClick size={24} className="text-emerald-500" />
          </div>
          <span className="text-[10px] font-bold text-gray-700">予約</span>
        </a>
        <a 
          href="https://pspo.jp/event/member-benefits/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-2 active:scale-95 transition-all"
        >
          <div className="bg-rose-50 p-2 rounded-xl">
            <Gift size={24} className="text-rose-500" />
          </div>
          <span className="text-[10px] font-bold text-gray-700">会員特典</span>
        </a>
      </section>

      {/* Notices */}
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
          {notices.map((notice) => (
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

      {/* Events */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center space-x-2">
            <Calendar size={20} className="text-yellow-500" />
            <span>イベント</span>
          </h2>
          <Link href="/events" className="text-sm text-gray-500 flex items-center">
            すべて見る <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {events.map((event) => (
            <Link 
              key={event.id} 
              href={`/events/${event.id}`}
              className="group relative overflow-hidden rounded-2xl aspect-[16/9] bg-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              {/* Fallback pattern for no image */}
              <div className="absolute inset-0 bg-yellow-500 opacity-20" />
              <div className="absolute bottom-0 left-0 p-4 z-20 text-white w-full">
                <p className="text-[10px] font-bold text-yellow-400 mb-1 font-mono">
                  {event.start_date ? new Date(event.start_date).toISOString().split('T')[0].replace(/-/g, '.') : '----.--.--'} @ {event.location}
                </p>
                <h3 className="font-bold text-lg group-hover:text-yellow-400 transition-colors">{event.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
