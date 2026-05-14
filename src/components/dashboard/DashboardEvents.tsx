import { createClient } from '@/utils/supabase/server'
import { Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export async function DashboardEvents() {
  const supabase = await createClient()
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('is_published', true)
    .order('start_date', { ascending: true })
    .limit(2)

  return (
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
        {(events || []).map((event) => (
          <Link 
            key={event.id} 
            href={`/events/${event.id}`}
            className="group relative overflow-hidden rounded-2xl aspect-[16/9] bg-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
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
  )
}

export function DashboardEventsSkeleton() {
  return (
    <section className="space-y-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-6 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="aspect-[16/9] bg-gray-100 rounded-2xl" />
        ))}
      </div>
    </section>
  )
}
