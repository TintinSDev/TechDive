"use client";

import { Job } from "@/app/lib/types";
import { JobCard } from "./JobCard";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";

interface JobListProps {
  jobs: Job[];
  loading?: boolean;
  error?: string | null;
  onSaveJob?: (jobId: string) => void;
  savedJobIds?: string[];
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  loading = false,
  error = null,
  onSaveJob,
  savedJobIds = [],
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
        <p className="font-semibold">Error loading jobs</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-gray-500 text-lg">No jobs found</p>
        <p className="text-gray-400 text-sm">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onSave={onSaveJob}
          isSaved={savedJobIds.includes(job.id)}
        />
      ))}
    </div>
  );
};
