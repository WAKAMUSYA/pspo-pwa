-- スタンプ履歴を管理するテーブル
CREATE TABLE IF NOT EXISTS stamp_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  store_name TEXT, -- 獲得した店舗名
  stamp_type TEXT DEFAULT 'visit', -- visit: 来館, event: イベント参加 など
  amount INTEGER DEFAULT 1, -- 付与数（通常は1）
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- セキュリティ設定 (RLS)
ALTER TABLE stamp_logs ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分のスタンプ履歴のみ閲覧可能
CREATE POLICY "Users can view their own stamp logs." ON stamp_logs
  FOR SELECT USING (auth.uid() = profile_id);

-- ユーザーは自分のスタンプ履歴を挿入可能
CREATE POLICY "Users can insert their own stamp logs." ON stamp_logs
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

-- (オプション) 管理者は全てのログを閲覧可能
CREATE POLICY "Admins can view all stamp logs." ON stamp_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() AND (profiles.role = 'admin' OR profiles.role = 'staff')
    )
  );

-- インデックスの作成（履歴表示の高速化）
CREATE INDEX IF NOT EXISTS stamp_logs_profile_id_idx ON stamp_logs (profile_id);
CREATE INDEX IF NOT EXISTS stamp_logs_created_at_idx ON stamp_logs (created_at DESC);
