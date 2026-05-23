'use client';

import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';

const STORES = ['中央店', '湯渡店', 'DAINO店', '北条店'];
const SERVICES = ['ジム', 'カフェ', 'サウナ', 'ゴルフ', 'カラオケ'];

export default function SettingsPage() {
  const [favoriteStores, setFavoriteStores] = useState<string[]>([]);
  const [interestedServices, setInterestedServices] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedStores = localStorage.getItem('pspo_favorite_stores');
    const savedServices = localStorage.getItem('pspo_interested_services');
    if (savedStores) setFavoriteStores(JSON.parse(savedStores));
    if (savedServices) setInterestedServices(JSON.parse(savedServices));
  }, []);

  const toggleStore = (store: string) => {
    setFavoriteStores(prev => 
      prev.includes(store) ? prev.filter(s => s !== store) : [...prev, store]
    );
    setIsSaved(false);
  };

  const toggleService = (service: string) => {
    setInterestedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
    setIsSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('pspo_favorite_stores', JSON.stringify(favoriteStores));
    localStorage.setItem('pspo_interested_services', JSON.stringify(interestedServices));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans p-5">
      <header className="mb-8 flex items-center gap-2">
        <SettingsIcon size={24} className="text-gray-800" />
        <h1 className="text-xl font-black">マイページ設定</h1>
      </header>

      <div className="space-y-8">
        <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-sm font-black mb-4 text-gray-800">お気に入り店舗</h2>
          <p className="text-xs text-gray-500 mb-4 font-medium">よく行く店舗を登録すると、ホーム画面に混雑状況が優先表示されます。</p>
          <div className="flex flex-wrap gap-2">
            {STORES.map(store => (
              <button
                key={store}
                onClick={() => toggleStore(store)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                  favoriteStores.includes(store) 
                    ? 'bg-blue-50 border-blue-200 text-blue-600' 
                    : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                {store}
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-sm font-black mb-4 text-gray-800">興味のあるサービス</h2>
          <p className="text-xs text-gray-500 mb-4 font-medium">興味のあるサービスを選ぶと、関連するお知らせやイベントが届きやすくなります。</p>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map(service => (
              <button
                key={service}
                onClick={() => toggleService(service)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                  interestedServices.includes(service) 
                    ? 'bg-orange-50 border-orange-200 text-orange-600' 
                    : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={handleSave}
          className={`w-full py-4 rounded-full font-black text-white flex items-center justify-center gap-2 transition-colors ${
            isSaved ? 'bg-emerald-500' : 'bg-gray-800 hover:bg-gray-900 active:scale-95'
          }`}
        >
          {isSaved ? '保存しました！' : <><Save size={18} /> 設定を保存する</>}
        </button>
      </div>
    </div>
  );
}
