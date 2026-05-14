'use client'

import { useEffect, useRef, useState } from 'react'
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import { X } from 'lucide-react'

interface StampScannerProps {
  onScan: (data: string) => void
  onClose: () => void
}

export default function StampScanner({ onScan, onClose }: StampScannerProps) {
  const [error, setError] = useState<string | null>(null)
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)

  useEffect(() => {
    // スキャナーの初期化
    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        videoConstraints: {
          facingMode: "environment"
        }
      },
      /* verbose= */ false
    )

    scanner.render(
      (decodedText) => {
        // 読み取り成功
        scanner.clear().then(() => {
          onScan(decodedText)
        })
      },
      (errorMessage) => {
        // 読み取りエラー（頻繁に出るため無視してOK）
      }
    )

    scannerRef.current = scanner

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.error('Failed to clear scanner', err))
      }
    }
  }, [onScan])

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
      >
        <X size={24} />
      </button>

      <div className="w-full max-w-md px-6 space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">QRコードをスキャン</h2>
          <p className="text-sm text-gray-400">枠内にQRコードを収めてください</p>
        </div>

        <div id="reader" className="overflow-hidden rounded-3xl bg-gray-900 border-2 border-yellow-400/50 shadow-2xl shadow-yellow-400/20"></div>

        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 py-2 px-4 rounded-full inline-block">
            {error}
          </p>
        ) || (
          <p className="text-gray-500 text-xs">
            カメラへのアクセスを許可してください
          </p>
        )}
      </div>
    </div>
  )
}
