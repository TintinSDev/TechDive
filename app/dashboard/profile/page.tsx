"use client";

import { useUserProfile } from "@/app/lib/hooks";
import { COMMON_SKILLS, JOB_CATEGORIES } from "@/app/lib/constants";
import { Button } from "@/app/components/common/Button";
import { useState, FormEvent } from "react";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";

export default function ProfilePage() {
  const { user, loading, updateProfile } = useUserProfile();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
    skills: user?.skills || [],
    experience: user?.experience || "",
    preferredRoles: user?.preferredRoles || [],
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile(formData);
    setSaving(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl bg-cyan-900 rounded-lg shadow-lg p-8 mx-auto">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg shadow">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Experience Level
          </label>
          <select
            value={formData.experience}
            onChange={(e) =>
              setFormData({ ...formData, experience: e.target.value })
            }
            className="w-full px-4 py-2 text-cyan-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select level</option>
            <option value="entry-level">Entry Level</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-Level</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium mb-2">Skills</label>
          <div className="flex flex-wrap gap-2">
            {COMMON_SKILLS.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => {
                  if (formData.skills.includes(skill)) {
                    setFormData({
                      ...formData,
                      skills: formData.skills.filter((s) => s !== skill),
                    });
                  } else {
                    setFormData({
                      ...formData,
                      skills: [...formData.skills, skill],
                    });
                  }
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  formData.skills.includes(skill)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Roles */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Preferred Roles
          </label>
          <div className="flex flex-wrap gap-2">
            {JOB_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => {
                  if (formData.preferredRoles.includes(cat.value)) {
                    setFormData({
                      ...formData,
                      preferredRoles: formData.preferredRoles.filter(
                        (r) => r !== cat.value,
                      ),
                    });
                  } else {
                    setFormData({
                      ...formData,
                      preferredRoles: [...formData.preferredRoles, cat.value],
                    });
                  }
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  formData.preferredRoles.includes(cat.value)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <Button loading={saving} className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
