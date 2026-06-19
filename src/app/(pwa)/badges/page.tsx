import { createClient } from '@/utils/supabase/server'
import { Award, ChevronLeft, Lock } from 'lucide-react'
import Link from 'next/link'

export default async function BadgesPage() {
  const supabase = await createClient()
  const { data: badges } = await supabase.from('badges').select('*')
  const { data: { user } } = await supabase.auth.getUser()
  const { data: userBadges } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('profile_id', user?.id || '')

  const earnedBadgeIds = new Set(userBadges?.map(ub => ub.badge_id) || [])

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex items-center">
        <Link href="/" className="p-2 -ml-2 text-gray-500">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">獲得バッジ</h1>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {badges?.map((badge) => {
            const isEarned = earnedBadgeIds.has(badge.id)
            return (
              <div key={badge.id} className="flex flex-col items-center space-y-2">
                <div className={`relative aspect-square w-full rounded-2xl flex items-center justify-center transition-all ${
                  isEarned 
                    ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-sm' 
                    : 'bg-gray-100 grayscale opacity-40'
                }`}>
                  {isEarned ? (
                    <Award size={32} className="text-yellow-600" />
                  ) : (
                    <Lock size={24} className="text-gray-400" />
                  )}
                  
                  {isEarned && (
                    <div className="absolute -top-1 -right-1 bg-yellow-400 w-4 h-4 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-gray-900 line-clamp-1">{badge.name}</p>
                  <p className="text-[8px] text-gray-400 line-clamp-1">{badge.description}</p>
                </div>
              </div>
            )
          })}
        </div>
        
        {badges?.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Award size={48} className="mx-auto mb-4 opacity-20" />
            <p>バッジはまだありません</p>
          </div>
        )}
      </div>
    </div>
  )
}
