"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/lib/hooks";
import { api } from "@/app/lib/api";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  companyLogo?: string | null;
  jobLogo?: string | null; // 🚀 Added fallback type parameter for joined API fields
  status: "APPLIED" | "INTERVIEWING" | "REJECTED" | "ACCEPTED";
  appliedAt: string;
  notes?: string;
}

export default function ApplicationsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<string>("all");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await api.getApplications();
        setApplications(response.applications || []);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchApplications();
    }
  }, [user]);

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      await api.request(`/applications/${applicationId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });

      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId
            ? { ...app, status: newStatus.toUpperCase() as any }
            : app
        )
      );
    } catch (err: any) {
      alert("Failed to update status: " + (err.message || "Unknown error"));
    }
  };

  const filtered = applications.filter(
    (app) => filter === "all" || app.status === filter
  );

  // High-contrast status mapping badges for gray-300 background configurations
  const statusConfig = {
    APPLIED: { bg: "bg-blue-600 text-white border-blue-700", dot: "bg-white" },
    INTERVIEWING: { bg: "bg-amber-600 text-white border-amber-700", dot: "bg-white" },
    ACCEPTED: { bg: "bg-emerald-600 text-white border-emerald-700", dot: "bg-white" },
    REJECTED: { bg: "bg-rose-600 text-white border-rose-700", dot: "bg-white" },
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Job Applications Tracker</h1>
        <p className="text-gray-500 mt-1 text-base">
          Manage, filter, and monitor your submitted tech job funnels in real time.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 rounded-xl text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* Filter Action Toggles */}
      <div className="flex gap-2 flex-wrap bg-slate-100 p-1.5 rounded-xl max-w-max border border-slate-200">
        {["all", "APPLIED", "INTERVIEWING", "ACCEPTED", "REJECTED"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 capitalize ${
              filter === status
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {status === "all" ? "All Apps" : status.toLowerCase()}
          </button>
        ))}
      </div>

      {/* Applications Grid Display */}
      {filtered.length ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {filtered.map((app) => {
            const config = statusConfig[app.status] || statusConfig.APPLIED;
            const companyInitial = app.company ? app.company.charAt(0).toUpperCase() : "J";
            
            // 🚀 Defensive Logo Resolution: Check both properties returned by database transformations
            const visualLogoTarget = app.companyLogo || app.jobLogo;

            return (
              <div
                key={app.id}
                className="group bg-gray-300 border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all duration-200 flex flex-col justify-between relative bg-gradient-to-b from-white to-slate-50/30 rounded-lg shadow-lg border-l-4 border-l-blue-600"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    {/* Logo Container Box */}
                    <div className="w-12 h-12 rounded-lg bg-white border border-slate-400/40 flex items-center justify-center text-blue-600 font-bold text-lg shrink-0 overflow-hidden shadow-sm">
                      {visualLogoTarget ? (
                        <img
                          src={visualLogoTarget}
                          alt={app.company}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-slate-700">{companyInitial}</span>
                      )}
                    </div>

                    {/* Selector Dropdown Container */}
                    <div className="relative">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className="appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold uppercase border border-slate-400/60 bg-white text-slate-800 shadow-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all"
                      >
                        <option value="APPLIED">Applied</option>
                        <option value="INTERVIEWING">Interviewing</option>
                        <option value="ACCEPTED">Accepted</option>
                        <option value="REJECTED">Rejected</option>
                      </select>
                      <div className="absolute inset-y-0 right-2 flex items-center pr-0.5 pointer-events-none text-slate-500">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Information block with clean high-contrast text shades */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-lg tracking-tight leading-snug">
                      {app.jobTitle}
                    </h3>
                    <p className="text-sm font-bold text-slate-700">
                      {app.company}
                    </p>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="mt-5 pt-4 border-t border-slate-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md border ${config.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                      {app.status.toLowerCase()}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      Applied {new Date(app.appliedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {app.notes && (
                  <div className="mt-4 p-3 bg-white/60 rounded-lg border border-slate-400/20 text-xs font-medium text-slate-800 leading-relaxed">
                    <strong className="text-slate-900 block mb-0.5 font-bold">Progress Notes:</strong>
                    {app.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm max-w-xl mx-auto mt-6">
          <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-3 text-xl">
            📂
          </div>
          <p className="text-slate-700 font-bold text-lg">No application files matching this filter</p>
        </div>
      )}
    </div>
  );
}