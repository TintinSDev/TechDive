"use client";

import Image from "next/image";
import { Job } from "@/app/lib/types"; // Adjusted paths based on standard @/ aliases
import { Button } from "@/app/components/common/Button";
import { useState } from "react";

interface JobDetailProps {
  job: Job;
  isSaved?: boolean;
  onSave?: () => Promise<void>;
}

export const JobDetail: React.FC<JobDetailProps> = ({
  job,
  isSaved = false,
  onSave,
}) => {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (onSave) {
      setSaving(true);
      try {
        await onSave();
      } finally {
        setSaving(false);
      }
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatSalary = (salary: number | null) => {
    if (!salary) return null;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(salary);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8">
        <div className="flex justify-between items-start gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
            <p className="text-xl text-blue-100">{job.company}</p>

            {job.companyLogo && (
              <div className="relative h-12 w-32 mt-4">
                <Image
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  fill
                  className="object-contain object-left"
                  unoptimized // Crucial for random external scraped job URLs
                />
              </div>
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            aria-label={isSaved ? "Remove from saved jobs" : "Save this job"}
            className={`px-6 py-3 rounded-lg font-semibold transition text-2xl hover:scale-110 ${
              isSaved ? "text-red-400" : "text-white"
            }`}
          >
            {isSaved ? "❤️" : "🤍"}
          </button>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-gray-50 border-b">
        <div>
          <p className="text-sm text-gray-600">Job Type</p>
          <p className="font-semibold text-gray-900 capitalize">{job.type}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Experience</p>
          <p className="font-semibold text-gray-900 capitalize">
            {job.experience}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Location</p>
          <p className="font-semibold text-gray-900">
            {job.location || "Remote"}
          </p>
        </div>
        {job.salary && (
          <div>
            <p className="text-sm text-gray-600">Salary</p>
            <p className="font-semibold text-green-600">
              {formatSalary(job.salary)}
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            About the Role
          </h2>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {job.description}
            </p>
          </div>
        </div>

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Requirements
            </h2>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-blue-600 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        {job.benefits && job.benefits.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {job.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex gap-3 bg-green-50 p-3 rounded-lg"
                >
                  <span className="text-green-600 flex-shrink-0">🎁</span>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Meta Info */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-gray-600">Posted</p>
              <p className="font-semibold text-gray-900">
                {formatDate(job.postedAt)}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Source</p>
              <p className="font-semibold text-gray-900 capitalize">
                {job.source}
              </p>
            </div>
            {job.expiresAt && (
              <div>
                <p className="text-gray-600">Expires</p>
                <p className="font-semibold text-gray-900">
                  {formatDate(job.expiresAt)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t p-8 bg-gray-50">
        <div className="flex gap-4">
          <a
            href={job.applyUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button className="w-full" size="lg">
              Apply Now →
            </Button>
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-semibold"
          >
            {isSaved ? "❤️ Saved" : "🤍 Save"}
          </button>
        </div>
        {job.applyUrl && (
          <p className="text-sm text-gray-500 mt-4">
            You&apos;ll be redirected to the company&apos;s application page
          </p>
        )}
      </div>
    </div>
  );
};
