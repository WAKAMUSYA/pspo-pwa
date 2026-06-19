import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Bell, Calendar, MapPin, Plus, Star, Award, Coffee, Map, ChevronRight, Clock, TrendingUp, Dumbbell, Heart, Car } from 'lucide-react'
import { TODAY_PSPO, FEATURES, NOTICES } from '@/data/mock'

async function fetchCrowdPercent(storeId: string): Promise<number | null> {
  try {
    const res = await fetch(`https://pspo.jp/live/?id=${storeId}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(/const\s+CURRENT_PERCENT\s*=\s*(\d+);/);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch crowd percent:", error);
    return null;
  }
}

export default async function HomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 開発用バイパスのためコメントアウト
  // if (!user) {
  //   redirect('/login')
  // }

  // Use dummy user name for the greeting
  const userName = "田村";

  const crowdPercent = await fetchCrowdPercent('S0002') ?? 35; // Fetching for Yuwatari
  let crowdStatus = "空いています";
  if (crowdPercent >= 90) crowdStatus = "混雑";
  else if (crowdPercent >= 70) crowdStatus = "やや混雑";
  else if (crowdPercent >= 50) crowdStatus = "普通";
  else if (crowdPercent >= 30) crowdStatus = "やや空いている";

  return (
    <div className="bg-[#f8f9fc] min-h-screen pb-24 text-gray-800 font-sans">
      {/* Header */}
      <header className="px-5 pt-12 pb-4 flex justify-between items-center bg-white sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-black tracking-tight text-blue-600">PSPO</h1>
          <p className="text-sm font-bold text-gray-800">おはようございます！{userName}さん</p>
        </div>
        <Link href="/notices" className="p-2 relative">
          <Bell size={22} className="text-gray-700" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </Link>
      </header>

      {/* Main Visual Card - Crowd Status */}
      <section className="px-5 mb-6">
        <div className="relative overflow-hidden rounded-2xl shadow-md w-full h-[220px]">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" alt="Store" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="relative z-10 p-5 h-full flex flex-col justify-between text-white">
            <div>
              <span className="bg-blue-600 px-3 py-1 text-[10px] font-bold rounded-sm">混雑状況</span>
              <h2 className="text-xl font-black mt-3 mb-1">湯渡店</h2>
              <p className="text-xs font-bold text-gray-300">現在の混雑状況</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-5xl font-black">{crowdPercent}<span className="text-2xl">%</span></span>
                <span className="text-sm font-bold text-blue-400">{crowdStatus}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold text-gray-300">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>営業時間 6:00 - 24:00</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                <span>湯渡店</span>
              </div>
            </div>
          </div>
        </div>
        {/* Carousel Dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
        </div>
      </section>

      {/* Menu Icons */}
      <section className="px-5 mb-10">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 grid grid-cols-4 gap-y-6 gap-x-2">
          {[
            { icon: Calendar, label: "イベント\n情報", href: "/events" },
            { icon: MapPin, label: "混雑状況\n", href: "/map" },
            { icon: Map, label: "PSPO MAP\n", href: "https://book.ntmg.com/Dj7rP223yP1WgSyqjaZkt6KknWMNMQdm4JMEpOvi/maps/a2577052-a3e6-4e63-8284-98452513610d?lng=ja-JP" },
            { icon: Plus, label: "新店舗・\n新サービス", href: "/new-services" },
            { icon: Star, label: "キャンペーン\n", href: "/campaigns" },
            { icon: Award, label: "スタンプ\nバッジ", href: "/stamps" },
            { icon: Coffee, label: "予約\n", href: "/reserve" },
            { icon: Bell, label: "会員特典\n", href: "/benefits" },
          ].map((item, i) => (
            <Link 
              key={i} 
              href={item.href} 
              target={item.href.startsWith('http') ? '_blank' : '_self'} 
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : ''} 
              className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <item.icon size={28} className="text-blue-600" />
              <span className="text-[10px] font-bold text-center leading-tight whitespace-pre-wrap text-gray-800">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Today's PSPO (Horizontal Scroll) */}
      <section className="mb-10 pl-5">
        <div className="flex justify-between items-end pr-5 mb-4">
          <h3 className="text-lg font-black text-gray-800">今日のPSPO</h3>
          <Link href="/events" className="text-blue-600 text-xs font-bold flex items-center">すべて見る <ChevronRight size={14} /></Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 pr-5 hide-scrollbar">
          {TODAY_PSPO.map((item) => (
            <Link key={item.id} href="/events/1" className="shrink-0 w-48 relative rounded-2xl overflow-hidden shadow-sm aspect-video block active:scale-95 transition-transform">
              <img src={item.image} alt={item.store} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-2">
                <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-sm w-fit ${item.tagColor}`}>{item.tag}</span>
                <div>
                  <p className="text-[10px] font-bold text-gray-300 mb-0.5">{item.store}</p>
                  <p className="text-white font-bold text-xs leading-tight whitespace-pre-wrap">{item.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New & Featured */}
      <section className="mb-10 pl-5">
        <div className="flex justify-between items-end pr-5 mb-4">
          <h3 className="text-lg font-black text-gray-800">新着・特集</h3>
          <Link href="/events" className="text-blue-600 text-xs font-bold flex items-center">すべて見る <ChevronRight size={14} /></Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 pr-5 hide-scrollbar">
          {FEATURES.map((feature) => (
            <Link key={feature.id} href="/events/1" className="shrink-0 w-36 block active:scale-95 transition-transform">
              <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-[4/3] mb-2">
                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2">
                  <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${feature.tagColor}`}>{feature.tag}</span>
                </div>
              </div>
              <p className="text-xs font-bold text-gray-800 leading-tight whitespace-pre-wrap px-1">{feature.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* This Month's My PSPO */}
      <section className="px-5 mb-10">
        <h3 className="text-lg font-black text-gray-800 mb-4">今月のマイPSPO</h3>
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex gap-4 divide-x divide-gray-100">
          <div className="flex-1 pr-2">
            <p className="text-[10px] font-bold text-gray-500 mb-1">今月の利用回数</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-black text-gray-800">9</span>
              <span className="text-[10px] font-bold text-gray-600">回</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-red-500">
              <span>先月より +3回</span>
              <TrendingUp size={12} />
            </div>
          </div>
          <div className="flex-1 px-4">
            <p className="text-[10px] font-bold text-gray-500 mb-2">よく利用する施設</p>
            <div className="flex justify-between items-end">
              <div className="text-center">
                <Dumbbell size={18} className="mx-auto text-gray-700 mb-1" />
                <p className="text-[10px] font-bold text-gray-800">ジム</p>
                <p className="text-[10px] font-bold text-gray-500">6回</p>
              </div>
              <div className="text-center">
                <Coffee size={18} className="mx-auto text-amber-700 mb-1" />
                <p className="text-[10px] font-bold text-gray-800">カフェ</p>
                <p className="text-[10px] font-bold text-gray-500">2回</p>
              </div>
              <div className="text-center">
                <svg className="mx-auto text-orange-500 mb-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v3"/><path d="M14 2v3"/><path d="M6 2v3"/><path d="M18 2v3"/><path d="M22 10a10 10 0 1 1-20 0"/></svg>
                <p className="text-[10px] font-bold text-gray-800">サウナ</p>
                <p className="text-[10px] font-bold text-gray-500">1回</p>
              </div>
            </div>
          </div>
          <div className="flex-1 pl-4">
             <p className="text-[10px] font-bold text-gray-500 mb-2">利用カレンダー</p>
             <div className="flex justify-between text-[8px] font-bold text-gray-400 mb-1">
               <span>月</span><span>火</span><span>水</span><span>木</span><span>金</span><span>土</span><span>日</span>
             </div>
             <div className="grid grid-cols-7 gap-y-1 gap-x-0.5">
               {Array.from({ length: 14 }).map((_, i) => (
                 <div key={i} className="flex justify-center">
                   <div className={`w-1.5 h-1.5 rounded-full ${[2,5,8,12].includes(i) ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* New Notices */}
      <section className="px-5 mb-8">
        <h3 className="text-lg font-black text-gray-800 mb-4">新着お知らせ</h3>
        
        <div className="flex gap-2 overflow-x-auto pb-3 mb-2 hide-scrollbar">
          {["全体", "マイ店舗", "中央店", "湯渡店", "DAINO店", "ゴルフ", "カラオケ"].map((tag, i) => (
            <button key={i} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${i === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border border-gray-200'}`}>
              {tag}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {NOTICES.map((notice) => (
            <Link key={notice.id} href="/notices/1" className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex gap-3 block active:scale-[0.98] transition-transform">
              <img src={notice.image} alt={notice.title} className="w-20 h-16 object-cover rounded-xl shrink-0 bg-gray-100" />
              <div className="flex-1 pt-1">
                <h4 className="text-xs font-black text-gray-800 line-clamp-1">{notice.title}</h4>
                <div className="flex items-center gap-2 mt-1 mb-1">
                  <span className="text-[9px] text-gray-400 font-medium">{notice.date}</span>
                  {notice.isNew && <span className="text-[9px] font-bold text-red-500">NEW</span>}
                </div>
                <p className="text-[10px] text-gray-500 font-medium line-clamp-1">{notice.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  )
}
