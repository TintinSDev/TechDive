"use client";

import { useSavedJobs } from "@/app/lib/hooks";
import { JobCard } from "@/app/components/jobs/JobCard";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";

export default function SavedJobsPage() {
  const { saved, loading } = useSavedJobs();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Saved Jobs</h1>

      {loading ? (
        <LoadingSpinner />
      ) : saved.length ? (
        <div className="space-y-4">
          {saved.map((item) => (
            <JobCard key={item.job.id} job={item.job} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You haven&apos;t saved any jobs yet</p>
      )}
    </div>
  );
}
