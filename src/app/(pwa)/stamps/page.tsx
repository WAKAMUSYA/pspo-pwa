import { createClient } from '@/utils/supabase/server'
import { Stamp, QrCode, ChevronLeft, Info } from 'lucide-react'
import Link from 'next/link'

export default async function StampsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('total_stamps')
    .eq('id', user?.id)
    .single()

  const stampCount = profile?.total_stamps || 0
  const maxStamps = 10
  const stamps = Array.from({ length: maxStamps }, (_, i) => i < stampCount)

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex items-center">
        <Link href="/" className="p-2 -ml-2 text-gray-500">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">スタンプカード</h1>
      </header>

      <div className="p-6 space-y-8">
        {/* Card */}
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[32px] p-6 text-white shadow-xl shadow-yellow-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Stamp size={120} />
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-yellow-200">Current Status</p>
                <p className="text-3xl font-bold">{stampCount} / {maxStamps}</p>
              </div>
              <Stamp size={32} />
            </div>

            <div className="grid grid-cols-5 gap-3">
              {stamps.map((filled, i) => (
                <div 
                  key={i} 
                  className={`aspect-square rounded-full flex items-center justify-center border-2 transition-all ${
                    filled ? 'bg-white border-white' : 'bg-yellow-500/30 border-yellow-300'
                  }`}
                >
                  {filled ? (
                    <Stamp size={20} className="text-yellow-500" />
                  ) : (
                    <span className="text-xs font-bold text-yellow-300">{i + 1}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2">
              <p className="text-[10px] text-yellow-100">
                10個貯まると素敵な特典をプレゼント！
              </p>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center space-x-3 py-6 bg-white border-2 border-yellow-400 text-yellow-600 font-bold rounded-3xl shadow-sm hover:bg-yellow-50 transition-all active:scale-[0.98]">
            <QrCode size={24} />
            <span>QRコードを読み取る</span>
          </button>
          
          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-2xl">
            <Info size={20} className="text-gray-400 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 leading-relaxed">
              店舗に設置されているQRコードを読み取るとスタンプが貯まります。1日1回まで有効です。
            </p>
          </div>
        </div>

        {/* History Placeholder */}
        <section className="space-y-4 pt-4">
          <h2 className="font-bold text-gray-900">スタンプ履歴</h2>
          <div className="space-y-3">
             {[1, 2, 3].map(i => (
               <div key={i} className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-2xl">
                 <div>
                   <p className="font-bold text-sm">来館スタンプ</p>
                   <p className="text-[10px] text-gray-400">2026.05.{12-i}</p>
                 </div>
                 <span className="text-yellow-500 font-bold">+1</span>
               </div>
             ))}
          </div>
        </section>
      </div>
    </div>
  )
}
