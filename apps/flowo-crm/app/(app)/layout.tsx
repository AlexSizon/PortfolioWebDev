import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-flowo-void">
      {/* Sidebar — desktop only */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-auto pb-20 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
          <PageTransition>{children}</PageTransition>
        </div>
      </main>

      {/* Bottom nav — mobile only */}
      <BottomNav />
    </div>
  );
}
