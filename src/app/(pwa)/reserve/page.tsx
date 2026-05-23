import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReservePage() {
  const timeSlots = [
    { time: "10:00 - 11:00", status: "available" },
    { time: "11:00 - 12:00", status: "available" },
    { time: "12:00 - 13:00", status: "selected" },
    { time: "13:00 - 14:00", status: "available" },
    { time: "14:00 - 15:00", status: "available" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans">
      <header className="px-5 py-4 flex items-center bg-white sticky top-0 z-40 border-b border-gray-100">
        <Link href="/" className="w-10 h-10 -ml-2 flex items-center justify-center">
          <ChevronLeft size={24} className="text-gray-800" />
        </Link>
        <h1 className="text-lg font-black text-center flex-1 pr-8">予約</h1>
      </header>

      <div className="bg-white p-5">
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 hide-scrollbar">
          {["ジム", "ゴルフ", "カラオケ", "宮前店"].map((tag, i) => (
            <button key={i} className={`whitespace-nowrap px-6 py-2 rounded-lg text-sm font-bold transition-colors ${i === 0 ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20' : 'bg-gray-50 text-gray-500 border border-gray-200'}`}>
              {tag}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <ChevronLeft size={20} className="text-gray-400" />
          <span className="font-bold text-gray-800">2024年5月20日(月)</span>
          <ChevronRight size={20} className="text-gray-400" />
        </div>

        <div className="space-y-3">
          {timeSlots.map((slot, i) => (
            <button key={i} className={`w-full py-3.5 rounded-xl font-bold border transition-colors ${slot.status === 'selected' ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20' : 'bg-white text-gray-600 border-gray-200 active:bg-gray-50'}`}>
              {slot.time}
            </button>
          ))}
        </div>

        <div className="mt-6 text-right">
          <Link href="#" className="text-blue-600 text-xs font-bold inline-flex items-center">もっと見る <ChevronRight size={14} /></Link>
        </div>
      </div>
    </div>
  );
}
