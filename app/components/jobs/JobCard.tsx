"use client";

import { useState } from "react";
import Link from "next/link"; // 🚀 Imported Link for routing navigation

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    companyLogo?: string | null;
    type: string;
    location: string | null;
    salary?: number | null;
    salaryMax?: number | null;
    currency?: string;
  };
  isSaved?: boolean;
  onSave?: (jobId: string) => void;
}

export function JobCard({ job, onSave }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const companyInitial = job.company
    ? job.company.charAt(0).toUpperCase()
    : "J";

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents Link from triggering
    e.stopPropagation(); // 🎯 CRITICAL: Stops the click from bubbling up to the card route link
    setIsSaved(!isSaved);
    if (onSave) {
      onSave(job.id);
    }
  };

  return (
    // 🚀 Wrapped the entire card in a Link pointing to your details route
    <Link
      href={`/dashboard/jobs/${job.id}`}
      className="group bg-gray-300 border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between relative bg-gradient-to-b from-white to-slate-50/30 cursor-pointer block"
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-3">
          {/* Logo Container */}
          <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shrink-0 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{companyInitial}</span>
            )}
          </div>

          {/* Interactive Heart Toggle Button */}
          <button
            onClick={handleBookmarkClick} // 🎯 Handled via stopPropagation interceptor
            className="text-slate-400 hover:text-red-500 p-1.5 rounded-full hover:bg-slate-100/80 transition-colors z-10 relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isSaved ? "currentColor" : "none"}
              stroke="currentColor"
              className={`w-5 h-5 ${isSaved ? "text-red-500" : ""}`}
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>

        {/* Title and Company Text */}
        <div className="space-y-1">
          <h3 className="font-bold text-slate-800 text-base tracking-tight leading-snug group-hover:text-blue-600 transition-colors line-clamp-1">
            {job.title}
          </h3>
          <p className="text-sm font-medium text-slate-500 line-clamp-1">
            {job.company}
          </p>
        </div>
      </div>

      {/* Structural Data Badges */}
      <div className="mt-5 pt-4 border-t border-slate-100/80 flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100 capitalize">
          💼 {job.type || "Full-time"}
        </span>
        <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
          🌍 {job.location || "Remote"}
        </span>
        {job.salary && (
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-100">
            💰 ${job.salary.toLocaleString()}
            {job.salaryMax ? ` - $${job.salaryMax.toLocaleString()}` : ""}
          </span>
        )}
      </div>
    </Link>
  );
}
