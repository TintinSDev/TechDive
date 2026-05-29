"use client";

import { useAuth, useUserProfile } from "@/app/lib/hooks"; // 🚀 Added useUserProfile
import { Button } from "@/app/components/common/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, LogOut, Trash2 } from "lucide-react"; // Nice clean iconography wrappers

export default function SettingsPage() {
  const { logout } = useAuth();
  const { user, loading } = useUserProfile(); // 🔌 Read fully hydrated Prisma DB data (includes subscription fields)
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      // In real app, call API to delete account
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await logout();
      router.push("/");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-400 animate-pulse">
          Loading settings configurations...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl bg-slate-900 rounded-lg shadow-xl p-8 mx-auto text-white border border-slate-800">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      {/* Account Info */}
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 text-slate-200">
          Account Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400">
              Email
            </label>
            <p className="text-white mt-1 font-mono text-sm">{user?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400">
              Member Since
            </label>
            <p className="text-white mt-1">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Info */}
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-slate-200">Subscription</h2>

          <a
            href="https://paystack.shop/pay/6emngx8n8t || https://paystack.shop/pay/gunyt2bqe9" // 🔗 Link to billing management (Paystack dashboard or custom billing portal)
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-blue-500 text-blue-400 hover:bg-blue-950/40"
            >
              <CreditCard className="w-4 h-4" />
              Manage Billing
            </Button>
          </a>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400">
              Current Plan
            </label>
            <p className="text-green-400 mt-1 capitalize font-bold text-lg tracking-wide">
              {user?.subscription?.plan || "Free"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400">
              Status
            </label>
            <p className="text-white mt-1 capitalize">
              {user?.subscription?.status || "Active"}
            </p>
          </div>
          {user?.subscription?.currentPeriodEnd && (
            <div>
              <label className="block text-sm font-medium text-slate-400">
                Renews On
              </label>
              <p className="text-white mt-1">
                {new Date(
                  user.subscription.currentPeriodEnd,
                ).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-950/20 border border-red-900/50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>

        <div className="space-y-4">
          {/* Logout */}
          <div className="flex justify-between items-center pb-4 border-b border-red-900/30">
            <div>
              <h3 className="font-semibold text-slate-200">Logout</h3>
              <p className="text-slate-400 text-sm">
                Sign out from this active browser session
              </p>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Delete Account */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-red-400">Delete Account</h3>
              <p className="text-red-300/70 text-sm">
                Permanently wipe your account database configurations and
                listings
              </p>
            </div>
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              variant="outline"
              size="sm"
              className="text-red-400 border-red-500/40 hover:bg-red-950/60 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <div className="mt-4 p-4 bg-red-950/40 rounded-lg border border-red-800/60">
              <p className="text-red-200 font-semibold mb-4">
                ⚠️ Critical Warning: This operational payload cannot be undone.
                Are you sure?
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={handleDeleteAccount}
                  loading={deleting}
                  className="bg-red-600 hover:bg-red-700 text-white border-none"
                >
                  Yes, Delete My Account
                </Button>
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  disabled={deleting}
                  className="border-slate-600 text-slate-300"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
