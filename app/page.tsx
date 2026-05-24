"use client";
import { galada } from "@/app/lib/fonts";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/lib/hooks";
import {
  ChevronRight,
  Briefcase,
  Zap,
  Mail,
  Users,
  Check,
  ArrowRight,
  Star,
} from "lucide-react";
import { Button } from "@/app/components/common/Button";
import { Navbar } from "@/app/components/common/Navbar";
//import { Footer } from "@/components/common/Footer";
import { api } from "@/app/lib/api";

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "enterprise">("pro");

  // Handle email newsletter signup
  // const handleNewsletterSignup = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!email) return;

  //   setLoading(true);
  //   setError("");

  //   try {
  //     // If user is logged in, update preferences
  //     if (isAuthenticated) {
  //       await api.updateEmailPreferences({
  //         emailNotifications: true,
  //         notificationFrequency: "daily",
  //       });
  //       setSubmitted(true);
  //       setEmail("");
  //     } else {
  //       // If not logged in, redirect to signup with email pre-filled
  //       router.push(`/signup?email=${encodeURIComponent(email)}`);
  //     }
  //   } catch (err) {
  //     setError("Failed to subscribe. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }

  //   // Reset submitted message after 3 seconds
  //   setTimeout(() => setSubmitted(false), 3000);
  // };
  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      // ... optional: your API call to register the newsletter subscription email hook

      // 🎯 Fix the path route directory here:
      router.push(`/auth/signup?email=${encodeURIComponent(email)}`);

      // (Or if you are using window.location):
      // window.location.href = `/auth/signup?email=${encodeURIComponent(email)}`;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // Handle plan selection and redirect to pricing or signup
  const handleSelectPlan = (plan: "pro" | "enterprise") => {
    setSelectedPlan(plan);
    if (isAuthenticated) {
      router.push("/dashboard/pricing");
    } else {
      router.push(`/signup?plan=${plan}`);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sl
ate-900"
    >
      {" "}
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
            <span className="text-blue-400 text-sm font-semibold">
              ✨ 1,200+ Remote Tech Jobs Updated Daily
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your Next{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Remote Tech Job
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Developer? Data Scientist? ML Engineer? Technical Writer?
            <br />
            Get daily job alerts tailored to your skills. No spam. Just
            opportunities.
          </p>

          {/* CTA Form */}
          <div className="flex flex-col gap-4 justify-center mb-12">
            <form
              onSubmit={handleNewsletterSignup}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                required
              />
              <Button
                type="submit"
                loading={loading}
                className="flex items-center gap-2 justify-center whitespace-nowrap"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {error && (
              <p className="text-red-400 text-sm max-w-lg mx-auto">{error}</p>
            )}

            {submitted && (
              <p className="text-green-400 text-sm max-w-lg mx-auto">
                ✓ Check your email to verify!
              </p>
            )}
          </div>

          <p className="text-slate-400 text-sm mb-12">
            No credit card required. Start getting job alerts in 30 seconds.
          </p>

          {/* Browse Jobs CTA */}
          {/* <Link href="/dashboard/remotejobs">
            <Button variant="outline" size="lg">
              Browse {isAuthenticated ? "All" : "Sample"} Jobs
            </Button>
          </Link> */}
        </div>

        {/* Hero Image */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-800/50">
            <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center">
              <div className="text-center">
                <Briefcase className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-50" />
                <p className="text-slate-400">
                  {isAuthenticated
                    ? "Go to Dashboard →"
                    : "Dashboard Preview (Sign up to access)"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Job Categories - Linked to Filtering */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
            Jobs For Every Tech Role
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Whether you&apos;re specializing or learning, we&apos;ve got
            opportunities for you.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "⚙️", title: "Backend Engineering", category: "backend" },
              {
                icon: "🎨",
                title: "Frontend Engineering",
                category: "frontend",
              },
              { icon: "🔗", title: "Full-Stack", category: "full-stack" },
              { icon: "📊", title: "Data Science", category: "data-science" },
              { icon: "🤖", title: "Machine Learning", category: "ml" },
              { icon: "✍️", title: "Technical Writing", category: "writing" },
            ].map((job) => (
              // <Link key={job.title} href={`/jobs?category=${job.category}`}>
              <Link key={job.title} href="/auth/signup">
                <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-blue-500/50 hover:bg-slate-800/80 transition cursor-pointer group h-full">
                  <div className="text-3xl mb-3">{job.icon}</div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400">
                    {job.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Explore opportunities →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
            Why Choose Techdive?
          </h2>
          <p className="text-slate-400 text-center mb-16">
            Built by engineers, for engineers.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Daily Updates",
                description:
                  "Get 50-100 new remote tech jobs added every single day.",
              },
              {
                icon: <Mail className="w-8 h-8" />,
                title: "Smart Email Alerts",
                description:
                  "Personalized job recommendations based on your skills and preferences. Enable in settings.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Real Companies",
                description:
                  "Jobs from Google, Stripe, Zapier, and 1000+ other global tech companies.",
              },
              {
                icon: <Briefcase className="w-8 h-8" />,
                title: "Salary Transparency",
                description:
                  "See salary ranges upfront. No surprises during negotiations.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-blue-500/50 transition"
              >
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing - Fully Connected to Checkout */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Choose the plan that works for you. Cancel anytime.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-lg">
              <h3 className="text-white text-2xl font-bold mb-2">Free</h3>
              <p className="text-slate-400 mb-6">Perfect to get started</p>
              <div className="text-4xl font-bold text-white mb-6">
                $0<span className="text-lg text-slate-400">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Browse all jobs",
                  "3 job saves/month",
                  "Weekly email digest",
                  "Basic filtering",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <Check className="w-5 h-5 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={
                  isAuthenticated ? "/dashboard/remotejobs" : "/auth/signup"
                }
                className="w-full block"
              >
                <Button className="w-full" variant="secondary">
                  {isAuthenticated ? "Go to Dashboard" : "Start Free"}
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="p-8 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/50 rounded-lg relative">
              <div className="absolute -top-4 right-6 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">Pro</h3>
              <p className="text-slate-400 mb-6">For active job seekers</p>
              <div className="text-4xl font-bold text-white mb-6">
                $9.99<span className="text-lg text-slate-400">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "All Free features",
                  "Unlimited job saves",
                  "Daily email alerts",
                  "Advanced filtering",
                  "Salary insights",
                  "Priority support",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <Check className="w-5 h-5 text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSelectPlan("pro")}
                className="w-full"
              >
                <Button className="w-full">Start 7-Day Trial</Button>
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-lg md:col-span-2 lg:col-span-1">
              <h3 className="text-white text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-slate-400 mb-6">For recruiters & teams</p>
              <div className="text-4xl font-bold text-white mb-6">
                $24.99<span className="text-lg text-slate-400">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "All Pro features",
                  "Team collaboration",
                  "Recruitment dashboard",
                  "API access",
                  "Job posting credits",
                  "Dedicated support",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <Check className="w-5 h-5 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSelectPlan("enterprise")}
                className="w-full"
              >
                <Button className="w-full" variant="secondary">
                  Start 7-Day Trial
                </Button>
              </button>
            </div>
          </div>

          {/* View Full Pricing */}
          <div className="text-center mt-12">
            <Link href="/dashboard/pricing">
              <Button variant="outline">View Full Pricing & FAQ</Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Social Proof */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Join 5,000+ Tech Professionals
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Backend Engineer",
                company: "Now at Stripe",
                text: "Found my dream role at Stripe in just 2 weeks. Techdive's alerts were insanely relevant.",
                rating: 5,
              },
              {
                name: "Alex Okonkwo",
                role: "ML Engineer",
                company: "Now at OpenAI",
                text: "Got 5 interview offers in one week. The quality of jobs here is unmatched.",
                rating: 5,
              },
              {
                name: "Maria Rodriguez",
                role: "Full-Stack Dev",
                company: "Now at Figma",
                text: "Switched from traditional job boards. Techdive saves me hours every week.",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-blue-500/50 transition"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-300 mb-4 italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  <p className="text-blue-400 text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-lg p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of engineers landing their dream remote jobs. No
            spam, just great opportunities.
          </p>
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button size="lg" className="flex items-center gap-2 mx-auto">
                Go to Dashboard <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/auth/signup">
              <Button size="lg" className="flex items-center gap-2 mx-auto">
                Get Started Free <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">TechDive</h3>
              <p className="text-slate-400 text-sm">
                Remote tech jobs, delivered daily.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="/jobs" className="hover:text-white transition">
                    Browse Jobs
                  </a>
                </li>
                <li>
                  <a
                    href="/dashboard/pricing"
                    className="hover:text-white transition"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/recruiters" className="hover:text-white transition">
                    For Recruiters
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="/blog" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/privacy" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="/cookies" className="hover:text-white transition">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
            {/* <div>
              <h4 className="text-white font-semibold mb-4">Follow</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    GitHub
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
            <p>
              Copyright © {new Date().getFullYear()},{" "}
              <Link href={"/"} className={`${galada.className} text-primary`}>
                Martin Maina.
              </Link>{" "}
              All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
