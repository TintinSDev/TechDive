"use client";

import { useAuth } from "@/app/lib/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";
import { Sidebar } from "@/app/components/dashboard/Sidebar";
import { Header } from "@/app/components/dashboard/Header";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login"); // ✅ Correct - inside useEffect
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user!} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
