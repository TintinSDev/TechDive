"use client";

import Link from "next/link";
import { useAuth } from "@/app/lib/hooks";
import { Button } from "./Button";

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">Techdive</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/jobs" className="text-gray-600 hover:text-gray-900">
            Browse Jobs
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="text-gray-600 hover:text-gray-900"
              >
                {user.name || user.email}
              </Link>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
