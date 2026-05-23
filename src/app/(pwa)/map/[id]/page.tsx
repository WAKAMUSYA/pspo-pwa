import { STORES, EVENTS, NOTICES } from '@/data/mock';
import { ChevronLeft, MapPin, Clock, Users, Car, Check, Calendar, Bell, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function StoreDetailPage({ params }: { params: { id: string } }) {
  const store = STORES.find(s => s.id === params.id);
  
  if (!store) {
    notFound();
  }

  const storeEvents = EVENTS.filter(e => e.storeId === store.id || e.storeId === 'all');
  const storeNotices = NOTICES.filter(n => n.storeId === store.id || n.storeId === 'all');

  return (
    <div className="bg-white min-h-screen pb-24 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto z-50 flex items-center p-4">
        <Link href="/map" className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
          <ChevronLeft size={24} className="text-gray-800" />
        </Link>
      </header>

      {/* Main Image */}
      <div className="h-64 relative">
        <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-5 w-full">
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block">{store.type}</span>
          <h1 className="text-3xl font-black text-white">{store.name}</h1>
        </div>
      </div>

      <div className="p-5 space-y-8 -mt-4 relative bg-white rounded-t-3xl">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-4 rounded-2xl flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-gray-500 mb-1">
              <Clock size={16} />
              <span className="text-xs font-bold">営業時間</span>
            </div>
            <p className="font-bold text-gray-800">{store.hours}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-2xl flex flex-col justify-center border border-blue-100">
            <div className="flex items-center gap-1.5 text-blue-500 mb-1">
              <Users size={16} />
              <span className="text-xs font-bold">混雑状況</span>
            </div>
            <p className="font-bold text-blue-800">{store.crowdStatus} <span className="text-xs font-medium text-blue-600/70">({store.crowd}%)</span></p>
          </div>
        </div>

        {/* Address & Parking */}
        <div className="space-y-4">
          <h3 className="text-lg font-black border-b pb-2">アクセス</h3>
          <div className="flex gap-3 items-start">
            <MapPin size={20} className="text-gray-400 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-gray-700">{store.address}</p>
          </div>
          <div className="flex gap-3 items-start">
            <Car size={20} className="text-gray-400 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-gray-700">駐車場: {store.parking}</p>
          </div>
        </div>

        {/* Facilities */}
        <div className="space-y-4">
          <h3 className="text-lg font-black border-b pb-2">設備・サービス</h3>
          <ul className="grid grid-cols-2 gap-y-3">
            {store.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Check size={16} className="text-emerald-500" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Store Notices */}
        {storeNotices.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-black border-b pb-2 flex items-center gap-2"><Bell size={20} /> お知らせ</h3>
            <div className="space-y-2">
              {storeNotices.map(n => (
                <div key={n.id} className="bg-gray-50 p-3 rounded-xl">
                  <span className="text-[10px] text-gray-500 font-bold mb-1 block">{n.date}</span>
                  <p className="text-sm font-bold text-gray-800">{n.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Store Events */}
        {storeEvents.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-black border-b pb-2 flex items-center gap-2"><Calendar size={20} /> イベント</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {storeEvents.map(e => (
                <div key={e.id} className="w-48 shrink-0 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="h-24 bg-gray-200">
                    <img src={e.image} alt={e.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 bg-white">
                    <span className="text-[10px] font-bold text-blue-600 mb-1 block">{e.date}</span>
                    <p className="text-xs font-bold text-gray-800 line-clamp-2">{e.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 left-0 right-0 max-w-md mx-auto px-5 z-40">
        <a 
          href="https://pspo24.hacomono.jp/home" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-blue-600 text-white font-black py-4 rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          予約・会員サイトへ <ExternalLink size={18} />
        </a>
      </div>

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
  );
}
