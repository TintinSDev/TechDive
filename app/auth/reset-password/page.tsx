"use client";

import { FormEvent, useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/components/common/Button";

// 1️⃣ Move the core logic into a separate inner component
function ResetPasswordFormInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  useEffect(() => {
    if (!token) {
      setStatus({
        type: "error",
        message: "Invalid or expired password reset token link.",
      });
    }
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setStatus({ type: "error", message: "Passwords do not match." });
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update password");
      }

      setStatus({
        type: "success",
        message: "Your password has been successfully reset!",
      });
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-lg p-8 max-w-md mx-auto my-12">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">
        New Password
      </h1>

      {status.type === "success" ? (
        <div className="text-center space-y-4">
          <div className="text-6xl">✅</div>
          <h2 className="text-2xl font-bold text-white">Password Updated</h2>
          <p className="text-slate-400">{status.message}</p>
          <p className="text-xs text-blue-500 animate-pulse">
            Redirecting you to login...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status.type === "error" && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm">
              {status.message}
            </div>
          )}

          <p className="text-slate-400 text-sm mb-4">
            Please enter your new secure password below.
          </p>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">
              New Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              disabled={!token}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              disabled={!token}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <Button loading={loading} disabled={!token} className="w-full mt-2">
            Update Password
          </Button>
        </form>
      )}
    </div>
  );
}

// 2️⃣ Wrap the inner component inside a Suspense boundary in the main default export page
export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400 text-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
          Loading secure reset details...
        </div>
      }
    >
      <ResetPasswordFormInner />
    </Suspense>
  );
}
