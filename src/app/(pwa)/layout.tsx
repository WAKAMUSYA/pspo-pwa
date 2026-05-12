import BottomNav from "@/components/BottomNav";

export default function PWALayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-md mx-auto min-h-screen bg-white shadow-sm relative pb-20">
      {children}
      <BottomNav />
    </main>
  );
}
