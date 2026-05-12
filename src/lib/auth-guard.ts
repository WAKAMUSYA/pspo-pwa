import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function protectAdminRoute() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // admin または staff ロールのみ許可
  if (profile && (profile.role === 'staff' || profile.role === 'admin')) {
    return { user, profile }
  }

  // 権限がない場合はログアウトさせてログイン画面へ
  await supabase.auth.signOut()
  redirect('/admin/login?error=unauthorized')
}
