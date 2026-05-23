"use client";

import { User } from "@/lib/types";
import { useAuth } from "@/lib/hooks";
import { Button } from "@/components/common/Button";

interface HeaderProps {
  user: User;
}

export const Header = ({ user }: HeaderProps) => {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <p className="text-sm text-gray-500">Welcome back</p>
          <p className="text-lg font-semibold">{user.name || user.email}</p>
        </div>
        <Button onClick={logout} variant="outline" size="sm">
          Logout
        </Button>
      </div>
    </header>
  );
};
