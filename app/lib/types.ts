// app/lib/types.ts

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  bio: string | null;
  skills: string[];
  experience: "entry-level" | "junior" | "mid" | "senior" | null;
  preferredRoles: string[];
  location: string | null;
  phoneNumber: string | null;
  emailNotifications: boolean;
  notificationFrequency: "daily" | "weekly" | "never";
  subscription: Subscription | null;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: "free" | "pro" | "enterprise";
  status: "active" | "canceled" | "past_due";
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  mpesaPhoneNumber: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string | null;
  companyUrl: string | null;
  description: string;
  requirements: string[];
  benefits: string[];
  category: string;
  type: "full-time" | "contract" | "freelance" | "part-time";
  experience: "entry-level" | "junior" | "mid" | "senior";
  salary: number | null;
  salaryMax: number | null;
  currency: string;
  location: string | null;
  timezone: string | null;
  applyUrl: string | null;
  source: string;
  sourceJobId: string | null;
  isActive: boolean;
  postedAt: string;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SavedJob {
  id: string;
  userId: string;
  jobId: string;
  job: Job;
  savedAt: string;
}

export interface JobApplication {
  id: string;
  userId: string;
  jobId: string;
  job: Job;
  status: "applied" | "interviewing" | "rejected" | "accepted";
  appliedAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface JobsResponse {
  jobs: Job[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiError {
  error: string;
  statusCode?: number;
}

export type JobCategory =
  | "backend"
  | "frontend"
  | "full-stack"
  | "data-science"
  | "ml"
  | "devops"
  | "writing"
  | "other";
export type JobType = "full-time" | "contract" | "freelance" | "part-time";
export type ExperienceLevel = "entry-level" | "junior" | "mid" | "senior";
