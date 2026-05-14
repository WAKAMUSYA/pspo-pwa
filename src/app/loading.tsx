import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <>
      <div className="loading-bar" />
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-sm pointer-events-none">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="animate-spin text-yellow-500" size={40} />
          <p className="text-sm font-bold text-gray-500 animate-pulse">読み込み中...</p>
        </div>
      </div>
    </>
  )
}
