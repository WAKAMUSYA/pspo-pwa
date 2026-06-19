'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

import { cookies } from 'next/headers'

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  // 一時的なバイパス用のクッキーを削除
  const cookieStore = await cookies()
  cookieStore.delete('admin_bypass')

  redirect('/login')
}
