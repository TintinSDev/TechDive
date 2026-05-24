"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/common/Button";

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">📧</div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          Check your email
        </h2>
        <p className="text-gray-600 mb-4">
          We&apos;ve sent a password reset link to <strong>{email}</strong>
        </p>
        <p className="text-gray-600 mb-8">
          Click the link in the email to reset your password. The link expires
          in 24 hours.
        </p>
        <Link href="/auth/login">
          <Button className="w-full">Back to Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-center mb-2">Reset Password</h1>
      <p className="text-center text-gray-600 mb-8">
        Enter your email address and we&apos;ll send you a link to reset your
        password
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        <Button loading={loading} className="w-full" size="lg">
          Send Reset Link
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-center text-gray-600">
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};
