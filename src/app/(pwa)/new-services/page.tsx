import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function NewServicesPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans">
      <header className="px-5 py-4 flex items-center bg-white sticky top-0 z-40 border-b border-gray-100">
        <Link href="/" className="w-10 h-10 -ml-2 flex items-center justify-center">
          <ChevronLeft size={24} className="text-gray-800" />
        </Link>
        <h1 className="text-lg font-black text-center flex-1 pr-8">新店舗</h1>
      </header>

      <div className="bg-white p-5 space-y-8">
        <div>
          <div className="relative rounded-3xl overflow-hidden shadow-sm aspect-video mb-3">
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" alt="New Store" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <span className="bg-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-sm mb-1 inline-block">新松山店</span>
              <h2 className="text-2xl font-black mb-1">OPEN！</h2>
              <p className="text-xs font-bold">5/25(土) グランドオープン</p>
              <p className="text-[10px] text-gray-300">松山市...</p>
            </div>
          </div>
          <div className="text-right">
            <Link href="#" className="text-blue-600 text-xs font-bold inline-flex items-center">もっと見る <ChevronRight size={14} /></Link>
          </div>
        </div>

        <div>
          <h3 className="font-black text-gray-800 mb-4 border-b border-gray-100 pb-2">新サービス</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <h4 className="font-black text-gray-800 text-lg mb-2">カフェ・ワークスペース</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-medium mb-3">
                全店舗に併設された自動カフェ設備。会員様は無料でご利用いただけます。
              </p>
              <div className="text-right">
                <Link href="#" className="text-blue-600 text-xs font-bold inline-flex items-center">もっと見る <ChevronRight size={14} /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
