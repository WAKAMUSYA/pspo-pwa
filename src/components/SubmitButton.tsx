'use client'

import { useFormStatus } from 'react-dom'
import { Loader2, Save, LogOut, Trash2, UserPlus, Shield } from 'lucide-react'

interface SubmitButtonProps {
  children: React.ReactNode
  className?: string
  icon?: 'save' | 'logout' | 'delete' | 'add' | 'admin'
  loadingText?: string
}

export default function SubmitButton({ 
  children, 
  className = "", 
  icon,
  loadingText = "保存中..."
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  // アイコン名のマッピング（シリアライズ可能な文字列で受け取る）
  const getIcon = () => {
    switch (icon) {
      case 'save': return Save
      case 'logout': return LogOut
      case 'delete': return Trash2
      case 'add': return UserPlus
      case 'admin': return Shield
      default: return null
    }
  }

  const IconComponent = getIcon()

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
          {IconComponent && <IconComponent size={20} />}
          <span>{children}</span>
        </>
      )}
    </button>
  )
}
