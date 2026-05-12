import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, MapPin, Calendar, Clock, Users } from 'lucide-react'

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (!event) notFound()

  return (
    <div className="pb-24">
      <header className="absolute top-0 left-0 right-0 z-30 p-4 flex items-center">
        <Link href="/events" className="p-2 bg-white/80 backdrop-blur rounded-full text-gray-500 shadow-sm">
          <ChevronLeft size={24} />
        </Link>
      </header>

      <div className="aspect-[4/3] bg-gray-200 relative">
        {/* Placeholder image */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center text-white/20">
          <Calendar size={120} />
        </div>
      </div>

      <div className="p-6 -mt-8 relative z-20 bg-white rounded-t-[40px] space-y-8">
        <div className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">{event.title}</h1>
            <p className="text-yellow-600 font-medium">
              {new Date(event.event_date).toLocaleDateString('ja-JP', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-2xl flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Clock size={20} className="text-yellow-500" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">時間</p>
                <p className="text-sm font-bold">{new Date(event.event_date).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}〜</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Users size={20} className="text-yellow-500" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">定員</p>
                <p className="text-sm font-bold">{event.max_participants || '無制限'}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <MapPin size={20} className="text-yellow-500" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">場所</p>
              <p className="text-sm font-bold">{event.location}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">イベント詳細</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {event.description}
          </p>
        </div>

        <button className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-2xl shadow-lg shadow-yellow-100 transition-all active:scale-[0.98]">
          イベントに参加予約する
        </button>
      </div>
    </div>
  )
}
