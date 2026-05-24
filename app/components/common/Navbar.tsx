"use client";
import Link from "next/link";
import { useAuth } from "@/app/lib/hooks";
import { Button } from "./Button";
import { Briefcase } from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/60 border-b border-slate-800/80 backdrop-blur-md">
      <div className="w-full px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-blue-500 tracking-tight">
            Techdive
          </span>
        </Link>

        {/* Right Side: Navigation & Actions - Snaps directly to the far right */}
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard/jobs"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Browse Jobs
          </Link>
          <Link
            href="/dashboard/pricing"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Pricing
          </Link>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/profile"
                className="text-slate-300 hover:text-white font-medium transition-colors"
              >
                {user.name || user.email}
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
