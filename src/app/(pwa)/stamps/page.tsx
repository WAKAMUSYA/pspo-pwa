import Link from 'next/link';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import StampAction from './StampAction';

export default async function StampsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 開発用バイパスのためコメントアウト
  // if (!user) {
  //   redirect('/login');
  // }

  const { data: profile } = await supabase
    .from('profiles')
    .select('total_stamps')
    .eq('id', user.id)
    .single();

  const totalStamps = profile?.total_stamps || 0;
  const nextTarget = Math.ceil((totalStamps + 0.1) / 10) * 10;
  const stampsNeeded = nextTarget - totalStamps;

  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans">
      <header className="px-5 py-4 flex items-center bg-white sticky top-0 z-40 border-b border-gray-100">
        <Link href="/" className="w-10 h-10 -ml-2 flex items-center justify-center">
          <ChevronLeft size={24} className="text-gray-800" />
        </Link>
        <h1 className="text-lg font-black text-center flex-1 pr-8">あなたのスタンプ</h1>
      </header>

      <div className="bg-white p-5 space-y-8 h-full">
        <div className="flex items-center justify-center gap-8 py-8">
          <div className="w-32 h-32 rounded-full border-4 border-blue-100 flex items-center justify-center relative bg-white shadow-inner">
            <div className="absolute inset-2 border-2 border-blue-500/20 rounded-full border-dashed"></div>
            <User size={48} className="text-blue-500" />
            <span className="absolute -bottom-3 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold">継続中</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-black text-gray-800">{totalStamps}</span>
              <span className="text-lg font-bold text-gray-500">個</span>
            </div>
            <p className="text-xs font-bold text-gray-500">次の特典まで</p>
            <p className="text-sm font-black text-gray-800">あと <span className="text-xl">{stampsNeeded}</span> 回</p>
          </div>
        </div>

        <div>
          <StampAction />
        </div>

        <div>
          <h3 className="font-black text-gray-800 mb-4 border-b border-gray-100 pb-2">獲得バッジ</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {[
               { name: "初心者", color: "bg-orange-100 border-orange-300 text-orange-600" },
               { name: "常連", color: "bg-blue-100 border-blue-300 text-blue-600" },
               { name: "マスター", color: "bg-yellow-100 border-yellow-400 text-yellow-600" },
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center gap-2 shrink-0">
                <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-sm ${badge.color}`}>
                  <span className="text-2xl">🏅</span>
                </div>
                <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">{badge.name}</span>
              </div>
            ))}
          </div>
          <div className="text-right">
            <Link href="#" className="text-blue-600 text-xs font-bold inline-flex items-center">もっと見る <ChevronRight size={14} /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
