"use client";

import { ReactNode } from "react";
import { useAuth } from "@/app/lib/hooks";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";
import { Sidebar } from "@/app/components/dashboard/Sidebar";
import { Header } from "@/app/components/dashboard/Header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  if (loading) return <LoadingSpinner />;

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

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
