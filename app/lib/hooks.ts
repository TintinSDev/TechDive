// app/lib/hooks.ts

"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "./api";
import { User, Job, SavedJob, JobsResponse } from "./types";

/**
 * Hook to manage authentication
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Read token from cookies
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("auth_token="))
          ?.split("=")[1];

        if (token) {
          const userData = await api.getMe();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = useCallback(async () => {
    document.cookie = "auth_token=; path=/; max-age=0";
    setUser(null);
    setIsAuthenticated(false);
    router.push("/");
  }, [router]);

  return {
    user,
    loading,
    isAuthenticated,
    logout,
  };
}

/**
 * Hook to fetch jobs with filtering
 */
export function useJobs(filters?: {
  page?: number;
  limit?: number;
  category?: string;
  type?: string;
  experience?: string;
  search?: string;
  minSalary?: number;
  maxSalary?: number;
}) {
  const [data, setData] = useState<JobsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await api.getJobs(filters);
        setData(response);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch jobs");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters?.page, filters?.limit, filters?.category, filters?.type]);

  return { data, loading, error };
}

/**
 * Hook to fetch single job
 */
export function useJob(id: string) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await api.getJobById(id);
        setJob(response);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch job");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  return { job, loading, error };
}

/**
 * Hook to manage saved jobs
 */
export function useSavedJobs() {
  const [saved, setSaved] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSavedJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.getSavedJobs();
      setSaved(response.saved);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch saved jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveJob = useCallback(async (jobId: string) => {
    try {
      const result = await api.saveJob(jobId);

      // 🔌 Push the result directly since it already is the SavedJob object
      setSaved((prev) => [...prev, result]);

      return true;
    } catch (err: any) {
      setError(err.message || "Failed to save job");
      return false;
    }
  }, []);

  const unsaveJob = useCallback(async (jobId: string) => {
    try {
      await api.unsaveJob(jobId);

      setSaved((prev) => prev.filter((s) => s.jobId !== jobId)); // ✅ FIXED

      return true;
    } catch (err: any) {
      setError(err.message || "Failed to unsave job");
      return false;
    }
  }, []);

  const isJobSaved = (jobId: string): boolean => {
    return saved.some((s) => s.jobId === jobId);
  };

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  return {
    saved,
    loading,
    error,
    saveJob,
    unsaveJob,
    isJobSaved,
    refetch: fetchSavedJobs,
  };
}

/**
 * Hook to fetch recommendations
 */
export function useRecommendations(page: number = 1, limit: number = 20) {
  const [data, setData] = useState<JobsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await api.getRecommendations(page, limit);
        setData(response);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [page, limit]);

  return { data, loading, error };
}

/**
 * Hook to fetch trending jobs
 */
export function useTrendingJobs(limit: number = 20) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const response = await api.getTrendingJobs(limit);
        setJobs(response.jobs);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch trending jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [limit]);

  return { jobs, loading, error };
}

/**
 * Hook to manage user profile
 */
export function useUserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const userData = await api.getMe();
      setUser(userData);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    try {
      setLoading(true);
      const updated = await api.updateProfile(data);
      setUser(updated);
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    user,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile,
  };
}

/**
 * Hook to manage email preferences
 */
export function useEmailPreferences() {
  const [preferences, setPreferences] = useState<{
    emailNotifications: boolean;
    notificationFrequency: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPreferences = useCallback(async () => {
    try {
      setLoading(true);
      const prefs = await api.getEmailPreferences();
      setPreferences({
        emailNotifications: prefs.emailNotifications,
        notificationFrequency: prefs.notificationFrequency,
      });
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch preferences");
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePreferences = useCallback(
    async (data: {
      emailNotifications?: boolean;
      notificationFrequency?: string;
    }) => {
      try {
        setLoading(true);
        const updated = await api.updateEmailPreferences(data);
        setPreferences({
          emailNotifications: updated.emailNotifications,
          notificationFrequency: updated.notificationFrequency,
        });
        setError(null);
        return true;
      } catch (err: any) {
        setError(err.message || "Failed to update preferences");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  return {
    preferences,
    loading,
    error,
    updatePreferences,
    refetch: fetchPreferences,
  };
}
