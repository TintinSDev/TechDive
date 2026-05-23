"use client";

import { useState } from "react";
import {
  JOB_CATEGORIES,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
} from "@/app/lib/constants";
import { Button } from "@/app/components/common/Button";

interface JobFilters {
  category?: string;
  type?: string;
  experience?: string;
  search?: string;
  minSalary?: number;
  maxSalary?: number;
}

interface JobFilterProps {
  onFilterChange: (filters: JobFilters) => void;
}

export const JobFilter: React.FC<JobFilterProps> = ({ onFilterChange }) => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [experience, setExperience] = useState("");
  const [search, setSearch] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const handleApplyFilters = () => {
    onFilterChange({
      category: category || undefined,
      type: type || undefined,
      experience: experience || undefined,
      search: search || undefined,
      minSalary: minSalary ? parseInt(minSalary) : undefined,
      maxSalary: maxSalary ? parseInt(maxSalary) : undefined,
    });
  };

  const handleReset = () => {
    setCategory("");
    setType("");
    setExperience("");
    setSearch("");
    setMinSalary("");
    setMaxSalary("");
    onFilterChange({});
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-20">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* Search */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search
        </label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Job title, company..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Experience
        </label>
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Salary Range (USD)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            placeholder="Min"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            placeholder="Max"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button onClick={handleApplyFilters} className="flex-1">
          Apply
        </Button>
        <Button onClick={handleReset} variant="secondary" className="flex-1">
          Reset
        </Button>
      </div>
    </div>
  );
};
