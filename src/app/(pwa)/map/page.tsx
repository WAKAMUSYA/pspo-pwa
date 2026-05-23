'use client';

import { useState } from 'react';
import { Search, MapPin, Clock, Users, ChevronRight, Filter } from 'lucide-react';
import Link from 'next/link';
import { STORES } from '@/data/mock';

export default function MapPage() {
  const [activeFilter, setActiveFilter] = useState('すべて');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['すべて', 'ジム', 'カフェ', 'サウナ', 'ゴルフ', 'カラオケ'];

  const filteredStores = STORES.filter(store => {
    const matchesFilter = activeFilter === 'すべて' || store.type.includes(activeFilter);
    const matchesSearch = store.name.includes(searchQuery) || store.address.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans">
      {/* Header */}
      <header className="bg-white px-5 py-4 sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <h1 className="text-xl font-black text-center mb-4">PSPO MAP</h1>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="店舗名やエリアで検索..." 
            className="w-full bg-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${activeFilter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      {/* Store List */}
      <div className="bg-white px-5 py-2">
        {filteredStores.map((store, index) => {
          // Dummy data for properties not in mock.ts
          const isFavorite = index === 0;
          const driveTime = index === 0 ? "8分" : index === 1 ? "車で 10分" : "車で 12分";
          const tags = store.features.slice(0, 3); // Use features as tags for now
          
          return (
            <Link key={store.id} href={`/map/${store.id}`} className="flex gap-4 items-center border-b border-gray-100 py-4 last:border-0 active:bg-gray-50 transition-colors">
              <img src={store.image} alt={store.name} className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-sm" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-base font-black text-gray-900">{store.name}</h3>
                  <button className="text-gray-300 active:scale-90 transition-transform">
                    {/* SVG for heart icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "#ef4444" : "none"} stroke={isFavorite ? "#ef4444" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                  </button>
                </div>
                
                <div className="flex gap-1.5 mb-2 flex-wrap">
                  {tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">{tag}</span>
                  ))}
                </div>
                
                <div className="flex justify-between items-end text-[10px] font-bold text-gray-500">
                  <span>{store.hours}</span>
                  <div className="flex items-center gap-3">
                    <span>混雑率 <span className={store.crowd > 50 ? "text-orange-500 text-xs" : "text-teal-600 text-xs"}>{store.crowd}%</span></span>
                    <span className="flex items-center gap-0.5 text-teal-600">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                      {driveTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        {filteredStores.length === 0 && (
          <div className="text-center py-10 text-gray-400 font-bold">
            該当する店舗が見つかりません
          </div>
        )}
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
