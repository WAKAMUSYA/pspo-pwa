'use client'

import { useFormStatus } from 'react-dom'
import { Loader2, LucideIcon } from 'lucide-react'

interface SubmitButtonProps {
  children: React.ReactNode
  className?: string
  icon?: LucideIcon
  loadingText?: string
}

export function SubmitButton({ 
  children, 
  className = "", 
  icon: Icon,
  loadingText = "保存中..."
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`relative flex items-center justify-center space-x-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {Icon && <Icon size={20} />}
          <span>{children}</span>
        </>
      )}
    </button>
  )
}
