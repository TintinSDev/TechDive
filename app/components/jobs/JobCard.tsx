"use client";

import Link from "next/link";
import { Job } from "@/app/lib/types";
import { useState } from "react";
import { api } from "@/app/lib/api";

interface JobCardProps {
  job: Job;
  onSave?: (jobId: string) => void;
  isSaved?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onSave,
  isSaved = false,
}) => {
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isSaved) {
        await api.unsaveJob(job.id);
      } else {
        await api.saveJob(job.id);
      }
      onSave?.(job.id);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Link href={`/job/${job.id}`}>
      <div className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
              {job.title}
            </h3>
            <p className="text-gray-600">{job.company}</p>
            <div className="flex gap-2 mt-2 text-sm text-gray-500">
              <span>{job.type}</span>
              <span>•</span>
              <span>{job.location || "Remote"}</span>
              {job.salary && (
                <>
                  <span>•</span>
                  <span className="text-green-600 font-semibold">
                    ${job.salary.toLocaleString()}
                  </span>
                </>
              )}
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-2xl hover:scale-110 transition"
          >
            {isSaved ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </Link>
  );
};
