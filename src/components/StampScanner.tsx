'use client'

import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import { X, Camera, RefreshCw, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface StampScannerProps {
  onScan: (data: string) => void
  onClose: () => void
}

export default function StampScanner({ onScan, onClose }: StampScannerProps) {
  const [error, setError] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const qrCodeRef = useRef<Html5Qrcode | null>(null)
  const videoId = 'qr-video-region'

  useEffect(() => {
    qrCodeRef.current = new Html5Qrcode(videoId)

    const startScanner = async () => {
      try {
        await qrCodeRef.current?.start(
          { facingMode: "environment" },
          {
            fps: 15,
            qrbox: { width: 260, height: 260 },
          },
          (decodedText) => {
            handleScanSuccess(decodedText)
          },
          () => {} // 読み取りエラーは無視
        )
        setIsScanning(true)
        setHasPermission(true)
      } catch (err: any) {
        console.error('Scanner Start Error:', err)
        if (err?.includes?.('NotAllowedError') || err?.includes?.('Permission denied')) {
          setHasPermission(false)
          setError('カメラの使用が許可されていません')
        } else {
          setError('カメラを起動できませんでした')
        }
      }
    }

    startScanner()

    return () => {
      stopScanner()
    }
  }, [])

  const stopScanner = async () => {
    if (qrCodeRef.current && qrCodeRef.current.isScanning) {
      try {
        await qrCodeRef.current.stop()
      } catch (err) {
        console.error('Stop Scanner Error:', err)
      }
    }
  }

  const handleScanSuccess = async (decodedText: string) => {
    await stopScanner()
    onScan(decodedText)
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* カメラ映像出力先 */}
      <div id={videoId} className="absolute inset-0 w-full h-full object-cover"></div>

      {/* オーバーレイ層 */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-between pointer-events-none">
        
        {/* 背景の暗幕（中央だけ抜く） */}
        <div className="absolute inset-0 bg-black/40" style={{
          clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 0% 0%)' 
          // 実際にはより複雑なマスクが必要ですが、シンプルな半透明で対応
        }}></div>

        {/* ヘッダー */}
        <div className="w-full p-8 flex justify-between items-start pointer-events-auto">
          <div className="text-white">
            <h2 className="text-2xl font-black tracking-tighter flex items-center gap-2">
              <Camera size={24} className="text-yellow-400" />
              SCAN QR
            </h2>
            <p className="text-xs font-bold text-gray-300 uppercase tracking-widest opacity-80">枠内にQRコードを合わせてください</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all active:scale-90 shadow-xl"
          >
            <X size={24} />
          </button>
        </div>

        {/* スキャン枠 */}
        <div className="relative w-72 h-72 border-2 border-white/20 rounded-[2.5rem] flex items-center justify-center overflow-hidden">
          {/* 四隅のガイド */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-yellow-400 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-yellow-400 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-yellow-400 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-yellow-400 rounded-br-3xl"></div>

          {/* スキャンレーザーアニメーション */}
          <motion.div 
            animate={{ top: ['10%', '90%', '10%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-[0_0_15px_#facc15] z-20"
          />
          
          {/* 読み取り中のインジケーター */}
          <div className="absolute inset-0 bg-yellow-400/5 animate-pulse"></div>
        </div>

        {/* フッター / メッセージ */}
        <div className="w-full p-12 text-center pointer-events-auto">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/90 backdrop-blur-md px-6 py-3 rounded-2xl text-white text-sm font-bold flex items-center gap-2 mx-auto w-fit shadow-lg shadow-red-500/20"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/60 text-xs font-bold tracking-widest flex items-center justify-center gap-2"
              >
                <RefreshCw size={14} className="animate-spin" />
                スキャン待機中...
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        #qr-video-region video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
      `}</style>
    </div>
  )
}
