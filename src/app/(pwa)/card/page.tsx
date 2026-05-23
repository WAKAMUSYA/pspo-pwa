import { User } from 'lucide-react';

export default function CardPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans p-5 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 w-full text-center space-y-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User size={32} className="text-blue-500" />
        </div>
        <h1 className="text-2xl font-black">会員証</h1>
        <p className="text-sm text-gray-500 font-medium">
          この画面は仮の画面です。<br />
          将来的にはQRコードや会員バーコードが表示されます。
        </p>
      </div>
    </div>
  );
}
