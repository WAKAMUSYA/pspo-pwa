import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-sm pointer-events-none">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Loader2 className="animate-spin text-yellow-500" size={48} />
          <div className="absolute inset-0 m-auto w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
        </div>
        <p className="text-sm font-bold text-gray-900 tracking-widest animate-pulse">LOADING...</p>
      </div>
    </div>
  )
}
