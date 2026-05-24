"use client";

import { useAuth } from "@/app/lib/hooks";
import { Button } from "@/app/components/common/Button";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user, logout } = useAuth();
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

  return (
    <div className="max-w-2xl bg-cyan-900 rounded-lg shadow-lg p-8 mx-auto">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      {/* Account Info */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Account Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="text-gray-900 mt-1">{user?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Member Since
            </label>
            <p className="text-gray-900 mt-1">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Info */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Subscription
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Plan
            </label>
            <p className="text-gray-900 mt-1 capitalize font-semibold">
              {user?.subscription?.plan || "Free"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <p className="text-gray-900 mt-1 capitalize">
              {user?.subscription?.status || "Active"}
            </p>
          </div>
          {user?.subscription?.currentPeriodEnd && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Renews On
              </label>
              <p className="text-gray-900 mt-1">
                {new Date(
                  user.subscription.currentPeriodEnd,
                ).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-red-900 mb-4">Danger Zone</h2>

        <div className="space-y-4">
          {/* Logout */}
          <div className="flex justify-between items-center pb-4 border-b">
            <div>
              <h3 className="font-semibold text-gray-900">Logout</h3>
              <p className="text-gray-600 text-sm">Sign out from all devices</p>
            </div>
            <Button onClick={logout} variant="outline" size="sm">
              Logout
            </Button>
          </div>

          {/* Delete Account */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-red-900">Delete Account</h3>
              <p className="text-red-700 text-sm">
                Permanently delete your account and all data
              </p>
            </div>
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              variant="outline"
              size="sm"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Delete
            </Button>
          </div>

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <div className="mt-4 p-4 bg-red-100 rounded-lg border border-red-300">
              <p className="text-red-900 font-semibold mb-4">
                Are you sure? This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={handleDeleteAccount}
                  loading={deleting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Yes, Delete My Account
                </Button>
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  disabled={deleting}
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
