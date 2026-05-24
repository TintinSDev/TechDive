// "use client";

// import { useState } from "react";
// import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";

// // Mock data - in real app, fetch from API
// const applications = [
//   {
//     id: "1",
//     jobTitle: "Senior React Developer",
//     company: "Netflix",
//     status: "interviewing" as const,
//     appliedAt: "2024-05-20",
//     notes: "Had first technical interview",
//   },
//   {
//     id: "2",
//     jobTitle: "Backend Engineer",
//     company: "Stripe",
//     status: "applied" as const,
//     appliedAt: "2024-05-18",
//     notes: "",
//   },
//   {
//     id: "3",
//     jobTitle: "Full-Stack Developer",
//     company: "Figma",
//     status: "accepted" as const,
//     appliedAt: "2024-05-15",
//     notes: "Offer accepted!",
//   },
// ];

// export default function ApplicationsPage() {
//   const [filter, setFilter] = useState<string>("all");

//   const filtered = applications.filter(
//     (app) => filter === "all" || app.status === filter,
//   );

//   const statusColors = {
//     applied: "bg-blue-100 text-blue-800",
//     interviewing: "bg-yellow-100 text-yellow-800",
//     rejected: "bg-red-100 text-red-800",
//     accepted: "bg-green-100 text-green-800",
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-8 text-gray-700">
//         Job Applications
//       </h1>

//       {/* Filter */}
//       <div className="mb-6 flex gap-2 flex-wrap">
//         {["all", "applied", "interviewing", "accepted", "rejected"].map(
//           (status) => (
//             <button
//               key={status}
//               onClick={() => setFilter(status)}
//               className={`px-4 py-2 rounded-lg capitalize transition ${
//                 filter === status
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               {status}
//             </button>
//           ),
//         )}
//       </div>

//       {/* Applications List */}
//       {filtered.length ? (
//         <div className="space-y-4">
//           {filtered.map((app) => (
//             <div
//               key={app.id}
//               className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     {app.jobTitle}
//                   </h3>
//                   <p className="text-gray-600">{app.company}</p>
//                 </div>
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${statusColors[app.status]}`}
//                 >
//                   {app.status}
//                 </span>
//               </div>

//               <p className="text-sm text-gray-500 mb-2">
//                 Applied on {new Date(app.appliedAt).toLocaleDateString()}
//               </p>

//               {app.notes && (
//                 <p className="text-gray-700 bg-gray-50 p-3 rounded">
//                   {app.notes}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No applications yet</p>
//           <LoadingSpinner />
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/lib/hooks";
import { api } from "@/app/lib/api";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  status: "APPLIED" | "interviewing" | "rejected" | "accepted";
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
        const response = await api.request("/applications");
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
// ... your useEffect hook is right above this

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      // 1. Tell the backend to update it in PostgreSQL
      await api.request(`/applications/${applicationId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });

      // 2. Optimistically update the UI state immediately so the user sees the change
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

  // const filtered = applications.filter(
  //   (app) => filter === "all" || app.status.toLowerCase() === filter,
  // );
  const filtered = applications.filter(
    (app) => filter === "all" || app.status === filter,
  );

  const statusColors = {
    applied: "bg-blue-100 text-blue-800",
    interviewing: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
    accepted: "bg-green-100 text-green-800",
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Job Applications
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {/* Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {["all", "APPLIED", "INTERVIEWING", "ACCEPTED", "REJECTED"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize transition ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
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
              className="bg-slate-800/50 bg-cyan-400 border text-slate-300 border-slate-700 p-6 rounded-lg border-l-4 border-l-blue-600"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg text-white font-semibold">
                    {app.jobTitle}
                  </h3>
                  <p className="text-slate-400 text-white">
                    {app.company}
                  </p>
                </div>
        <select
  value={app.status}
  onChange={(e) => handleStatusChange(app.id, e.target.value)}
  className="px-3 py-1.5 rounded-lg text-sm font-semibold capitalize border border-slate-600 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
>
  {/* Change the values below to uppercase */}
  <option value="APPLIED" className="bg-slate-800 text-blue-400">Applied</option>
  <option value="INTERVIEWING" className="bg-slate-800 text-yellow-400">Interviewing</option>
  <option value="ACCEPTED" className="bg-slate-800 text-green-400">Accepted</option>
  <option value="REJECTED" className="bg-slate-800 text-red-400">Rejected</option>
</select>
              </div>

              <p className="text-sm text-white text-slate-400 mb-2">
                Applied on {new Date(app.appliedAt).toLocaleDateString()}
              </p>

              {app.notes && (
                <p className="text-slate-300 text-gray-900 bg-slate-900/50 p-3 rounded">
                  {app.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No applications yet</p>
          <p className="text-slate-500">
            Start applying to jobs to see them here
          </p>
        </div>
      )}
    </div>
  );
}
