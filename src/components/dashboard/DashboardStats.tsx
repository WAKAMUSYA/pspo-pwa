import { createClient } from '@/utils/supabase/server'
import { Stamp, Award } from 'lucide-react'
import Link from 'next/link'

export async function DashboardStats({ userId }: { userId: string }) {
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">こんにちは、</h1>
          <p className="text-3xl font-bold text-yellow-500">{profile?.full_name || 'メンバー'} 様</p>
        </div>
        <div className="bg-yellow-100 p-2 rounded-full">
          <Award className="text-yellow-600" size={28} />
        </div>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-4 rounded-2xl text-white shadow-lg shadow-yellow-100">
          <div className="flex items-center space-x-2 mb-2">
            <Stamp size={20} />
            <span className="text-sm font-medium">スタンプ</span>
          </div>
          <p className="text-3xl font-bold">{profile?.total_stamps || 0} <span className="text-sm font-normal">個</span></p>
        </div>
        <Link href="/badges" className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-2 mb-2 text-gray-500">
            <Award size={20} />
            <span className="text-sm font-medium">バッジ</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">3 <span className="text-sm font-normal text-gray-500">個</span></p>
        </Link>
      </div>
    </div>
  )
}

export function DashboardStatsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="h-10 w-48 bg-gray-200 rounded" />
        </div>
        <div className="h-12 w-12 bg-gray-200 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-24 bg-gray-200 rounded-2xl" />
        <div className="h-24 bg-gray-200 rounded-2xl" />
      </div>
    </div>
  )
}
