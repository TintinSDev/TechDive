"use client";

import {
  useAuth,
  useTrendingJobs,
  useRecommendations,
  useSavedJobs,
  useUserProfile,
} from "@/app/lib/hooks";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";
import { JobCard } from "@/app/components/jobs/JobCard";
import { api } from "@/app/lib/api";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { jobs: trending, loading: trendingLoading } = useTrendingJobs(5);
  const { data: recommendations, loading: recsLoading } = useRecommendations(
    1,
    5,
  );
  const { saved } = useSavedJobs(); // Pull real time arrays
  const [appliedCount, setAppliedCount] = useState(0);

useEffect(() => {
  if (!user) return;
  api.getApplications()
    .then((res) => {
      setAppliedCount(res.applications?.length || 0);
    })
    .catch((err) => {
      console.error("Error loading applied stats:", err);
      setAppliedCount(0);
    });
}, [user]);
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome back, {user?.name}! 👋
      </h1>
      <p className="text-gray-900 text-lg font-bold">
        Here is a quick look at your application status tracker.
      </p>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow">
          <p className="text-slate-400 text-sm font-medium">Subscription</p>
          <p className="text-2xl text-white font-bold mt-2 capitalize">
            {user?.subscription?.plan || "Free"}
          </p>
        </div>
        {/* Jobs Applied Stat Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow">
          <p className="text-slate-400 text-sm font-medium">Jobs Applied</p>
          <p className="text-3xl text-white font-bold mt-2">{appliedCount}</p>
        </div>

        {/* Jobs Saved Stat Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow">
          <p className="text-slate-400 text-sm font-medium">Jobs Saved</p>
          <p className="text-3xl text-white font-bold mt-2">
            {saved ? saved.length : 0}
          </p>
        </div>
      </div>

      {/* Recommended Jobs */}
      <div>
        <h2 className="text-2xl text-gray-900 font-bold mb-4">
          Recommended For You
        </h2>
        {recsLoading ? (
          <LoadingSpinner />
        ) : recommendations?.jobs.length ? (
          <div className="space-y-4">
            {recommendations.jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No recommendations yet. Complete your profile!
          </p>
        )}
      </div>

      {/* Trending Jobs */}
      <div>
        <h2 className="text-2xl text-gray-900 font-bold mb-4">
          Trending This Week
        </h2>
        {trendingLoading ? (
          <LoadingSpinner />
        ) : trending.length ? (
          <div className="space-y-4">
            {trending.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
