export const STORES = [
  {
    id: "1",
    name: "湯渡店",
    type: "ジム・サウナ",
    hours: "6:00 - 24:00",
    crowd: 35,
    crowdStatus: "空いています",
    address: "松山市湯渡町...",
    features: ["フリーウエイト", "有酸素マシン", "サウナ", "シャワー"],
    parking: "あり（50台）",
    image: "https://placehold.co/800x400/1e3a8a/ffffff?text=Yuwatari+Store",
  },
  {
    id: "2",
    name: "中央店",
    type: "ジム・カフェ",
    hours: "24時間",
    crowd: 80,
    crowdStatus: "混雑しています",
    address: "松山市中央...",
    features: ["カフェ併設", "コワーキング", "女性専用エリア"],
    parking: "あり（30台）",
    image: "https://placehold.co/800x400/1e3a8a/ffffff?text=Chuo+Store",
  }
];

export const EVENTS = [
  {
    id: "1",
    title: "ダミーイベント",
    storeId: "1",
    date: "2024/05/20",
    image: "https://placehold.co/400x300/1e293b/ffffff?text=Event",
  }
];

export const NOTICES = [
  {
    id: "1",
    title: "夏の入会キャンペーン実施中！",
    description: "5/15〜7/15までの得なキャンペーン開催！",
    storeId: "all",
    date: "2024/05/15",
    category: "全体",
    isNew: true,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "サウナ室メンテナンスのお知らせ",
    description: "5/30(木)はサウナ設備メンテナンスのため一部利用を制限します。",
    storeId: "1",
    date: "2024/05/14",
    category: "湯渡店",
    isNew: false,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=300&auto=format&fit=crop",
  }
];

export const TODAY_PSPO = [
  {
    id: "1",
    title: "プロテイン試飲会\n5/20(月) 18:00~20:00",
    store: "中央店",
    tag: "イベント開催中",
    tagColor: "bg-pink-500",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "サウナ空いています\n混雑率 35%",
    store: "湯渡店",
    tag: "サウナ空きあり",
    tagColor: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "5/25(土) OPEN！",
    store: "新松山店",
    tag: "新店舗OPEN",
    tagColor: "bg-indigo-500",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
  }
];

export const FEATURES = [
  {
    id: "1",
    title: "初めての\nシミュレーションゴルフ",
    tag: "初心者向け",
    tagColor: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1535139262971-c5184570fa24?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "カフェの使い方\n完全ガイド",
    tag: "カフェ",
    tagColor: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "サウナの効能と\n正しい入り方",
    tag: "サウナ",
    tagColor: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "仕事終わりに\nおすすめの店舗",
    tag: "特集",
    tagColor: "bg-indigo-500",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop",
  }
];
