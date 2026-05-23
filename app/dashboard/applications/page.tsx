"use client";

import { useState } from "react";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";

// Mock data - in real app, fetch from API
const applications = [
  {
    id: "1",
    jobTitle: "Senior React Developer",
    company: "Netflix",
    status: "interviewing" as const,
    appliedAt: "2024-05-20",
    notes: "Had first technical interview",
  },
  {
    id: "2",
    jobTitle: "Backend Engineer",
    company: "Stripe",
    status: "applied" as const,
    appliedAt: "2024-05-18",
    notes: "",
  },
  {
    id: "3",
    jobTitle: "Full-Stack Developer",
    company: "Figma",
    status: "accepted" as const,
    appliedAt: "2024-05-15",
    notes: "Offer accepted!",
  },
];

export default function ApplicationsPage() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = applications.filter(
    (app) => filter === "all" || app.status === filter,
  );

  const statusColors = {
    applied: "bg-blue-100 text-blue-800",
    interviewing: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
    accepted: "bg-green-100 text-green-800",
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Job Applications</h1>

      {/* Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {["all", "applied", "interviewing", "accepted", "rejected"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize transition ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status}
            </button>
          ),
        )}
      </div>

      {/* Applications List */}
      {filtered.length ? (
        <div className="space-y-4">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {app.jobTitle}
                  </h3>
                  <p className="text-gray-600">{app.company}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${statusColors[app.status]}`}
                >
                  {app.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-2">
                Applied on {new Date(app.appliedAt).toLocaleDateString()}
              </p>

              {app.notes && (
                <p className="text-gray-700 bg-gray-50 p-3 rounded">
                  {app.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No applications yet</p>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
