import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ChevronLeft, Calendar, MapPin } from 'lucide-react'

export default async function EventsPage() {
  const supabase = await createClient()
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('is_published', true)
    .order('start_date', { ascending: true })

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex items-center">
        <Link href="/" className="p-2 -ml-2 text-gray-500">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">イベント</h1>
      </header>

      <div className="p-4 space-y-6">
        {events?.map((event) => (
          <Link 
            key={event.id} 
            href={`/events/${event.id}`}
            className="block group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="aspect-[2/1] bg-gray-100 relative">
               <div className="absolute inset-0 bg-yellow-500 opacity-10" />
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                 <span className="text-[10px] font-bold text-gray-900 font-mono">
                   {event.start_date ? new Date(event.start_date).toISOString().split('T')[0].replace(/-/g, '.') : '----.--.--'}
                 </span>
               </div>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-yellow-500 transition-colors">{event.title}</h3>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>{new Date(event.start_date).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}〜</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
