// app/lib/constants.ts

export const JOB_CATEGORIES = [
  { value: "backend", label: "Backend Engineering" },
  { value: "frontend", label: "Frontend Engineering" },
  { value: "full-stack", label: "Full-Stack" },
  { value: "data-science", label: "Data Science" },
  { value: "ml", label: "Machine Learning" },
  { value: "devops", label: "DevOps" },
  { value: "writing", label: "Technical Writing" },
];

export const JOB_TYPES = [
  { value: "full-time", label: "Full-Time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "part-time", label: "Part-Time" },
];

export const EXPERIENCE_LEVELS = [
  { value: "entry-level", label: "Entry Level" },
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-Level" },
  { value: "senior", label: "Senior" },
];

export const PRICING_PLANS = [
  {
    name: "Free",
    price: 0,
    description: "Perfect to get started",
    features: [
      "Browse all jobs",
      "3 job saves/month",
      "Weekly email digest",
      "Basic filtering",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: 9.99,
    description: "For active job seekers",
    popular: true,
    features: [
      "All Free features",
      "Unlimited job saves",
      "Daily email alerts",
      "Advanced filtering",
      "Salary insights",
      "Priority support",
    ],
    cta: "Start 7-Day Trial",
  },
  {
    name: "Enterprise",
    price: 24.99,
    description: "For recruiters & teams",
    features: [
      "All Pro features",
      "Team collaboration",
      "Recruitment dashboard",
      "API access",
      "Job posting credits",
      "Dedicated support",
    ],
    cta: "Start 7-Day Trial",
  },
];

export const NAVIGATION = [
  {
    name: "Browse Jobs",
    href: "/jobs",
    requiresAuth: false,
  },
  {
    name: "Pricing",
    href: "/pricing",
    requiresAuth: false,
  },
];

export const DASHBOARD_NAVIGATION = [
  {
    name: "Dashboard",
    href: "/",
    icon: "📊",
  },
  {
    name: "Recommended Jobs",
    href: "/",
    icon: "⭐",
  },
  {
    name: "Saved Jobs",
    href: "/jobs",
    icon: "❤️",
  },
  {
    name: "Applications",
    href: "/applications",
    icon: "📬",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: "👤",
  },
  {
    name: "Preferences",
    href: "/preferences",
    icon: "🔔",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "⚙️",
  },
];

export const COMMON_SKILLS = [
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "JavaScript",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Kubernetes",
  "AWS",
  "Vue.js",
  "Angular",
  "FastAPI",
  "Django",
  "Go",
  "Rust",
  "Java",
  "C++",
  "GraphQL",
  "REST API",
  "Tailwind CSS",
  "Next.js",
  "Vue",
  "Express.js",
  "Database Design",
  "System Design",
  "Microservices",
  "Redis",
  "Elasticsearch",
  "Machine Learning",
  "Data Analysis",
  "TensorFlow",
  "PyTorch",
];
