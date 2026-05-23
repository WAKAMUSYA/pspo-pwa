import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CampaignsPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans">
      <header className="px-5 py-4 flex items-center bg-white sticky top-0 z-40 border-b border-gray-100">
        <Link href="/" className="w-10 h-10 -ml-2 flex items-center justify-center">
          <ChevronLeft size={24} className="text-gray-800" />
        </Link>
        <h1 className="text-lg font-black text-center flex-1 pr-8">キャンペーン</h1>
      </header>

      <div className="bg-white p-5 space-y-8">
        <div>
          <h2 className="text-lg font-black text-red-500 mb-3 flex items-center gap-2">夏の入会キャンペーン</h2>
          <div className="relative rounded-3xl overflow-hidden shadow-sm aspect-[2/1] bg-gradient-to-r from-blue-500 to-cyan-400 p-6 text-white flex flex-col justify-center">
            <div className="flex justify-between items-center">
              <div>
                 <h3 className="text-2xl font-black mb-1">入会金 <span className="text-yellow-300">0</span>円</h3>
                 <p className="text-xl font-bold">2ヶ月半額</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎁</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-black text-red-500 mb-3 flex items-center gap-2">お友達紹介キャンペーン</h2>
          <div className="relative rounded-3xl overflow-hidden shadow-sm aspect-[2/1] bg-gradient-to-r from-indigo-500 to-blue-600 p-6 text-white flex flex-col justify-center">
             <p className="text-sm font-bold mb-2">紹介した人もされた人も、</p>
             <h3 className="text-3xl font-black text-yellow-300">1ヶ月無料！</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
