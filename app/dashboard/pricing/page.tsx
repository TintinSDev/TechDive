"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/lib/hooks";
import { PRICING_PLANS } from "@/app/lib/constants";
import { Button } from "@/app/components/common/Button";
import { Check } from "lucide-react";
import { api } from "@/app/lib/api";

export default function PricingPage() {
  const { isAuthenticated, token } = useAuth(); // Assuming your auth hook provides the user's JWT token
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (planId === "free") return;

    setLoadingPlan(planId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://techdive-backend-production.up.railway.app/api"}/subscriptions/paystack/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Passes authentication down to Express
          },
          body: JSON.stringify({ plan: planId }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // 🚀 Redirect the user directly to PayStack's hosted checkout page
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-300">
            Choose the plan that fits your job search needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden transition transform hover:scale-105 ${
                plan.popular
                  ? "ring-2 ring-blue-500 shadow-2xl bg-gradient-to-b from-blue-600/20 to-slate-800 md:scale-105"
                  : "bg-slate-800/50 border border-slate-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-2 text-sm font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </div>
                </div>

                {!isAuthenticated ? (
                  <Link href="/auth/signup" className="w-full block">
                    <Button
                      className="w-full"
                      variant={plan.popular ? "primary" : "outline"}
                    >
                      Sign Up to Start
                    </Button>
                  </Link>
                ) : plan.id === "free" ? (
                  <div className="text-slate-400 text-center font-medium py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-sm">
                    Limited access - Upgrade to unlock all features
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    variant={plan.popular ? "primary" : "outline"}
                    loading={loadingPlan === plan.id}
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    {plan.cta}
                  </Button>
                )}

                <div className="mt-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
