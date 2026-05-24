"use client";

import Link from "next/link";
import { useAuth } from "@/app/lib/hooks";
import { PRICING_PLANS } from "@/app/lib/constants";
import { Button } from "@/app/components/common/Button";
import { Check } from "lucide-react";

export default function PricingPage() {
  const { isAuthenticated } = useAuth();

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
                  {plan.price > 0 && (
                    <p className="text-gray-400 text-sm mt-2">
                      Billed monthly. Cancel anytime.
                    </p>
                  )}
                </div>

                <Link
                  href={isAuthenticated ? "/dashboard" : "/signup"}
                  className="w-full block"
                >
                  <Button
                    className="w-full"
                    variant={plan.popular ? "primary" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>

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

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-left">
              <h4 className="font-semibold text-white mb-2">
                Can I change plans?
              </h4>
              <p className="text-gray-400">
                Yes! Upgrade or downgrade anytime. Changes take effect on your
                next billing cycle.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-left">
              <h4 className="font-semibold text-white mb-2">
                Is there a free trial?
              </h4>
              <p className="text-gray-400">
                Yes! Pro and Enterprise plans include a 7-day free trial. No
                credit card required.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-left">
              <h4 className="font-semibold text-white mb-2">
                Do you offer refunds?
              </h4>
              <p className="text-gray-400">
                Full refund within 30 days of purchase if you&apos;re not
                satisfied.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-left">
              <h4 className="font-semibold text-white mb-2">
                What about team plans?
              </h4>
              <p className="text-gray-400">
                Enterprise plans support multiple team members. Contact us for
                custom pricing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
