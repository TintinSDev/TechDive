"use client";

import {
  JOB_CATEGORIES,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
} from "@/app/lib/constants";

interface JobFilters {
  category?: string;
  type?: string;
  experience?: string;
  minSalary?: number;
  maxSalary?: number;
}

interface JobFilterProps {
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
  onReset: () => void;
}

export const JobFilter: React.FC<JobFilterProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  // Directly updates individual keys inside the unified parent object structure
  const updateFilterKey = (key: keyof JobFilters, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value || undefined, // Drop key completely if string is empty
    });
  };

  return (
    <div className="bg-gray-200 p-6 border border-gray-300 rounded-xl shadow-xl hover:shadow-md hover:border-blue-500 transition-all duration-200 sticky top-24 space-y-5">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-lg text-gray-900 font-bold">Refine Results</h3>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Category
        </label>
        <select
          value={filters.category || ""}
          onChange={(e) => updateFilterKey("category", e.target.value)}
          className="w-full px-3 py-2 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">All Categories</option>
          {JOB_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Type */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Job Type
        </label>
        <select
          value={filters.type || ""}
          onChange={(e) => updateFilterKey("type", e.target.value)}
          className="w-full px-3 py-2 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">All Types</option>
          {JOB_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Experience */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Experience Level
        </label>
        <select
          value={filters.experience || ""}
          onChange={(e) => updateFilterKey("experience", e.target.value)}
          className="w-full px-3 py-2 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">All Levels</option>
          {EXPERIENCE_LEVELS.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      {/* Salary Range */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Salary Range (USD / Year)
        </label>
        <div className="flex gap-2 text-gray-700">
          <input
            type="number"
            value={filters.minSalary || ""}
            onChange={(e) =>
              updateFilterKey(
                "minSalary",
                e.target.value ? parseInt(e.target.value) : "",
              )
            }
            placeholder="Min"
            className="w-1/2 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={filters.maxSalary || ""}
            onChange={(e) =>
              updateFilterKey(
                "maxSalary",
                e.target.value ? parseInt(e.target.value) : "",
              )
            }
            placeholder="Max"
            className="w-1/2 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
