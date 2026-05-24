"use client";

import { useAuth, useTrendingJobs, useRecommendations } from "@/app/lib/hooks";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";
import { JobCard } from "@/app/components/jobs/JobCard";

export default function DashboardPage() {
  const { user } = useAuth();
  const { jobs: trending, loading: trendingLoading } = useTrendingJobs(5);
  const { data: recommendations, loading: recsLoading } = useRecommendations(
    1,
    5,
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome back, {user?.name}! 👋
      </h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Subscription</p>
          <p className="text-2xl text-gray-400 font-bold mt-2 capitalize">
            {user?.subscription?.plan || "Free"}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-900">Jobs Applied</p>
          <p className="text-2xl text-gray-600 font-bold mt-2">-</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-900">Jobs Saved</p>
          <p className="text-2xl text-gray-600 font-bold mt-2">-</p>
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
