"use client";

import { useState } from "react";
import { Button } from "@/app/components/common/Button";
import { Mail, Phone, MapPin, AlertCircle } from "lucide-react";
import { sendContactEmail } from "./actions"; // 🚀 Import the secure delivery action

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null); // State to catch transit failures

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await sendContactEmail(formData);

      if (response.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(response.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An unexpected transmission error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Have questions about pricing, features, or technical listings? Drop
            us a line.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <div className="bg-slate-800/40 border border-slate-800/80 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-0.5">
                    Email Channels
                  </h3>
                  <p className="text-sm text-slate-300 font-semibold">
                    support@techdive.space
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Our average response cycle is less than 24 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 border border-slate-800/80 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-0.5">
                    Location Hub
                  </h3>
                  <p className="text-sm text-slate-300 font-semibold">
                    Brooklyn, NY
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Remote-first operation setup.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 border border-slate-800/80 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-0.5">
                    Availability Matrix
                  </h3>
                  <p className="text-sm text-slate-300 font-semibold">
                    Monday - Friday
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    9:00 AM - 6:00 PM EST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Interactive Contact Form Block */}
          <div className="bg-slate-800/40 border border-slate-800/60 rounded-2xl p-8 backdrop-blur-sm shadow-xl shadow-blue-950/20">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 text-xl font-bold mx-auto">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Message Dispatched!
                </h3>
                <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Thank you for reaching out. We have successfully caught your
                  submission and will track back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 pt-2 transition-colors block mx-auto underline decoration-dotted"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold p-3.5 rounded-lg">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Martin"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/60 text-white placeholder-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-sm font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="developer@example.com"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/60 text-white placeholder-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="API Integration Inquiry"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/60 text-white placeholder-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-sm font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Message Context
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Details about your system inquiry..."
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/60 text-white placeholder-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-sm font-medium resize-none"
                  />
                </div>

                <Button
                  loading={loading}
                  className="w-full text-sm font-bold py-3"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
