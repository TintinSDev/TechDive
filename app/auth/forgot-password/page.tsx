"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/common/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // In a real app, you'd call an API endpoint
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Reset Password</h1>

      {submitted ? (
        <div className="text-center">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-2xl font-bold mb-2">Check your email</h2>
          <p className="text-gray-600 mb-6">
            We&apos;ve sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-gray-600 mb-6">
            Click the link in the email to reset your password.
          </p>
          <Link href="/login">
            <Button>Back to Login</Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-gray-600 mb-6">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <Button loading={loading} className="w-full">
            Send Reset Link
          </Button>

          <p className="text-center text-gray-600">
            Remember your password?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
