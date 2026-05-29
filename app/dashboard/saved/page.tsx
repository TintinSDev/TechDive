"use client";

import { useSavedJobs } from "@/app/lib/hooks";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";
import Link from "next/link";

export default function SavedJobsPage() {
  const { saved, loading, unsaveJob } = useSavedJobs(); // Assuming unsaveJob or unsave exists in hook

  const handleUnsave = async (e: React.MouseEvent, jobId: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (typeof unsaveJob === "function") {
        await unsaveJob(jobId);
      } else {
        // Fallback or custom alert if needed until hook supports state removal
        alert("Action hook missing. Wire up unsave API endpoint.");
      }
    } catch (err: any) {
      alert("Failed to remove job: " + (err.message || "Unknown error"));
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      {/* Dynamic Header Copy matching Application Tracker metrics */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
        <p className="text-gray-500 mt-1 text-base">
          Review, track, and monitor your curated technical positions
          collection.
        </p>
      </div>

      {/* Synchronized Twin Columns Grid Display Layout */}
      {saved.length ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {saved.map((item) => {
            const { job, savedAt, id: savedId } = item;
            const companyInitial = job.company
              ? job.company.charAt(0).toUpperCase()
              : "J";
            const visualLogoTarget = job.companyLogo || null;

            return (
              <div
                key={savedId || job.id}
                className="group bg-gray-300 border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between relative bg-gradient-to-b from-white to-slate-50/30 rounded-lg shadow-lg border-l-4 border-l-blue-600"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    {/* Synchronized Logo Container Box Layout */}
                    <div className="w-12 h-12 rounded-lg bg-white border border-slate-400/40 flex items-center justify-center text-blue-600 font-bold text-lg shrink-0 overflow-hidden shadow-sm">
                      {visualLogoTarget ? (
                        <img
                          src={visualLogoTarget}
                          alt={job.company}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-slate-700">{companyInitial}</span>
                      )}
                    </div>

                    {/* Quick Unsave Text Link Trigger Button */}
                    <button
                      onClick={(e) => handleUnsave(e, job.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase border border-slate-400/60 bg-white text-rose-600 shadow-sm hover:bg-rose-50 hover:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20 cursor-pointer transition-all duration-150"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Synchronized Text Hierarchy Content */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-lg tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm font-bold text-slate-700">
                      {job.company}
                    </p>
                  </div>
                </div>

                {/* Footer Component Wrapper */}
                <div className="mt-5 pt-4 border-t border-slate-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {job.location && (
                      <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 capitalize">
                        📍 {job.location}
                      </span>
                    )}
                    {job.type && (
                      <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-700 capitalize">
                        💼 {job.type}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    {savedAt && (
                      <span className="text-xs font-bold text-slate-500">
                        Saved {new Date(savedAt).toLocaleDateString()}
                      </span>
                    )}

                    <Link
                      href={`/dashboard/jobs/${job.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      View Details
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty Dashboard State Template Alignment */
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm max-w-xl mx-auto mt-6">
          <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-3 text-xl">
            🔖
          </div>
          <p className="text-slate-700 font-bold text-lg">
            You haven&apos;t saved any jobs yet
          </p>
          <Link
            href="/dashboard/jobs"
            className="inline-block mt-4 text-sm font-bold text-blue-600 hover:underline"
          >
            Explore available roles →
          </Link>
        </div>
      )}
    </div>
  );
}
