import Link from 'next/link'
import { ChevronLeft, Share2, MapPin, Calendar, Clock, Users } from 'lucide-react'

export default function EventDetailPage({ params }: { params: { id: string } }) {
  // Mock content for prototype
  return (
    <div className="pb-24 bg-white min-h-screen">
      <header className="absolute top-0 left-0 right-0 z-30 p-4 flex justify-between items-center">
        <Link href="/" className="p-2 bg-white/80 backdrop-blur rounded-full text-gray-800 shadow-sm -ml-2">
          <ChevronLeft size={24} />
        </Link>
        <button className="p-2 bg-white/80 backdrop-blur rounded-full text-gray-800 shadow-sm -mr-2">
          <Share2 size={20} />
        </button>
      </header>

      <div className="w-full aspect-[4/3] relative">
        <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1470&auto=format&fit=crop" alt="Event" className="w-full h-full object-cover" />
      </div>

      <div className="p-6 -mt-8 relative z-20 bg-white rounded-t-[32px] space-y-8 shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
        <div className="space-y-4">
          <div className="space-y-2">
             <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-sm uppercase tracking-wider">
               サウナイベント
             </span>
             <h1 className="text-2xl font-black text-gray-900 leading-tight">サウナの効能と正しい入り方講座</h1>
             <p className="text-sm font-bold text-gray-500">
               2024.05.25
             </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-gray-50 p-4 rounded-2xl flex items-center space-x-3 border border-gray-100">
              <div className="bg-white p-2 rounded-xl shadow-sm shrink-0">
                <Clock size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold">時間</p>
                <p className="text-xs font-black text-gray-800">14:00〜15:30</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex items-center space-x-3 border border-gray-100">
              <div className="bg-white p-2 rounded-xl shadow-sm shrink-0">
                <Users size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold">定員</p>
                <p className="text-xs font-black text-gray-800">15名</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl flex items-center space-x-3 border border-gray-100">
            <div className="bg-white p-2 rounded-xl shadow-sm shrink-0">
              <MapPin size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold">場所</p>
              <p className="text-xs font-black text-gray-800">湯渡店 特設サウナエリア</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-black text-gray-800 border-l-4 border-blue-600 pl-3">イベント詳細</h2>
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed font-medium space-y-4">
            <p>
              近年大ブームとなっている「サウナ」。でも、「なんとなく熱いだけ」「水風呂が苦手で…」という方も多いのではないでしょうか？
            </p>
            <p>
              今回のイベントでは、プロの熱波師をお招きし、サウナの本当の楽しみ方、健康や美容に良い効果的な入り方（サウナ→水風呂→外気浴の黄金サイクル）についてレクチャーしていただきます。
            </p>
            <div className="bg-gray-50 p-4 rounded-2xl">
              <h4 className="font-black text-gray-800 mb-2">こんな方におすすめ！</h4>
              <ul className="list-disc list-inside text-xs space-y-1 text-gray-600">
                <li>サウナ初心者の方</li>
                <li>「ととのう」感覚を味わってみたい方</li>
                <li>睡眠の質を向上させたい方</li>
              </ul>
            </div>
            <p>
              レクチャー後は実際にサウナに入りながらの実践タイムもあります。ぜひお気軽にご参加ください！
            </p>
          </div>
        </div>

        <button className="w-full py-4 bg-gray-900 text-white font-black rounded-full shadow-lg active:scale-95 transition-transform flex justify-center items-center gap-2">
          <Calendar size={18} />
          参加予約をする
        </button>
      </div>
    </div>
  )
}
