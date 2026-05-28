"use client";

import Link from "next/link";
import { useAuth } from "@/app/lib/hooks";
import { Button } from "./Button";
import { Briefcase, User } from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  // Compute a clean letter avatar initial for the user badge context
  const userInitial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email
      ? user.email.charAt(0).toUpperCase()
      : "M";

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/60 border-b border-slate-800/80 backdrop-blur-md">
      <div className="w-full px-6 sm:px-10 lg:px-16 py-3.5 flex items-center justify-between">
        {/* Left Side Brand Logo Block */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm shadow-blue-500/20">
            <Briefcase className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent tracking-tight">
            Techdive
          </span>
        </Link>

        {/* Right Side Link Intermediaries & Active Actions Module */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            {/* <Link
              href="/dashboard/jobs"
              className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors tracking-wide"
            >
              Browse Jobs
            </Link> */}
            <Link
              href="/dashboard/pricing"
              className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors tracking-wide"
            >
              Pricing
            </Link>
          </div>

          <div className="h-4 w-px bg-slate-200 hidden md:block" />

          {isAuthenticated && user ? (
            <Link href="/dashboard/profile" className="group">
              {/* Premium Stateful Profile Component Wrapper Tag */}
              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/60 rounded-full pl-2.5 pr-4 py-1.5 hover:bg-white hover:border-blue-500/30 hover:shadow-sm transition-all duration-150 cursor-pointer">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  <span>{userInitial}</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {user.name || "My Account"}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 -mt-0.5 max-w-[110px] truncate">
                    {user.email}
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
