import Link from 'next/link'
import { ChevronLeft, Share2 } from 'lucide-react'

export default function NoticeDetailPage({ params }: { params: { id: string } }) {
  // Mock content for prototype
  return (
    <div className="pb-24 bg-white min-h-screen">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex justify-between items-center">
        <Link href="/" className="p-2 text-gray-800 -ml-2">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-sm font-black text-gray-800">お知らせ</h1>
        <button className="p-2 text-gray-800 -mr-2">
          <Share2 size={20} />
        </button>
      </header>

      <div className="p-5 space-y-6">
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-sm uppercase tracking-wider">
            全体
          </span>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">夏の入会キャンペーン実施中！</h1>
          <p className="text-sm text-gray-500 font-bold">
            2024.05.15
          </p>
        </div>

        <div className="w-full aspect-video rounded-3xl overflow-hidden relative shadow-sm">
          <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop" alt="Campaign" className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed font-medium space-y-4">
          <p>
            いつもPSPOをご利用いただきありがとうございます。
          </p>
          <p>
            これからの夏に向けて、新しくトレーニングを始めたい方を応援する「夏の入会キャンペーン」を開催いたします！期間中にご入会いただいた方は、以下の特典が適用されます。
          </p>
          <ul className="bg-blue-50 p-4 rounded-2xl text-blue-900 list-disc list-inside font-bold">
            <li>入会金・事務手数料 0円！</li>
            <li>初月・翌月の月会費が半額！</li>
            <li>プロテイン1杯無料チケットプレゼント</li>
          </ul>
          <p>
            ご家族やご友人など、周りでジム通いを検討されている方がいらっしゃいましたら、ぜひこの機会にご紹介くださいませ。（お友達紹介キャンペーンとの併用も可能です）
          </p>
          <p>
            皆様のご来館をスタッフ一同、心よりお待ちしております！
          </p>
        </div>
        
        <div className="pt-6">
          <Link href="/reserve" className="w-full block text-center py-4 bg-blue-600 text-white font-black rounded-full shadow-lg shadow-blue-600/30 active:scale-95 transition-transform">
            入会予約をする
          </Link>
        </div>
      </div>
    </div>
  )
}
