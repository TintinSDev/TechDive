"use client";

import {
  useAuth,
  useTrendingJobs,
  useRecommendations,
  useSavedJobs,
} from "@/app/lib/hooks";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";
import { JobCard } from "@/app/components/jobs/JobCard";
import { api } from "@/app/lib/api";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();

  // 🚀 Safe binding hook assignments handling data response structures smoothly
  const trendingResponse = useTrendingJobs(5);
  const recommendationsResponse = useRecommendations(1, 5);
  const { saved } = useSavedJobs();
  const [appliedCount, setAppliedCount] = useState(0);

  // Normalize data safely regardless of if your hook extracts .jobs or handles array transformations natively
  const trendingJobs = Array.isArray(trendingResponse)
    ? trendingResponse
    : trendingResponse?.jobs || [];

  const recommendedJobs = recommendationsResponse?.data?.jobs || [];
  const recsLoading = recommendationsResponse?.loading;
  const trendingLoading = trendingResponse?.loading;

  useEffect(() => {
    if (!user) return;
    api
      .getApplications()
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || "Developer"}! 👋
        </h1>
        <p className="text-gray-500 mt-1 text-base">
          Here is a quick look at your application status tracker.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
          <p className="text-slate-400 text-sm font-semibold tracking-wider uppercase">
            Subscription
          </p>
          <p className="text-2xl text-white font-bold mt-2 capitalize">
            {user?.subscription?.plan || "Free"}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
          <p className="text-slate-400 text-sm font-semibold tracking-wider uppercase">
            Jobs Applied
          </p>
          <p className="text-3xl text-white font-bold mt-2">{appliedCount}</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
          <p className="text-slate-400 text-sm font-semibold tracking-wider uppercase">
            Jobs Saved
          </p>
          <p className="text-3xl text-white font-bold mt-2">
            {saved ? saved.length : 0}
          </p>
        </div>
      </div>

      {/* Recommended Jobs Segment */}
      <div className="">
        <h2 className="text-2xl text-gray-900 font-bold mb-4 flex items-center gap-2">
          🎯 Recommended For You
        </h2>
        {recsLoading ? (
          <div className="py-6 ">
            <LoadingSpinner />
          </div>
        ) : recommendedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {recommendedJobs.map((job: any) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 shadow-sm">
            No customized recommendations yet. Drop your skills in your profile
            area to calculate match scores!
          </div>
        )}
      </div>

      {/* Trending Jobs Segment */}
      <div>
        <h2 className="text-2xl text-gray-900 font-bold mb-4 flex items-center gap-2">
          🔥 Trending This Week
        </h2>
        {trendingLoading ? (
          <div className="py-6">
            <LoadingSpinner />
          </div>
        ) : trendingJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {trendingJobs.map((job: any) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 shadow-sm">
            No trending listings calculated for this cycle yet.
          </div>
        )}
      </div>
    </div>
  );
}
