"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_NAVIGATION } from "@/lib/constants";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Techdive</h1>
      </div>

      <nav className="space-y-2 p-4">
        {DASHBOARD_NAVIGATION.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={`px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
