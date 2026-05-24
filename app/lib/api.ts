// app/lib/api.ts

import {
  AuthResponse,
  JobsResponse,
  User,
  Job,
  SavedJob,
  JobApplication,
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface FetchOptions extends RequestInit {
  skipToken?: boolean;
}

class ApiClient {
  public async request<T>(
    endpoint: string,
    options?: FetchOptions,
  ): Promise<T> {
    const { skipToken = false, ...fetchOptions } = options || {};

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...((fetchOptions.headers as Record<string, string>) || {}),
    };

    // Add auth token if available
    if (!skipToken) {
      const token = this.getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "API request failed");
    }

    return response.json();
  }

  private setToken(token: string): void {
    if (typeof window !== "undefined") {
      // Save to cookies instead of localStorage
      document.cookie = `auth_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`;
    }
  }

  private removeToken(): void {
    if (typeof window !== "undefined") {
      document.cookie = `auth_token=; path=/; max-age=0`;
    }
  }

  private getToken(): string | null {
    if (typeof window !== "undefined") {
      const name = "auth_token=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(";");
      for (let cookie of cookieArray) {
        cookie = cookie.trim();
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }
    }
    return null;
  }

  // ============================================================
  // Auth Endpoints
  // ============================================================

  async signup(
    email: string,
    password: string,
    name?: string,
  ): Promise<AuthResponse> {
    const data = await this.request<AuthResponse>("/auth/signup", {
      method: "POST",
      skipToken: true,
      body: JSON.stringify({ email, password, name }),
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const data = await this.request<AuthResponse>("/auth/login", {
      method: "POST",
      skipToken: true,
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async getMe(): Promise<User> {
    return this.request<User>("/auth/me");
  }

  async logout(): Promise<void> {
    this.removeToken();
  }

  // ============================================================
  // Job Endpoints
  // ============================================================

  async getJobs(filters?: {
    page?: number;
    limit?: number;
    category?: string;
    type?: string;
    experience?: string;
    search?: string;
    minSalary?: number;
    maxSalary?: number;
  }): Promise<JobsResponse> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }

    const queryString = params.toString();
    const endpoint = `/jobs${queryString ? `?${queryString}` : ""}`;

    return this.request<JobsResponse>(endpoint, { skipToken: true });
  }

  async getJobById(id: string): Promise<Job> {
    return this.request<Job>(`/jobs/${id}`, { skipToken: true });
  }

  async saveJob(jobId: string): Promise<SavedJob> {
    return this.request<SavedJob>("/jobs/save", {
      method: "POST",
      body: JSON.stringify({ jobId }),
    });
  }

  async unsaveJob(jobId: string): Promise<{ message: string }> {
    return this.request<{ message: string }>("/jobs/unsave", {
      method: "POST",
      body: JSON.stringify({ jobId }),
    });
  }

  async getSavedJobs(
    page: number = 1,
    limit: number = 20,
  ): Promise<{
    saved: SavedJob[];
    pagination: { page: number; limit: number; total: number; pages: number };
  }> {
    return this.request(`/jobs/saved?page=${page}&limit=${limit}`);
  }
  async getApplications(): Promise<{
    applications: Array<{
      id: string;
      jobTitle: string;
      company: string;
      status: "APPLIED" | "INTERVIEWING" | "REJECTED" | "ACCEPTED";
      appliedAt: string;
      notes?: string;
    }>;
  }> {
    return this.request("/applications");
  }

  async createApplication(jobId: string): Promise<{ success: boolean }> {
    return this.request("/applications", {
      method: "POST",
      body: JSON.stringify({ jobId }),
    });
  }

  async updateApplicationStatus(
    id: string,
    status: string,
  ): Promise<{ success: boolean }> {
    return this.request(`/applications/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }
  // ============================================================
  // Recommendations Endpoints
  // ============================================================

  async getRecommendations(
    page: number = 1,
    limit: number = 20,
  ): Promise<JobsResponse> {
    return this.request<JobsResponse>(
      `/recommendations?page=${page}&limit=${limit}`,
    );
  }

  async getTrendingJobs(limit: number = 20): Promise<{ jobs: Job[] }> {
    return this.request<{ jobs: Job[] }>(
      `/recommendations/trending?limit=${limit}`,
      { skipToken: true },
    );
  }

  async getSimilarJobs(
    jobId: string,
    limit: number = 10,
  ): Promise<{ jobs: Job[] }> {
    return this.request<{ jobs: Job[] }>(
      `/recommendations/similar/${jobId}?limit=${limit}`,
      { skipToken: true },
    );
  }

  // ============================================================
  // User Endpoints
  // ============================================================

  async updateProfile(data: Partial<User>): Promise<User> {
    return this.request<User>("/users/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async getEmailPreferences(): Promise<{
    id: string;
    email: string;
    emailNotifications: boolean;
    notificationFrequency: string;
  }> {
    return this.request("/users/preferences");
  }

  async updateEmailPreferences(data: {
    emailNotifications?: boolean;
    notificationFrequency?: string;
  }): Promise<{
    id: string;
    emailNotifications: boolean;
    notificationFrequency: string;
  }> {
    return this.request("/users/preferences", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deleteAccount(): Promise<{ message: string }> {
    return this.request<{ message: string }>("/users/delete", {
      method: "DELETE",
    });
  }

  // ============================================================
  // Subscription Endpoints
  // ============================================================

  async getSubscription(): Promise<{ plan: string; status: string }> {
    return this.request("/subscriptions");
  }

  async createStripeCheckout(plan: "pro" | "enterprise"): Promise<{
    sessionId: string;
    url: string;
  }> {
    return this.request("/subscriptions/stripe/checkout", {
      method: "POST",
      body: JSON.stringify({ plan }),
    });
  }

  async initiateM2PaymentMpesa(
    plan: "pro" | "enterprise",
    phoneNumber: string,
  ): Promise<{ success: boolean; message: string; transactionId?: string }> {
    return this.request("/subscriptions/mpesa/initiate", {
      method: "POST",
      body: JSON.stringify({ plan, phoneNumber }),
    });
  }

  async cancelSubscription(): Promise<{ success: boolean; message: string }> {
    return this.request("/subscriptions/cancel", { method: "POST" });
  }

  async getPaymentHistory(limit: number = 10): Promise<any[]> {
    return this.request(`/subscriptions/history?limit=${limit}`);
  }
}

export const api = new ApiClient();
