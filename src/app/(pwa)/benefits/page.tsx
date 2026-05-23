import Link from 'next/link';
import { ChevronLeft, ChevronRight, Coffee, Bath, Building, Gift } from 'lucide-react';

export default function BenefitsPage() {
  const benefits = [
    { icon: Coffee, title: "ドリンク1杯無料", desc: "カフェで使えるドリンク無料券", color: "text-amber-700 bg-amber-50 border-amber-100" },
    { icon: Bath, title: "レンタルタオル無料", desc: "サウナ利用時レンタルタオル無料", color: "text-blue-600 bg-blue-50 border-blue-100" },
    { icon: Building, title: "提携店割引", desc: "提携店での割引特典", color: "text-gray-700 bg-gray-100 border-gray-200" },
    { icon: Gift, title: "パーソナルトレーニング割引", desc: "パーソナルトレーニングが10%OFF", color: "text-rose-600 bg-rose-50 border-rose-100" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans">
      <header className="px-5 py-4 flex items-center bg-white sticky top-0 z-40 border-b border-gray-100">
        <Link href="/" className="w-10 h-10 -ml-2 flex items-center justify-center">
          <ChevronLeft size={24} className="text-gray-800" />
        </Link>
        <h1 className="text-lg font-black text-center flex-1 pr-8">会員特典</h1>
      </header>

      <div className="bg-white p-5">
        <h3 className="font-black text-gray-800 mb-4 border-b border-gray-100 pb-2">特典一覧</h3>
        
        <div className="space-y-4">
          {benefits.map((b, i) => (
            <div key={i} className="flex gap-4 items-center p-4 border border-gray-100 rounded-2xl shadow-sm">
              <div className={`w-14 h-14 rounded-xl border flex items-center justify-center shrink-0 ${b.color}`}>
                <b.icon size={24} />
              </div>
              <div>
                <h4 className="font-black text-gray-800 text-sm mb-1">{b.title}</h4>
                <p className="text-[10px] text-gray-500 font-bold">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-right">
          <Link href="#" className="text-blue-600 text-xs font-bold inline-flex items-center">もっと見る <ChevronRight size={14} /></Link>
        </div>
      </div>
    </div>
  );
}
