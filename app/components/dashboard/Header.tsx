"use client";

import { User } from "@/app/lib/types";
import { useAuth } from "@/app/lib/hooks";
import { Button } from "@/app/components/common/Button";
import Link from "next/link";

interface HeaderProps {
  user: User;
}

export const Header = ({ user }: HeaderProps) => {
  const { logout } = useAuth();
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <p className="text-sm text-gray-500">Welcome back</p>
          <p className="text-lg font-semibold text-gray-900">
            {user.name || user.email.split("@")[0]}
          </p>
        </div>

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
          <Link href="/profile">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition">
              <span className="text-white font-bold text-sm">
                {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
              </span>
            </div>
          </Link>
        </div>
        <Button onClick={logout} variant="outline" size="sm">
          Logout
        </Button>
      </div>
    </header>
  );
};
