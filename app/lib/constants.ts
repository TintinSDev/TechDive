// app/lib/constants.ts

export const JOB_CATEGORIES = [
  { value: "backend", label: "Backend Engineering" },
  { value: "frontend", label: "Frontend Engineering" },
  { value: "full-stack", label: "Full-Stack" },
  { value: "data-science", label: "Data Science" },
  { value: "ml", label: "Machine Learning" },
  { value: "devops", label: "DevOps" },
  { value: "writing", label: "Technical Writing" },
  { value: "design", label: "Product Design" },
  { value: "product", label: "Product Management" },
  { value: "qa", label: "QA & Testing" },
  { value: "mobile", label: "Mobile Development" },
  { value: "security", label: "Cybersecurity" },
  { value: "ai", label: "AI Engineer" },
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

// app/lib/constants.ts
export const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    payStackPlanCode: null, // No charge
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
    id: "pro",
    name: "Pro",
    price: 14.88,
    payStackPlanCode: "PLN_rkl7vn14k3c84yl", // Replace with real test key from dashboard
    description: "For active job seekers",
    popular: true,
    features: [
      "All Free features",
      "Upto 20 job applications per month",
      "Daily email alerts",
      "Job application tracking",
      "Advanced filtering",
      "Salary insights",
      "Priority support",
    ],
    cta: "Subscribe Now",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 29.88,
    payStackPlanCode: "PLN_er9hd0o2hlpzm9c", // Replace with real test key from dashboard
    description: "For recruiters & teams",
    features: [
      "All Pro features",
      "Unlimited job applications",
      "Unlimited job saves",
      "Dedicated job alerts",
      "Team collaboration features",
      "Career matching algorithm",
      "Instant real-time job alerts",
      "Dedicated support",
    ],
    cta: "Subscribe Now",
  },
];

export const NAVIGATION = [
  {
    name: "Browse Jobs",
    href: "/dashboard/jobs",
    requiresAuth: false,
  },
  {
    name: "Pricing",
    href: "/dashboard/pricing",
    requiresAuth: false,
  },
];

export const DASHBOARD_NAVIGATION = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "📊",
  },
  {
    name: "Remote Jobs",
    href: "/dashboard/jobs",
    icon: "⭐",
  },
  {
    name: "Saved Jobs",
    href: "/dashboard/saved",
    icon: "❤️",
  },
  {
    name: "Applications",
    href: "/dashboard/applications",
    icon: "📬",
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: "👤",
  },
  {
    name: "Preferences",
    href: "/dashboard/preferences",
    icon: "🔔",
  },
  { name: "Pricing", href: "/dashboard/pricing", icon: "💳" },
  {
    name: "Settings",
    href: "/dashboard/settings",
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
