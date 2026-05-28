"use client";

import { useEmailPreferences } from "@/app/lib/hooks";
import { Button } from "@/app/components/common/Button";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";
import { useState, useEffect, FormEvent } from "react";

export default function PreferencesPage() {
  const { preferences, loading, updatePreferences } = useEmailPreferences();

  // 🎯 Track all your new schema fields in local React state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [frequency, setFrequency] = useState("daily");
  const [newJobMatches, setNewJobMatches] = useState(true);
  const [appUpdates, setAppUpdates] = useState(true);
  const [platformNews, setPlatformNews] = useState(false);

  const [saving, setSaving] = useState(false);

  // 🔄 Load the user's existing settings from your database into the form
  useEffect(() => {
    if (preferences) {
      setEmailNotifications(preferences.emailNotifications ?? true);
      setFrequency(preferences.notificationFrequency ?? "daily");
      setNewJobMatches(preferences.newJobMatches ?? true);
      setAppUpdates(preferences.jobApplicationUpdates ?? true);
      setPlatformNews(preferences.platformNewsAndTips ?? false);
    }
  }, [preferences]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // 🌍 Automatically detect their timezone (e.g., "Africa/Nairobi", "America/New_York")
    const detectedTimezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

    // 🚀 Send EVERYTHING to your backend database handler
    await updatePreferences({
      emailNotifications,
      notificationFrequency: frequency,
      newJobMatches,
      jobApplicationUpdates: appUpdates,
      platformNewsAndTips: platformNews,
      timezone: detectedTimezone,
    });

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-2xl bg-gray-900 border border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 mx-auto backdrop-blur-sm">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Email Preferences
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Configure how and when TechDive reaches your notification mailboxes
          worldwide.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Master Toggle */}
        <div className="bg-slate-800/30 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">
              Email Notifications
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">
              Receive job alerts and updates via email
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-slate-900 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>

        {/* Granular Settings Wrapper — dims out smoothly if master notifications are off */}
        <div
          className={`space-y-6 transition-all duration-200 ${emailNotifications ? "opacity-100 pointer-events-auto" : "opacity-40 pointer-events-none"}`}
        >
          {/* Notification Frequency */}
          <div className="bg-slate-800/30 border border-slate-800 p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
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
                  className="flex items-center cursor-pointer select-none text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  <input
                    type="radio"
                    name="frequency"
                    value={option.value}
                    checked={frequency === option.value}
                    disabled={!emailNotifications}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-4 h-4 text-blue-500 bg-slate-900 border-slate-700 focus:ring-0"
                  />
                  <span className="ml-3">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Granular Channels */}
          <div className="bg-slate-800/30 border border-slate-800 p-5 rounded-xl space-y-3.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Granular Channels
            </h3>

            <label className="flex items-center cursor-pointer select-none text-sm font-medium text-slate-300 hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={newJobMatches}
                disabled={!emailNotifications}
                onChange={(e) => setNewJobMatches(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-0"
              />
              <span className="ml-3">New matching technical job openings</span>
            </label>

            <label className="flex items-center cursor-pointer select-none text-sm font-medium text-slate-300 hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={appUpdates}
                disabled={!emailNotifications}
                onChange={(e) => setAppUpdates(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-0"
              />
              <span className="ml-3">
                Job application status pipeline updates
              </span>
            </label>

            <label className="flex items-center cursor-pointer select-none text-sm font-medium text-slate-300 hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={platformNews}
                disabled={!emailNotifications}
                onChange={(e) => setPlatformNews(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-0"
              />
              <span className="ml-3">
                Platform ecosystem news and technical features tips
              </span>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          loading={saving}
          className="w-full text-sm font-bold py-3"
        >
          Save Preferences Configuration
        </Button>
      </form>
    </div>
  );
}
