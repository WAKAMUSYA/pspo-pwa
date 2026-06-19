'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { ShieldAlert, Lock, Mail, Loader2, ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // 開発用：Supabase連携を切断し、ボタンを押したら無条件でログイン成功とする
    document.cookie = 'admin_bypass=true; path=/; max-age=86400'
    window.location.href = '/admin'
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
          <div className="bg-indigo-600 p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center mx-auto mb-4">
              <ShieldAlert size={32} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Console</h1>
            <p className="text-indigo-100 text-sm mt-1">管理者専用ログイン</p>
          </div>

          <form onSubmit={handleAdminLogin} className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center gap-2 animate-shake">
                <ShieldAlert size={16} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>ログインして管理画面へ</span>
                </>
              )}
            </button>
          </form>

          <div className="px-8 pb-8 text-center">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1 transition-colors">
              <ChevronLeft size={16} />
              一般画面に戻る
            </Link>
          </div>
        </div>
        
        <p className="text-center text-slate-500 text-xs mt-8">
          &copy; 2026 PSPO Member PWA Admin Portal
        </p>
      </motion.div>
    </div>
  )
}
