// "use client";

// import { useAuth, useTrendingJobs, useRecommendations } from "@/app/lib/hooks";
// import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";
// import { JobCard } from "@/app/components/jobs/JobCard";

// export default function DashboardPage() {
//   const { user } = useAuth();
//   const { jobs: trending, loading: trendingLoading } = useTrendingJobs(5);
//   const { data: recommendations, loading: recsLoading } = useRecommendations(
//     1,
//     5,
//   );

//   return (
//     <div className="space-y-8">
//       <h1 className="text-3xl font-bold">Welcome back, {user?.name}! 👋</h1>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <p className="text-gray-600">Subscription</p>
//           <p className="text-2xl font-bold mt-2 capitalize">
//             {user?.subscription?.plan || "Free"}
//           </p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow">
//           <p className="text-gray-600">Jobs Applied</p>
//           <p className="text-2xl font-bold mt-2">-</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow">
//           <p className="text-gray-600">Jobs Saved</p>
//           <p className="text-2xl font-bold mt-2">-</p>
//         </div>
//       </div>

//       {/* Recommended Jobs */}
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
//         {recsLoading ? (
//           <LoadingSpinner />
//         ) : recommendations?.jobs.length ? (
//           <div className="space-y-4">
//             {recommendations.jobs.map((job) => (
//               <JobCard key={job.id} job={job} />
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">
//             No recommendations yet. Complete your profile!
//           </p>
//         )}
//       </div>

//       {/* Trending Jobs */}
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Trending This Week</h2>
//         {trendingLoading ? (
//           <LoadingSpinner />
//         ) : trending.length ? (
//           <div className="space-y-4">
//             {trending.map((job) => (
//               <JobCard key={job.id} job={job} />
//             ))}
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// }
"use client";

import { useAuth } from "@/app/lib/hooks";
import { Button } from "@/app/components/common/Button";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      // In real app, call API to delete account
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await logout();
      router.push("/");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      {/* Account Info */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="text-gray-900 mt-1">{user?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Member Since
            </label>
            <p className="text-gray-900 mt-1">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Info */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Subscription</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Plan
            </label>
            <p className="text-gray-900 mt-1 capitalize font-semibold">
              {user?.subscription?.plan || "Free"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <p className="text-gray-900 mt-1 capitalize">
              {user?.subscription?.status || "Active"}
            </p>
          </div>
          {user?.subscription?.currentPeriodEnd && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Renews On
              </label>
              <p className="text-gray-900 mt-1">
                {new Date(
                  user.subscription.currentPeriodEnd,
                ).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-red-900 mb-4">Danger Zone</h2>

        <div className="space-y-4">
          {/* Logout */}
          <div className="flex justify-between items-center pb-4 border-b">
            <div>
              <h3 className="font-semibold text-gray-900">Logout</h3>
              <p className="text-gray-600 text-sm">Sign out from all devices</p>
            </div>
            <Button onClick={logout} variant="outline" size="sm">
              Logout
            </Button>
          </div>

          {/* Delete Account */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-red-900">Delete Account</h3>
              <p className="text-red-700 text-sm">
                Permanently delete your account and all data
              </p>
            </div>
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              variant="outline"
              size="sm"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Delete
            </Button>
          </div>

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <div className="mt-4 p-4 bg-red-100 rounded-lg border border-red-300">
              <p className="text-red-900 font-semibold mb-4">
                Are you sure? This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={handleDeleteAccount}
                  loading={deleting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Yes, Delete My Account
                </Button>
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  disabled={deleting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
