"use client";

import { useState, useEffect } from "react";
import { useJobs } from "@/app/lib/hooks";
import { JobFilter } from "@/app/components/jobs/JobFilter";
import { JobCard } from "@/app/components/jobs/JobCard";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";

export default function JobsPage() {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  // 🚀 1. Debounce text input so it updates backend values 300ms after you stop typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: searchInput || undefined, // Syncs seamlessly with req.query.search
      }));
      setPage(1); // Drop index back to page 1 on new text filters
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  // 🚀 2. Send the single unified filter object directly to your backend custom hook
  const { data, loading, error } = useJobs({
    ...filters,
    page,
    limit: 10,
  });

  const handleResetAll = () => {
    setFilters({});
    setSearchInput("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl text-gray-800 font-bold mb-6 tracking-tight">
          Remote Tech Jobs
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Left Controlled Sidebar Refinement Filter Module */}
          <div className="lg:col-span-1">
            <JobFilter
              filters={filters}
              onFilterChange={(newFilters) => {
                // Keep the search parameter intact when picking dropdown categories
                setFilters({ ...newFilters, search: searchInput || undefined });
                setPage(1);
              }}
              onReset={handleResetAll}
            />
          </div>

          {/* Right Main Panel Display Feed */}
          <div className="lg:col-span-3 space-y-6">
            {/* 🔍 Dynamic Top-Level Active Text Input Bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <span className="text-gray-400 text-lg">🔍</span>
              <input
                type="text"
                placeholder="Search jobs by title, company name, or programming keywords..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent text-base"
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput("")}
                  className="text-gray-400 hover:text-gray-600 text-sm font-medium px-2"
                >
                  Clear
                </button>
              )}
            </div>

            {loading ? (
              <div className="py-12">
                <LoadingSpinner />
              </div>
            ) : data?.jobs?.length ? (
              <>
                {/* Clean 2-column rendering grid matrix matching your requirements layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                {/* Pagination Controls Footer section */}
                {data.pagination && data.pagination.pages > 1 && (
                  <div className="mt-8 flex justify-center items-center gap-2 pt-4 border-t border-gray-100">
                    {Array.from(
                      { length: data.pagination.pages },
                      (_, i) => i + 1,
                    ).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                          page === pageNum
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
                <div className="text-4xl mb-3">🕵️‍♂️</div>
                <p className="text-gray-600 font-semibold text-lg">
                  No matching results found
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Try modifying your query variables or clear filters entirely.
                </p>
                <button
                  onClick={handleResetAll}
                  className="mt-4 text-sm bg-blue-50 text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
