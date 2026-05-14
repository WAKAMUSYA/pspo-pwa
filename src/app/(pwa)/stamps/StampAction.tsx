'use client'

import { useState } from 'react'
import { QrCode, Info, Loader2 } from 'lucide-react'
import StampScanner from '@/components/StampScanner'
import { processStampScan } from './actions'
import { useRouter } from 'next/navigation'

export default function StampAction() {
  const [showScanner, setShowScanner] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleScan = async (data: string) => {
    setShowScanner(false)
    setLoading(true)
    
    try {
      const result = await processStampScan(data)
      if (result.success) {
        alert('スタンプを獲得しました！')
        router.refresh() // 画面を更新してスタンプ数を反映
      } else {
        alert(result.error || 'エラーが発生しました')
      }
    } catch (err) {
      alert('通信エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="space-y-4">
        <button 
          onClick={() => setShowScanner(true)}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-3 py-6 bg-white border-2 border-yellow-400 text-yellow-600 font-bold rounded-3xl shadow-sm hover:bg-yellow-50 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>
              <QrCode size={24} />
              <span>QRコードを読み取る</span>
            </>
          )}
        </button>
        
        <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-2xl">
          <Info size={20} className="text-gray-400 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 leading-relaxed">
            店舗に設置されているQRコードを読み取るとスタンプが貯まります。1日1回まで有効です。
          </p>
        </div>
      </div>

      {showScanner && (
        <StampScanner 
          onScan={handleScan} 
          onClose={() => setShowScanner(false)} 
        />
      )}
    </>
  )
}
