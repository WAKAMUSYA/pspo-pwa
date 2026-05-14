import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Map, MousePointerClick, Gift } from 'lucide-react'
import { Suspense } from 'react'
import { DashboardStats, DashboardStatsSkeleton } from '@/components/dashboard/DashboardStats'
import { DashboardNotices, DashboardNoticesSkeleton } from '@/components/dashboard/DashboardNotices'
import { DashboardEvents, DashboardEventsSkeleton } from '@/components/dashboard/DashboardEvents'

export default async function HomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="p-6 space-y-8 pb-24">
      {/* 統計セクション（ストリーミング表示） */}
      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats userId={user.id} />
      </Suspense>

      {/* Quick Services（静的なので即時表示） */}
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

      {/* お知らせセクション（ストリーミング表示） */}
      <Suspense fallback={<DashboardNoticesSkeleton />}>
        <DashboardNotices />
      </Suspense>

      {/* イベントセクション（ストリーミング表示） */}
      <Suspense fallback={<DashboardEventsSkeleton />}>
        <DashboardEvents />
      </Suspense>
    </div>
  )
}
