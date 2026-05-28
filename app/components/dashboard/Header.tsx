"use client";

import { User } from "@/app/lib/types";
import Link from "next/link";

interface HeaderProps {
  user: User;
  onMenuToggle: () => void; // 🔌 Toggle execution prop
}

export const Header = ({ user, onMenuToggle }: HeaderProps) => {
  // Compute a fallback letter avatar initial safely
  const userInitial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email
      ? user.email.charAt(0).toUpperCase()
      : "M";

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm backdrop-blur-md">
      <div className="flex justify-between items-center px-6 sm:px-8 py-3.5">
        {/* Left Area: Hamburger + Greetings */}
        <div className="flex items-center gap-3">
          {/* 🍔 Hamburger Trigger Button - Mobile Only */}
          <button
            onClick={onMenuToggle}
            className="p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 md:hidden focus:outline-none transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div>
            <p className="text-[11px] font-bold bg-gradient-to-r from-black to-cyan-100 bg-clip-text text-transparent tracking-tight uppercase tracking-wider">
              Dive in
            </p>
            <p className="text-xl font-black bg-gradient-to-r from-black to-cyan-100 bg-clip-text text-transparent tracking-tight capitalize">
              {user.name || user.email.split("@")[0]}
            </p>
          </div>
        </div>

        {/* Right Area: Subscription & Unified Account Info */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-sm font-black bg-gradient-to-r from-black to-cyan-100 bg-clip-text text-transparent tracking-tight">
              Home
            </span>
          </Link>
          {/* Subscription Badge */}
          {user.subscription && (
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                Current Plan
              </p>
              <p className="font-extrabold text-blue-600 text-sm capitalize">
                {user.subscription.plan}
              </p>
            </div>
          )}

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* Premium Stateful Profile Wrapper Block */}
          <Link href="/dashboard/profile" className="group">
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/60 rounded-full pl-3 pr-1.5 py-1.5 hover:bg-white hover:border-blue-500/30 hover:shadow-sm transition-all duration-150 cursor-pointer">
              {/* Profile Meta String Labels */}
              <div className="flex flex-col  text-right hidden md:flex">
                <span className="text-xs font-bold text-slate-800 bg-gradient-to-r from-black to-cyan-100 bg-clip-text line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {user.name || "My Account"}
                </span>
                <span className="text-[10px] font-medium text-slate-400 -mt-0.5 max-w-[140px] truncate">
                  {user.email}
                </span>
              </div>

              {/* Graphical Avatar Circle Container */}
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-blue-500/10 group-hover:scale-105 transition-transform shrink-0">
                <span>{userInitial}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
