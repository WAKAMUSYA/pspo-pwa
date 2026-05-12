-- Create tables
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  member_id TEXT UNIQUE,
  email TEXT UNIQUE,
  full_name TEXT,
  home_store TEXT,
  membership_status TEXT,
  role TEXT DEFAULT 'member',
  total_stamps INTEGER DEFAULT 0,
  tutorial_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT, -- contentからbodyに変更
  image_url TEXT,
  category TEXT,
  target_store TEXT, -- 追加
  is_published BOOLEAN DEFAULT FALSE, -- 追加
  is_important BOOLEAN DEFAULT FALSE, -- 追加
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  start_date TIMESTAMP WITH TIME ZONE, -- event_dateからstart_dateに変更
  location TEXT,
  target_store TEXT, -- 追加
  is_published BOOLEAN DEFAULT FALSE, -- 追加
  max_participants INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(profile_id, badge_id)
);

CREATE TABLE tutorials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE user_tutorial_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  tutorial_id UUID REFERENCES tutorials(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(profile_id, tutorial_id)
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Notices are viewable by everyone." ON public.notices FOR SELECT USING (true);
CREATE POLICY "Admins can manage notices." ON public.notices 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() AND (profiles.role = 'admin' OR profiles.role = 'staff')
    )
  );

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Events are viewable by everyone." ON public.events FOR SELECT USING (true);
CREATE POLICY "Admins can manage events." ON public.events 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() AND (profiles.role = 'admin' OR profiles.role = 'staff')
    )
  );

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Badges are viewable by everyone." ON badges FOR SELECT USING (true);

ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User badges are viewable by everyone." ON user_badges FOR SELECT USING (true);
CREATE POLICY "Users can insert their own badges." ON user_badges FOR INSERT WITH CHECK (auth.uid() = profile_id);

ALTER TABLE tutorials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tutorials are viewable by everyone." ON tutorials FOR SELECT USING (true);

ALTER TABLE user_tutorial_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own tutorial progress." ON user_tutorial_progress FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Users can insert their own tutorial progress." ON user_tutorial_progress FOR INSERT WITH CHECK (auth.uid() = profile_id);

-- Dummy Data
INSERT INTO notices (title, body, category, is_published) VALUES 
('GW営業時間のお知らせ', 'ゴールデンウィーク期間中の営業時間についてお知らせいたします。', 'important', true),
('新マシン導入！', '最新のランニングマシンを5台導入しました。ぜひお試しください。', 'news', true),
('プロテイン試飲会', '来週月曜日、18時からフロントにてプロテインの試飲会を開催します。', 'event', true);

INSERT INTO events (title, description, location, start_date, is_published) VALUES 
('初心者向け筋トレ講座', '基礎からしっかり学びたい方向けの講座です。', '1F フリーウェイトエリア', NOW() + INTERVAL '7 days', true),
('ヨガワークショップ', '呼吸法と基本的なポーズを練習します。', 'スタジオA', NOW() + INTERVAL '10 days', true);

INSERT INTO badges (name, description) VALUES 
('ビギナー', '初めてログインした証'),
('継続の星', '30日連続でログインした'),
('イベントマスター', 'イベントに5回参加した');

INSERT INTO tutorials (title, content, order_index) VALUES 
('アプリの使い方', 'このアプリではお知らせやイベント情報を確認できます。', 1),
('スタンプの貯め方', '来館時にQRコードを読み取るとスタンプが貯まります。', 2),
('バッジについて', '特定の条件を満たすとバッジを獲得できます。', 3);

-- Trigger to automatically create a profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, membership_status, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', '通常会員', 'member');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
