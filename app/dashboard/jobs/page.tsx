"use client";

import { useState } from "react";
import { useJobs } from "@/app/lib/hooks";
import { JobFilter } from "@/app/components/jobs/JobFilter";
import { JobCard } from "@/app/components/jobs/JobCard";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";

export default function JobsPage() {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const { data, loading, error } = useJobs({ ...filters, page, limit: 20 });

  return (
    <div className="min-h-screen bg-cyan-45 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl text-gray-700 font-bold mb-8">
          Remote Tech Jobs
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <JobFilter onFilterChange={setFilters} />
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <LoadingSpinner />
            ) : data?.jobs.length ? (
              <>
                <div className="flex flex-col space-y-6">
                  {data.jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 ml-60 flex justify-center gap-2">
                  {Array.from(
                    { length: data.pagination.pages },
                    (_, i) => i + 1,
                  ).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-4 py-2 rounded-lg ${
                        page === pageNum
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">No jobs found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
