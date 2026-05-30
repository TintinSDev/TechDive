// app/(public)/faq/page.tsx

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    category: "General",
    question: "What is Techdive?",
    answer:
      "Techdive is a remote tech jobs discovery platform that helps developers and tech professionals find high-quality remote job opportunities. We aggregate jobs from reliable sources, provide personalized recommendations, and send you targeted job alerts based on your skills and preferences.",
  },
  {
    id: 2,
    category: "General",
    question: "Is Techdive free to use?",
    answer:
      "Yes! Techdive has a free tier that allows you to browse jobs, apply filters, and save up to 3 jobs per month. For unlimited features, we offer Pro ($14.88/month) and Enterprise ($29.88/month) plans.",
  },
  {
    id: 3,
    category: "General",
    question: "Do you charge companies to post jobs?",
    answer:
      "Yes, companies can post sponsored jobs on our platform. This helps us keep the free tier available for job seekers. The cost varies based on job visibility and duration.",
  },
  {
    id: 4,
    category: "Getting Started",
    question: "How do I create an account?",
    answer:
      "Click the 'Sign Up' button on the homepage, enter your email and password, and optionally add your name. You'll be able to start browsing jobs immediately. To unlock personalized recommendations, complete your profile with your skills and experience level.",
  },
  {
    id: 5,
    category: "Getting Started",
    question: "What information do I need to provide?",
    answer:
      "At minimum, you need an email and password. We recommend also adding: your name, skills, years of experience, preferred job categories, and location preferences. This helps us show you more relevant jobs.",
  },
  {
    id: 6,
    category: "Jobs",
    question: "How often are jobs updated?",
    answer:
      "We scrape job listings from multiple sources multiple times per day. Most jobs are updated within 6-12 hours of being posted on their original platform.",
  },
  {
    id: 7,
    category: "Jobs",
    question: "Can I filter jobs by salary?",
    answer:
      "Yes! You can filter by minimum and maximum salary. Note that not all job postings include salary information, so filtering by salary will narrow your results to jobs that have disclosed their pay range.",
  },
  {
    id: 8,
    category: "Jobs",
    question: "How do I apply for a job?",
    answer:
      "Click on any job listing to view full details, then click the 'Apply Now' button. You'll be redirected to the job posting on the original platform to complete the application. Techdive doesn't handle applications directly.",
  },
  {
    id: 9,
    category: "Subscriptions",
    question: "What's included in the Pro plan?",
    answer:
      "The Pro plan ($14.88/month) includes: unlimited job saves, daily personalized alerts, advanced filtering, salary insights, priority support, and early access to new features.",
  },
  {
    id: 10,
    category: "Subscriptions",
    question: "What's included in the Enterprise plan?",
    answer:
      "The Enterprise plan ($29.88/month) includes everything in Pro, plus: team collaboration features, recruitment dashboard, API access, and 10 sponsored job posting credits per month.",
  },
  {
    id: 11,
    category: "Subscriptions",
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes! You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.",
  },
  {
    id: 12,
    category: "Subscriptions",
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards via Stripe and Paystack. All payments are secure and encrypted.",
  },
  {
    id: 13,
    category: "Account",
    question: "How do I reset my password?",
    answer:
      "Click 'Forgot Password?' on the login page, enter your email, and check your inbox for a password reset link. If you don't receive an email, check your spam folder or contact support@techdive.space.",
  },
  {
    id: 14,
    category: "Account",
    question: "How do I update my profile?",
    answer:
      "Go to Dashboard → Settings → Profile to update your information. You can add a bio, skills, experience level, preferred roles, location, and contact information.",
  },
  {
    id: 15,
    category: "Account",
    question: "Can I delete my account?",
    answer:
      "Yes. Go to Settings → Account and click 'Delete Account'. This will permanently remove your profile, saved jobs, and applications. This action cannot be undone.",
  },
  {
    id: 16,
    category: "Email Preferences",
    question: "How often will I receive emails?",
    answer:
      "Free users receive weekly digests. Pro and Enterprise users can choose between daily or weekly alerts. You can customize your preferences in Settings → Email Preferences.",
  },
  {
    id: 17,
    category: "Email Preferences",
    question: "Can I unsubscribe from emails?",
    answer:
      "Yes, you can adjust your email preferences anytime in your account settings, or click 'Unsubscribe' at the bottom of any email. However, we'll still send critical account notifications.",
  },
  {
    id: 18,
    category: "Recommendations",
    question: "How are job recommendations generated?",
    answer:
      "We use a combination of your profile (skills, experience, preferences) and job listing attributes (title, description, requirements) to recommend jobs that match you. The more you use Techdive, the better our recommendations become.",
  },
  {
    id: 19,
    category: "Support",
    question: "What if I found a job listing with incorrect information?",
    answer:
      "Please contact us at support@techdive.space with the job ID and the incorrect information. We'll verify and update it or remove it from our platform.",
  },
  {
    id: 20,
    category: "Support",
    question: "How do I contact customer support?",
    answer:
      "You can reach us via email at support@techdive.space or use the contact form at /contact. We typically respond within 24 hours on weekdays.",
  },
];

const categories = [...new Set(faqItems.map((item) => item.category))];

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredItems =
    selectedCategory === "All"
      ? faqItems
      : faqItems.filter((item) => item.category === selectedCategory);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-400">
            Find answers to common questions about Techdive
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedCategory === "All"
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden hover:border-blue-500/50 transition"
            >
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/80 transition"
              >
                <div>
                  <div className="inline-block bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-blue-400 flex-shrink-0 transition-transform ${
                    expandedId === item.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedId === item.id && (
                <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700">
                  <p className="text-slate-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Still have questions?
          </h2>
          <p className="text-slate-400 mb-6">
            Can&apos;t find the answer you&apos;re looking for? Our support team
            is here to help.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/contact"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Contact Support
            </a>
            <a
              href="/blog"
              className="px-6 py-2 border border-blue-500 text-blue-400 hover:bg-blue-600/10 rounded-lg font-semibold transition"
            >
              Read Our Blog
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
