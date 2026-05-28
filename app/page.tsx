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
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/app/components/common/Button";
import { Navbar } from "@/app/components/common/Navbar";

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error] = useState("");
  const [submitted] = useState(false);

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      router.push(`/auth/signup?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan: "pro" | "enterprise") => {
    if (isAuthenticated) {
      router.push("/dashboard/pricing");
    } else {
      router.push(`/auth/signup?plan=${plan}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
            Developer? Data Scientist? ML Engineer? Full-Stack Builder?
            <br />
            Get job recommendations tailored perfectly to your dynamic skills.
          </p>

          {/* 🚀 Dynamic Authentication CTA Form Segment */}
          <div className="flex flex-col gap-4 justify-center mb-8">
            {isAuthenticated ? (
              <div className="text-center space-y-4 max-w-md mx-auto bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 backdrop-blur-sm shadow-xl">
                <p className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Authenticated Session
                  Active
                </p>
                <p className="text-sm font-medium text-slate-300">
                  Welcome back,{" "}
                  <span className="text-white font-bold">
                    {user?.name || user?.email}
                  </span>
                  . Your workspace tracking map is live.
                </p>
                <div className="flex justify-center gap-3 pt-1">
                  <Link href="/dashboard" className="flex-1">
                    <Button className="w-full flex items-center gap-2 justify-center py-3 text-sm font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-transform">
                      Workspace <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/dashboard/jobs" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-slate-700 bg-slate-800/40 text-slate-300 hover:text-white py-3 text-sm font-bold hover:bg-slate-800 transition-all"
                    >
                      Browse Feeds
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <form
                  onSubmit={handleNewsletterSignup}
                  className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto"
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm font-medium transition-all"
                    required
                  />
                  <Button
                    type="submit"
                    loading={loading}
                    className="flex items-center gap-2 justify-center whitespace-nowrap text-sm font-bold px-6 py-4"
                  >
                    Get Started Free <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
                {error && (
                  <p className="text-red-400 text-sm max-w-lg mx-auto">
                    {error}
                  </p>
                )}
                {submitted && (
                  <p className="text-green-400 text-sm max-w-lg mx-auto">
                    ✓ Check your email to verify!
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Hero Interactive Image Container Block */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/60 shadow-2xl shadow-blue-500/5 p-8 backdrop-blur-md">
            {isAuthenticated ? (
              /* ✨ EXCLUSIVE AUTH VIEW: Premium Quick-Glance Activity Portal Workspace */
              <div className="py-6 text-center space-y-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-500/20">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Your Pipeline is Online
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Personalized matchmaking computations are matching jobs to
                    your chosen profile targets.
                  </p>
                </div>
                <div className="pt-2">
                  <Link href="/dashboard">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full">
                      Launch Main System App Dashboard →
                    </span>
                  </Link>
                </div>
              </div>
            ) : (
              /* GUEST PREVIEW HOVER MAP */
              <div className="aspect-[16/9] bg-gradient-to-br from-blue-600/10 via-slate-900 to-cyan-600/10 flex items-center justify-center rounded-xl border border-slate-800/60">
                <div className="text-center p-6">
                  <Briefcase className="w-12 h-12 text-blue-500/60 mx-auto mb-4 animate-pulse" />
                  <p className="text-slate-200 font-bold text-base tracking-tight">
                    Dashboard Interface Preview
                  </p>
                  <p className="text-slate-400 text-xs mt-1 max-w-xs mx-auto leading-relaxed">
                    Create an account or complete login setup to reveal
                    match-score lists and tracking states.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-slate-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center tracking-tight">
            Jobs For Every Tech Role
          </h2>
          <p className="text-slate-400 text-center mb-12 text-sm sm:text-base">
            Target specific domains to fine-tune your personalized profile
            criteria matches.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "⚙️", title: "Backend Engineering", category: "backend" },
              {
                icon: "🎨",
                title: "Frontend Engineering",
                category: "frontend",
              },
              { icon: "🔗", title: "Full-Stack Dev", category: "full-stack" },
              { icon: "📊", title: "Data Science", category: "data-science" },
              { icon: "🤖", title: "Machine Learning", category: "ml" },
              { icon: "✍️", title: "Technical Writing", category: "writing" },
            ].map((job) => (
              <Link
                key={job.title}
                href={
                  isAuthenticated
                    ? `/dashboard/jobs?category=${job.category}`
                    : "/auth/signup"
                }
              >
                <div className="p-5 bg-slate-800/40 border border-slate-800 rounded-xl hover:border-blue-500/40 hover:bg-slate-800/80 transition duration-200 cursor-pointer group h-full flex flex-col justify-between">
                  <div>
                    <div className="text-2xl mb-3">{job.icon}</div>
                    <h3 className="text-white font-bold text-base mb-1 group-hover:text-blue-400 transition-colors">
                      {job.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs mt-4 font-medium group-hover:text-slate-300 transition-colors">
                    Explore opportunities →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center tracking-tight">
            Why Choose Techdive?
          </h2>
          <p className="text-slate-400 text-center mb-16 text-sm">
            Built by engineers to bypass standard application filters.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Zap className="w-5 h-5" />,
                title: "Daily Updates",
                description:
                  "Get dozens of fresh remote technical engineering openings injected into your tracker every single day.",
              },
              {
                icon: <Mail className="w-5 h-5" />,
                title: "Smart Recommendations",
                description:
                  "Immediate match scoring generated based on your dashboard tags and structural skill preferences.",
              },
              {
                icon: <Users className="w-5 h-5" />,
                title: "Verified Global Stacks",
                description:
                  "Direct tracking links for globally verified teams like Stripe, Google, Paystack, and high-growth Web3 core models.",
              },
              {
                icon: <Briefcase className="w-5 h-5" />,
                title: "Salary Transparency",
                description:
                  "Upfront dynamic base rate fields displayed prominently inside tracking layouts to streamline negotiation paths.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 bg-slate-800/30 border border-slate-800/80 rounded-xl hover:border-blue-500/30 transition-all duration-150"
              >
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="text-white text-base font-bold mb-1">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400 text-center mb-12 text-sm">
            Choose the plan that works for you. Cancel anytime.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <div className="p-6 bg-slate-800/30 border border-slate-800 rounded-xl flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-white text-xl font-bold">Free Base</h3>
                <div className="text-3xl font-black text-white">
                  $0
                  <span className="text-xs font-medium text-slate-400 ml-1">
                    /mo
                  </span>
                </div>
                <ul className="space-y-3 pt-2">
                  {[
                    "Browse all jobs",
                    "3 job saves/month",
                    "Weekly email digest",
                    "Basic filtering",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-300"
                    >
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href={isAuthenticated ? "/dashboard/jobs" : "/auth/signup"}
                  className="w-full block"
                >
                  <Button
                    className="w-full text-xs font-bold py-2.5"
                    variant="secondary"
                  >
                    {isAuthenticated ? "Enter Workspace" : "Start Free"}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="p-6 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/40 rounded-xl relative flex flex-col justify-between shadow-xl shadow-blue-500/5">
              <div className="absolute -top-3 right-4 bg-blue-600 text-white px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase">
                Most Popular
              </div>
              <div className="space-y-4">
                <h3 className="text-white text-xl font-bold">Pro Tier</h3>
                <div className="text-3xl font-black text-white">
                  $9.99
                  <span className="text-xs font-medium text-slate-400 ml-1">
                    /mo
                  </span>
                </div>
                <ul className="space-y-3 pt-2">
                  {[
                    "All Free features",
                    "Unlimited job saves",
                    "Daily email alerts",
                    "Advanced filtering",
                    "Salary insights",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-200"
                    >
                      <Check className="w-4 h-4 text-blue-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6">
                <Button
                  onClick={() => handleSelectPlan("pro")}
                  className="w-full text-xs font-bold py-2.5"
                >
                  Start 7-Day Trial
                </Button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="p-6 bg-slate-800/30 border border-slate-800 rounded-xl flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-white text-xl font-bold">Enterprise</h3>
                <div className="text-3xl font-black text-white">
                  $24.99
                  <span className="text-xs font-medium text-slate-400 ml-1">
                    /mo
                  </span>
                </div>
                <ul className="space-y-3 pt-2">
                  {[
                    "All Pro features",
                    "Team collaboration",
                    "Recruiter pipeline portal",
                    "API lookup access",
                    "Dedicated priority channels",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-300"
                    >
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6">
                <Button
                  onClick={() => handleSelectPlan("enterprise")}
                  className="w-full text-xs font-bold py-2.5"
                  variant="secondary"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/dashboard/pricing">
              <span className="text-xs font-bold text-slate-400 hover:text-blue-400 transition-colors cursor-pointer border-b border-dotted border-slate-600 pb-0.5">
                View Full Pricing Tiers & FAQ Documentation
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center tracking-tight">
            Join 5,000+ Global Professionals
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Chen",
                role: "Backend Engineer",
                company: "Now at Stripe",
                text: "Found my target role in just two cycles. Techdive's stack tags matched beautifully.",
                rating: 5,
              },
              {
                name: "Alex Okonkwo",
                role: "ML Engineer",
                company: "Now at OpenAI",
                text: "Incredible match density. Saved me massive search cycles across standard boards.",
                rating: 5,
              },
              {
                name: "Maria Rodriguez",
                role: "Full-Stack Dev",
                company: "Now at Figma",
                text: "The custom sorting filter configurations instantly isolated real high-paying opportunities.",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="p-6 bg-slate-800/20 border border-slate-800 rounded-xl"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div>
                  <p className="text-white text-sm font-bold">
                    {testimonial.name}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {testimonial.role} —{" "}
                    <span className="text-blue-400 font-medium">
                      {testimonial.company}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 rounded-2xl p-10 sm:p-14 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
            Ready to Accelerate Your Search?
          </h2>
          <p className="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed mb-8">
            Deploy your technical profile tags right now and align directly with
            premium global remote teams.
          </p>
          <Link href={isAuthenticated ? "/dashboard" : "/auth/signup"}>
            <Button
              size="lg"
              className="flex items-center gap-2 mx-auto text-sm font-bold px-6 py-3 shadow-xl shadow-blue-600/10"
            >
              {isAuthenticated
                ? "Enter Workspace Dashboard"
                : "Get Started Now"}{" "}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="max-w-6xl mx-auto">
          {" "}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {" "}
            <div>
              {" "}
              <h3 className="text-white font-bold mb-4">TechDive</h3>{" "}
              <p className="text-slate-400 text-sm">
                {" "}
                Remote tech jobs, delivered daily.{" "}
              </p>{" "}
            </div>{" "}
            {/* <div>
              {" "}
              <h4 className="text-white font-semibold mb-4">Product</h4>{" "}
              <ul className="space-y-2 text-sm text-slate-400">
                {" "}
                <li>
                  {" "}
                  <a href="/jobs" className="hover:text-white transition">
                    {" "}
                    Browse Jobs{" "}
                  </a>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <a
                    href="/dashboard/pricing"
                    className="hover:text-white transition"
                  >
                    {" "}
                    Pricing{" "}
                  </a>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <a href="/recruiters" className="hover:text-white transition">
                    {" "}
                    For Recruiters{" "}
                  </a>{" "}
                </li>{" "}
              </ul>{" "}
            </div>{" "} */}
            <div>
              {" "}
              <h4 className="text-white font-semibold mb-4">Company</h4>{" "}
              <ul className="space-y-2 text-sm text-slate-400">
                {" "}
                <li>
                  {" "}
                  <a href="/blog" className="hover:text-white transition">
                    {" "}
                    Blog{" "}
                  </a>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <a href="/contact" className="hover:text-white transition">
                    {" "}
                    Contact{" "}
                  </a>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <a href="/faq" className="hover:text-white transition">
                    {" "}
                    FAQ{" "}
                  </a>{" "}
                </li>{" "}
              </ul>{" "}
            </div>{" "}
            <div>
              {" "}
              <h4 className="font-semibold mb-4">Legal</h4>{" "}
              <ul className="space-y-2 text-gray-400">
                {" "}
                <li>
                  {" "}
                  <a href="/privacy" className="hover:text-white transition">
                    {" "}
                    Privacy{" "}
                  </a>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <a href="/terms" className="hover:text-white transition">
                    {" "}
                    Terms{" "}
                  </a>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <a href="/cookies" className="hover:text-white transition">
                    {" "}
                    Cookies{" "}
                  </a>{" "}
                </li>{" "}
              </ul>{" "}
            </div>{" "}
            <a
              href="mailto:support@techdive.com"
              className="hover:text-white transition-colors"
            >
              {" "}
              Support Channels{" "}
            </a>
            {/* <div> <h4 className="text-white font-semibold mb-4">Follow</h4> <ul className="space-y-2 text-sm text-slate-400"> <li> <a href="#" className="hover:text-white transition"> Twitter </a> </li> <li> <a href="#" className="hover:text-white transition"> LinkedIn </a> </li> <li> <a href="#" className="hover:text-white transition"> GitHub </a> </li> </ul> </div> */}{" "}
          </div>{" "}
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
            {" "}
            <p>
              {" "}
              Copyright © {new Date().getFullYear()},{" "}
              <Link href={"/"} className={`${galada.className} text-primary`}>
                {" "}
                Martin Maina.{" "}
              </Link>{" "}
              All Rights Reserved{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </footer>
    </div>
  );
}
