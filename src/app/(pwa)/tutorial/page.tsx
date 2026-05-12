'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Check } from 'lucide-react'

export default function TutorialPage() {
  const [tutorials, setTutorials] = useState<any[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchTutorials = async () => {
      const { data } = await supabase.from('tutorials').select('*').order('order_index', { ascending: true })
      if (data) setTutorials(data)
      setLoading(false)
    }
    fetchTutorials()
  }, [supabase])

  const handleNext = async () => {
    if (currentStep < tutorials.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete tutorial
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('profiles').update({ tutorial_completed: true }).eq('id', user.id)
      }
      router.push('/')
    }
  }

  if (loading || tutorials.length === 0) return null

  const current = tutorials[currentStep]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-12">
        <div className="w-full max-w-xs aspect-square bg-yellow-50 rounded-[60px] flex items-center justify-center relative overflow-hidden">
          <motion.div
            key={currentStep}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-yellow-400"
          >
            <Check size={120} />
          </motion.div>
          
          <div className="absolute bottom-8 flex space-x-2">
            {tutorials.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all ${
                  i === currentStep ? 'w-8 bg-yellow-400' : 'w-2 bg-yellow-200'
                }`} 
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-2xl font-bold text-gray-900">{current.title}</h1>
            <p className="text-gray-500 leading-relaxed">
              {current.content}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8">
        <button
          onClick={handleNext}
          className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-2xl shadow-lg shadow-yellow-100 transition-all flex items-center justify-center space-x-2"
        >
          <span>{currentStep === tutorials.length - 1 ? 'はじめる' : '次へ'}</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
