"use client";

import { useEmailPreferences } from "@/app/lib/hooks";
import { Button } from "@/app/components/common/Button";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";
import { useState, FormEvent } from "react";

export default function PreferencesPage() {
  const { preferences, loading, updatePreferences } = useEmailPreferences();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [frequency, setFrequency] = useState("daily");
  const [saving, setSaving] = useState(false);

  // Update form when preferences load
  if (preferences && !loading) {
    if (emailNotifications !== preferences.emailNotifications) {
      setEmailNotifications(preferences.emailNotifications);
    }
    if (frequency !== preferences.notificationFrequency) {
      setFrequency(preferences.notificationFrequency);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updatePreferences({
      emailNotifications,
      notificationFrequency: frequency,
    });
    setSaving(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Email Preferences</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow space-y-6"
      >
        {/* Email Notifications Toggle */}
        <div className="border-b pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">
                Email Notifications
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Receive job alerts and updates via email
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Notification Frequency */}
        {emailNotifications && (
          <div className="border-b pb-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Notification Frequency
            </h3>
            <div className="space-y-3">
              {[
                { value: "daily", label: "Daily - Get jobs every morning" },
                { value: "weekly", label: "Weekly - Digest on Mondays" },
                { value: "never", label: "Never - Turn off notifications" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    name="frequency"
                    value={option.value}
                    checked={frequency === option.value}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-3 text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Additional Options */}
        <div className="space-y-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-blue-600"
            />
            <span className="ml-3 text-gray-700">New job matches</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-blue-600"
            />
            <span className="ml-3 text-gray-700">Job application updates</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-blue-600"
            />
            <span className="ml-3 text-gray-700">Platform news and tips</span>
          </label>
        </div>

        <Button loading={saving} className="w-full">
          Save Preferences
        </Button>
      </form>
    </div>
  );
}
