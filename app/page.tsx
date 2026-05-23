"use client";
import { galada } from "@/lib/fonts";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronRight,
  Briefcase,
  Zap,
  Mail,
  Users,
  Check,
  ArrowRight,
} from "lucide-react";


export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "enterprise">("pro");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Call your backend to create checkout session
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, plan: selectedPlan }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TechDive</span>
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
            Get Started
          </button>
        </div>
      </nav>

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
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-lg"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center gap-2 justify-center"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {submitted && (
            <p className="text-green-400 mb-8">✓ Check your email to verify!</p>
          )}

          <p className="text-slate-400 text-sm">
            No credit card required. Start getting job alerts in 30 seconds.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-800/50">
            <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center">
              <div className="text-center">
                <Briefcase className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-50" />
                <p className="text-slate-400">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
            Jobs For Every Tech Role
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Whether you're specializing or learning, we've got opportunities for
            you.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "⚙️", title: "Backend Engineering", count: "340" },
              { icon: "🎨", title: "Frontend Engineering", count: "280" },
              { icon: "🔗", title: "Full-Stack", count: "210" },
              { icon: "📊", title: "Data Science", count: "160" },
              { icon: "🤖", title: "Machine Learning", count: "95" },
              { icon: "✍️", title: "Technical Writing", count: "85" },
            ].map((job) => (
              <div
                key={job.title}
                className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-blue-500/50 transition cursor-pointer group"
              >
                <div className="text-3xl mb-3">{job.icon}</div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400">
                  {job.title}
                </h3>
                <p className="text-slate-400 text-sm">{job.count} jobs</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
            Why Choose TechDive?
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
                  "Personalized job recommendations based on your skills and preferences.",
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
                className="p-8 bg-slate-800/50 border border-slate-700 rounded-lg"
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

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Choose the plan that works for you. Cancel anytime.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-10xl mx-auto">
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
              <button className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-semibold">
                Start Free
              </button>
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
                onClick={() => {
                  setSelectedPlan("pro");
                  const emailInput = document.querySelector<HTMLInputElement>(
                    'input[type="email"]',
                  );
                  emailInput?.focus();
                }}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold"
              >
                Start 7-Day Trial
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
                onClick={() => {
                  setSelectedPlan("enterprise");
                  document
                    .querySelector<HTMLInputElement>('input[type="email"]')
                    ?.focus();
                }}
                className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-semibold"
              >
                Start 7-Day Trial
              </button>
            </div>
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
                company: "Previously Freelance",
                text: "Found my dream role at Stripe in just 2 weeks. TechDive's alerts were insanely relevant.",
              },
              {
                name: "Alex Okonkwo",
                role: "ML Engineer",
                company: "Now at OpenAI",
                text: "Got 5 interview offers in one week. The quality of jobs here is unmatched.",
              },
              {
                name: "Maria Rodriguez",
                role: "Full-Stack Dev",
                company: "Now at Figma",
                text: "Switched from traditional job boards. TechDive saves me hours every week.",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-slate-300 mb-4">"{testimonial.text}"</p>
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
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center gap-2 mx-auto">
            Get Started Free <ChevronRight className="w-5 h-5" />
          </button>
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
                  <a href="#" className="hover:text-white transition">
                    Browse Jobs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    For Recruiters
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
            <div>
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
            </div>
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
