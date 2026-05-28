// app/(public)/blog/page.tsx

import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "How to Land Your First Remote Developer Job",
    excerpt:
      "A comprehensive guide to breaking into remote work as a junior developer, including tips on building your portfolio and what companies are looking for.",
    author: "Sarah Chen",
    date: "May 20, 2026",
    category: "Career",
    slug: "first-remote-job",
    image: "🚀",
  },
  {
    id: 2,
    title: "Remote Work Best Practices for 2026",
    excerpt:
      "Learn the strategies successful remote workers use to stay productive, maintain work-life balance, and avoid burnout while working from home.",
    author: "Alex Rodriguez",
    date: "May 15, 2026",
    category: "Productivity",
    slug: "remote-work-practices",
    image: "💻",
  },
  {
    id: 3,
    title: "Salary Negotiation Tips for Tech Professionals",
    excerpt:
      "Master the art of negotiating your salary package. Includes real examples and research on market rates for different roles and experience levels.",
    author: "Maria Gonzalez",
    date: "May 10, 2026",
    category: "Salary",
    slug: "salary-negotiation",
    image: "💰",
  },
  {
    id: 4,
    title: "Top 10 Tech Skills in Demand for 2026",
    excerpt:
      "Discover which programming languages, frameworks, and technologies are most sought after by companies right now, and how to learn them.",
    author: "James Wilson",
    date: "May 5, 2026",
    category: "Skills",
    slug: "top-tech-skills",
    image: "🎯",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Techdive Blog</h1>
          <p className="text-xl text-slate-400">
            Tips, insights, and stories from the remote tech community
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg p-8 mb-12">
            <div className="flex gap-6">
              <div className="text-6xl">{blogPosts[0].image}</div>
              <div>
                <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  Featured
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  {blogPosts[0].title}
                </h2>
                <p className="text-slate-300 mb-4">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="space-y-6">
          {blogPosts.slice(1).map((post) => (
            <div
              key={post.id}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition"
            >
              <div className="flex gap-6">
                <div className="text-5xl flex-shrink-0">{post.image}</div>
                <div className="flex-1">
                  <div className="inline-block bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Stay Updated with Our Blog
          </h3>
          <p className="text-slate-400 mb-6">
            Get the latest career tips and tech insights delivered to your inbox
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
