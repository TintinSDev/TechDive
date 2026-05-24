"use client";

import { User } from "@/app/lib/types";
import Link from "next/link";

interface HeaderProps {
  user: User;
  onMenuToggle: () => void; // 🔌 Add toggle execution prop
}

export const Header = ({ user, onMenuToggle }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Left Area: Hamburger + Greetings */}
        <div className="flex items-center gap-3">
          {/* 🍔 Hamburger Trigger Button */}
          <button
            onClick={onMenuToggle}
            className="p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 md:hidden focus:outline-none"
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
            <p className="text-sm text-gray-500">Welcome back</p>
            <p className="text-lg font-semibold text-gray-900">
              {user.name || user.email.split("@")[0]}
            </p>
          </div>
        </div>

        {/* Right Area: Profile Information */}
        <div className="flex items-center gap-6">
          {/* Subscription Badge */}
          {user.subscription && (
            <div className="text-right">
              <p className="text-xs text-gray-500">Current Plan</p>
              <p className="font-semibold text-gray-900 capitalize">
                {user.subscription.plan}
              </p>
            </div>
          )}

          {/* User Avatar */}
          <Link href="/dashboard/profile">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition">
              <span className="text-white font-bold text-sm">
                {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
