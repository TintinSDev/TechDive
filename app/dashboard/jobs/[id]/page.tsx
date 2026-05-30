"use client";

import { useParams, useRouter } from "next/navigation";
import { useJob, useSavedJobs } from "@/app/lib/hooks";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";
import { Button } from "@/app/components/common/Button";
import { useState } from "react";
import { api } from "@/app/lib/api";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { job, loading, error } = useJob(id);
  const { isJobSaved, saveJob, unsaveJob } = useSavedJobs();
  const [saving, setSaving] = useState(false);
  const [applying, setApplying] = useState(false);

  if (loading) return <LoadingSpinner />;
  if (error || !job) return <p className="text-red-600">Job not found</p>;

  const isSaved = isJobSaved(job.id);
  console.log("JOB ID:", params.id);
  const handleSaveToggle = async () => {
    setSaving(true);
    if (isSaved) {
      await unsaveJob(job.id);
    } else {
      await saveJob(job.id);
    }
    setSaving(false);
  };

  const handleApply = async (
    e: React.MouseEvent,
    jobId: string,
    externalJobUrl: string,
  ) => {
    e.preventDefault();
    setApplying(true); // Enable loader visualization state

    try {
      // 1. Use your dedicated ApiClient method to verify and track the application
      await api.createApplication(jobId);

      // 2. SUCCESS: Safe redirect opens ONLY if the tierGuard passes the action
      window.open(externalJobUrl, "_blank", "noopener,noreferrer");
    } catch (err: any) {
      // 3. Since ApiClient throws error.error as the root text message string:
      const errMsg = err.message || "Plan limit reached.";
      const lowerMsg = errMsg.toLowerCase();

      // 🎯 Catch the tier limitation message text passed directly via your handler
      if (
        lowerMsg.includes("limited to") ||
        lowerMsg.includes("tier limit") ||
        lowerMsg.includes("upgrade")
      ) {
        alert(`⚠️ ${errMsg}`);
        router.push("/dashboard/pricing");
        return;
      }

      // Standard alternative network error alerts
      alert("Could not process application tracking: " + errMsg);
    } finally {
      setApplying(false); // Reset button UI state
    }
  };
  console.log("JOB PAGE LOADED");
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-4xl text-gray-900 font-bold mb-2">
                {job.title}
              </h1>
              <p className="text-2xl text-gray-600">{job.company}</p>
            </div>
            <Button
              onClick={handleSaveToggle}
              disabled={saving}
              variant={isSaved ? "primary" : "outline"}
            >
              {isSaved ? "❤️ Saved" : "🤍 Save"}
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-gray-600">
            <span>📍 {job.location || "Remote"}</span>
            <span>🕐 {job.type}</span>
            <span>⏰ {job.experience}</span>
            {job.salary && (
              <span className="text-green-600 font-semibold">
                💰 ${job.salary.toLocaleString()}/year
              </span>
            )}
          </div>

          <div className="mt-8 text-gray-900">
            <h2 className="text-2xl text-gray-900 font-bold mb-4">
              About the Role
            </h2>
            <div
              className="prose max-w-none text-gray-900"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div className="mt-8 text-gray-900">
              <h2 className="text-2xl text-gray-900 font-bold mb-4">
                Requirements
              </h2>
              <ul className="list-disc list-inside space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="text-gray-900">
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8">
            {job.applyUrl ? (
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleApply(e, job.id, job.applyUrl || "")}
              >
                <Button
                  disabled={applying}
                  className="w-100 ml-45 bg-gray-200 shadow-sm text-black border rounded  border-gray-900 hover:bg-green-600 hover:text-white"
                >
                  {applying ? "Connecting to application page..." : "Apply Now"}
                </Button>
              </a>
            ) : (
              <Button className="w-full" disabled>
                No Application Link Available
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
