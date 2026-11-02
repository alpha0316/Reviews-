"use client";

import { useEffect, useState } from "react";
import { FileText } from "@phosphor-icons/react";
import { TopBar } from "@/components/TopBar";

interface DraftReview {
  id: string;
  subjectType?: string;
  subjectQuery?: string;
  city?: string;
  body: string;
  createdAt: string;
}

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<DraftReview[]>([]);

  useEffect(() => {
    // One-time read of sessionStorage on mount: client-only data, so it
    // can't be part of the initial server-rendered markup.
    try {
      const raw = window.sessionStorage.getItem("ofie:my-reviews");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReviews(raw ? JSON.parse(raw) : []);
    } catch {
      setReviews([]);
    }
  }, []);

  return (
    <div className="flex flex-col">
      <TopBar title="My reviews" />
      <div className="px-4 pt-4">
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <FileText className="h-10 w-10 text-ink-2" />
            <p className="text-sm text-ink-2">
              You haven&apos;t written any reports yet. Reports you submit show here, tied
              only to your account &mdash; never shown publicly.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {reviews.map((r) => (
              <li key={r.id} className="rounded-2xl bg-surface p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wide text-ink-2">
                    {r.subjectType?.replace("_", " ") ?? "Report"}
                  </span>
                  <span className="rounded-full bg-mid-bg px-2 py-0.5 text-[11px] font-medium text-mid">
                    Pending publish
                  </span>
                </div>
                <p className="mt-1 font-semibold text-ink">{r.subjectQuery ?? "Untitled"}</p>
                <p className="mt-1 line-clamp-2 text-sm text-ink-2">{r.body}</p>
                <p className="mt-2 text-xs text-ink-2">
                  Submitted {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
