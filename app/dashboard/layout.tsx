"use client";

import { useAuth } from "@/app/lib/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";
import { Sidebar } from "@/app/components/dashboard/Sidebar";
import { Header } from "@/app/components/dashboard/Header";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  // 📱 Tracks whether responsive overlay drawers show up
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      {/* 1. Sidebar Component instance wrapper handling props updates */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 2. Header component tracking trigger executions */}
        <Header
          user={user!}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* 3. Dark backdrop tint window overlay on smaller breakpoints */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
        />
      )}
    </div>
  );
}
