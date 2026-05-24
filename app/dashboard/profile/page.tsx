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
    preferredRole: [] as string[], // Match schema.prisma exactly (singular role)
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
        preferredRole: user.preferredRole || [],
      });
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(formData);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl text-black font-bold">Profile Settings</h1>
        <p className="text-slate-400 mt-1 text-black">
          Manage your professional information and job preferences.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6 shadow-xl text-slate-200"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            placeholder="John Doe"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition resize-none"
            placeholder="Tell us about your background..."
          />
        </div>

        {/* Dynamic Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              placeholder="e.g. San Francisco, CA"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Experience Level
            </label>
            <select
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition cursor-pointer"
            >
              <option value="" className="text-slate-500">
                Select level
              </option>
              <option value="entry-level">Entry Level</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-Level</option>
              <option value="senior">Senior</option>
            </select>
          </div>
        </div>

        <hr className="border-slate-800 my-4" />

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Skills
          </label>
          <div className="flex flex-wrap gap-2 bg-slate-950 p-4 border border-slate-800 rounded-xl">
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isSelected
                      ? "bg-blue-600 text-white shadow"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferred Roles */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Preferred Roles
          </label>
          <div className="flex flex-wrap gap-2 bg-slate-950 p-4 border border-slate-800 rounded-xl">
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isSelected
                      ? "bg-cyan-600 text-white shadow"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <Button
          loading={saving}
          className="w-full bg-blue-600 hover:bg-blue-500 py-3 text-white font-medium shadow-lg transition"
        >
          Save Profile
        </Button>
      </form>
    </div>
  );
}
