'use client'

import { createClient } from '@/utils/supabase/client'

export async function processStampScan(qrData: string) {
  const supabase = createClient()
  
  // 1. ユーザー情報の取得
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { success: false, error: '認証エラー' }

  // 2. QRコードの検証
  // 全店共通の固定コードをチェック
  if (qrData !== 'pspo-stamp:gym-visit') {
    return { success: false, error: '無効なQRコードです' }
  }

  const storeName = 'PSPO24' // 表示用

  // 3. 本日すでに獲得していないかチェック
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { data: existingLogs, error: logError } = await supabase
    .from('stamp_logs')
    .select('id')
    .eq('profile_id', user.id)
    .gte('created_at', today.toISOString())
    .limit(1)

  if (logError) return { success: false, error: '履歴の確認に失敗しました' }
  if (existingLogs && existingLogs.length > 0) {
    return { success: false, error: '本日のスタンプは既に獲得済みです' }
  }

  // 4. スタンプログの記録
  const { error: insertError } = await supabase
    .from('stamp_logs')
    .insert({
      profile_id: user.id,
      store_name: storeName,
      stamp_type: 'visit'
    })

  if (insertError) return { success: false, error: 'スタンプの記録に失敗しました' }

  // 5. プロフィールの合計スタンプ数を更新
  const { data: profile } = await supabase
    .from('profiles')
    .select('total_stamps')
    .eq('id', user.id)
    .single()

  const newTotal = (profile?.total_stamps || 0) + 1

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ total_stamps: newTotal })
    .eq('id', user.id)

  if (updateError) return { success: false, error: '合計数の更新に失敗しました' }

  return { success: true, newTotal }
}
