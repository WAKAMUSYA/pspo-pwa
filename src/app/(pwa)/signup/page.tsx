'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { UserPlus, Mail, Lock, Loader2, User, ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      // 登録成功後、3秒後にログイン画面へ
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-yellow-50 to-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-8"
      >
        <div className="text-center relative">
          <Link href="/login" className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-4xl font-bold text-yellow-500 font-outfit">PSPO</h1>
          <p className="mt-2 text-gray-600">新規会員登録</p>
        </div>

        {success ? (
          <div className="bg-green-50 p-6 rounded-2xl border border-green-100 text-center space-y-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto">
              <UserPlus size={24} />
            </div>
            <h2 className="text-lg font-bold text-green-900">登録ありがとうございます！</h2>
            <p className="text-sm text-green-700">
              確認メールを送信しました。メール内のリンクをクリックして登録を完了してください。<br/>
              まもなくログイン画面へ移動します。
            </p>
          </div>
        ) : (
          <form onSubmit={handleSignup} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="お名前（氏名）"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="メールアドレス"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="パスワード（6文字以上）"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-xl shadow-lg shadow-yellow-200 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>登録する</span>
                  <UserPlus size={20} />
                </>
              )}
            </button>
          </form>
        )}

        <div className="text-center text-sm text-gray-500">
          <p>既にアカウントをお持ちの方は <Link href="/login" className="text-yellow-600 font-bold">ログイン</Link></p>
        </div>
      </motion.div>
    </div>
  )
}
