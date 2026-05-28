"use client";

import { useUserProfile } from "@/app/lib/hooks";
import { COMMON_SKILLS, JOB_CATEGORIES } from "@/app/lib/constants";
import { Button } from "@/app/components/common/Button";
import { useState, useEffect, FormEvent } from "react";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";

export default function ProfilePage() {
  const { user, loading, updateProfile } = useUserProfile();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    skills: [] as string[],
    experience: "",
    preferredRole: [] as string[],
  });
  const [saving, setSaving] = useState(false);

  // Sync loaded user data into form state dynamically
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        location: user.location || "",
        skills: user.skills || [],
        experience: user.experience || "",
        preferredRole: (user as any).preferredRole || user.preferredRoles || [],
      });
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(formData as any);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto bg-gray-100 space-y-8">
      {/* Header Block aligned perfectly with the Tracker panel */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Profile Settings
        </h1>
        <p className="text-gray-600 mt-1 text-base">
          Manage your professional information and target preferences to power
          your job matching pipeline.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className=" bg-gray-400 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm bg-gradient-to-b from-white to-slate-50/30"
      >
        {/* Name Input */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-800">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
            placeholder="John Doe"
          />
        </div>

        {/* Bio Input */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-800">
            Professional Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            className="w-full text-gray-700 px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium resize-none"
            placeholder="Tell recruiters about your core experience, stacks, or tech achievements..."
          />
        </div>

        {/* Dynamic Two-Column Grid Setup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location Input */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
              placeholder="e.g. Manhattan, New York"
            />
          </div>

          {/* Experience Level Selector dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800">
              Experience Level
            </label>
            <div className="relative">
              <select
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="w-full appearance-none px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium cursor-pointer"
              >
                <option value="" className="text-slate-400">
                  Select level
                </option>
                <option value="entry-level">Entry Level</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid-Level</option>
                <option value="senior">Senior</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-100 my-2" />

        {/* Skills Tag Section */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-bold text-slate-800">
              Core Technical Skills
            </label>
            <p className="text-xs text-gray-500 mt-0.5">
              Select your primary programming methodologies.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 bg-slate-50/60 p-4 border border-slate-100 rounded-xl">
            {COMMON_SKILLS.map((skill) => {
              const isSelected = formData.skills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      skills: isSelected
                        ? formData.skills.filter((s) => s !== skill)
                        : [...formData.skills, skill],
                    });
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-150 ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-700 shadow-sm shadow-blue-500/10"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferred Target Roles Section */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-bold text-slate-800">
              Preferred Target Roles
            </label>
            <p className="text-xs text-gray-500 mt-0.5">
              Select job paths to customize your home dashboard matches.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 bg-slate-50/60 p-4 border border-slate-100 rounded-xl">
            {JOB_CATEGORIES.map((cat) => {
              const isSelected = formData.preferredRole.includes(cat.value);
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      preferredRole: isSelected
                        ? formData.preferredRole.filter((r) => r !== cat.value)
                        : [...formData.preferredRole, cat.value],
                    });
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-150 ${
                    isSelected
                      ? "bg-cyan-600 text-white border-cyan-700 shadow-sm shadow-cyan-500/10"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save CTA Trigger */}
        <div className="pt-2">
          <Button
            loading={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 py-3 text-white text-sm font-bold shadow-md shadow-blue-500/10 transition-all rounded-lg"
          >
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
