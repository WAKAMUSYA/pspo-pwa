'use client'

import { QRCodeSVG } from 'qrcode.react'
import { Printer, Info } from 'lucide-react'

export default function AdminStampsPage() {
  const qrValue = 'pspo-stamp:gym-visit'

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 font-outfit">スタンプ管理</h1>
        <button 
          onClick={handlePrint}
          className="flex items-center space-x-2 px-6 py-3 bg-yellow-400 text-white font-bold rounded-xl hover:bg-yellow-500 shadow-lg shadow-yellow-100 transition-all print:hidden"
        >
          <Printer size={20} />
          <span>掲示用を印刷する</span>
        </button>
      </div>
      
      {/* プレビューエリア */}
      <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 flex flex-col items-center space-y-8 text-center print:shadow-none print:border-0 print:p-0">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-gray-900">PSPO24</h2>
          <p className="text-xl font-bold text-yellow-500">来館スタンプ獲得QRコード</p>
          <p className="text-gray-500 print:hidden">店内の見えやすい場所に掲示してください</p>
        </div>

        <div className="p-8 bg-white border-[16px] border-gray-50 rounded-[48px] shadow-inner print:border-0 print:p-0">
          <QRCodeSVG 
            value={qrValue} 
            size={320}
            level="H"
            includeMargin={false}
          />
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-400 font-medium">
            ※スタンプは1日1回まで獲得可能です
          </p>
          <div className="text-xs font-mono text-gray-300 print:hidden">
            QR Data: {qrValue}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start space-x-4 print:hidden">
        <Info className="text-blue-500 shrink-0 mt-1" size={20} />
        <div className="text-sm text-blue-900 space-y-2">
          <p className="font-bold">印刷時のアドバイス</p>
          <ul className="list-disc list-inside space-y-1 text-blue-800/80">
            <li>A4サイズ以上での印刷を推奨します。</li>
            <li>QRコードが反射しないよう、光沢の少ない紙やマットなラミネートがおすすめです。</li>
            <li>掲示後、ご自身のスマホで読み取れるか必ずテストしてください。</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
