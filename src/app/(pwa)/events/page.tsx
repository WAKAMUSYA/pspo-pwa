import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function EventsPage() {
  const events = [
    { title: "プロテイン試飲会", time: "5/20(月) 18:00~20:00", store: "中央店", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=300&auto=format&fit=crop" },
    { title: "サウナイベント", time: "5/25(土) 14:00~", store: "湯渡店", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=300&auto=format&fit=crop" },
    { title: "ゴルフコンペ", time: "6/2(日) 9:00~", store: "シミュレーションゴルフ", image: "https://images.unsplash.com/photo-1535139262971-c5184570fa24?q=80&w=300&auto=format&fit=crop" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans">
      <header className="px-5 py-4 flex items-center bg-white sticky top-0 z-40 border-b border-gray-100">
        <Link href="/" className="w-10 h-10 -ml-2 flex items-center justify-center">
          <ChevronLeft size={24} className="text-gray-800" />
        </Link>
        <h1 className="text-lg font-black text-center flex-1 pr-8">イベント</h1>
      </header>

      <div className="bg-white p-5">
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 hide-scrollbar">
          {["すべて", "中央店", "湯渡店", "ゴルフ"].map((tag, i) => (
            <button key={i} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${i === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border border-gray-200'}`}>
              {tag}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {events.map((ev, i) => (
            <div key={i} className="flex gap-4 items-center border-b border-gray-100 pb-4 last:border-0">
              <img src={ev.image} alt={ev.title} className="w-20 h-20 object-cover rounded-2xl shrink-0 shadow-sm" />
              <div className="flex-1">
                <h3 className="font-black text-gray-800 text-sm mb-1">{ev.title}</h3>
                <p className="text-xs text-gray-500 font-bold mb-0.5">{ev.time}</p>
                <p className="text-xs text-gray-400 font-medium">{ev.store}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-right">
          <Link href="#" className="text-blue-600 text-xs font-bold flex items-center justify-end">もっと見る <ChevronRight size={14} /></Link>
        </div>
      </div>
    </div>
  );
}
