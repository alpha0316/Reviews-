"use client";

import { Star } from "@phosphor-icons/react";
import { CATS } from "@/lib/categories";
import type { SubjectType } from "@/lib/types";

const STAR_LABELS = ["Poor", "Fair", "Satisfied", "Good", "Excellent"];

export function StepRateExperience({
  subjectType,
  overallStars,
  criteriaRatings,
  onChangeOverallStars,
  onRateCriterion,
}: {
  subjectType?: SubjectType;
  overallStars: number;
  criteriaRatings: Record<string, number>;
  onChangeOverallStars: (n: number) => void;
  onRateCriterion: (key: string, value: number) => void;
}) {
  const cat = subjectType ? CATS[subjectType] : undefined;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2" role="radiogroup" aria-label="Overall rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={overallStars === n}
              aria-label={`${n} star${n === 1 ? "" : "s"}`}
              onClick={() => onChangeOverallStars(n)}
              className="flex h-11 w-11 items-center justify-center"
            >
              <Star
                size={32}
                weight={n <= overallStars ? "fill" : "regular"}
                className={n <= overallStars ? "text-accent" : "text-line"}
              />
            </button>
          ))}
        </div>
        {overallStars > 0 && (
          <p className="text-sm text-ink-2">{STAR_LABELS[overallStars - 1]}</p>
        )}
      </div>

      {cat && cat.criteria.length > 0 && (
        <div className="rounded-2xl bg-surface p-4 shadow-sm">
          <h2 className="font-display text-sm font-semibold text-ink">
            Rate the details <span className="font-normal text-ink-2">(optional)</span>
          </h2>
          <div className="mt-3 flex flex-col gap-3">
            {cat.criteria.map((c) => (
              <div key={c.key} className="flex items-center justify-between">
                <span className="text-sm text-ink">{c.label}</span>
                <div className="flex gap-1.5" role="radiogroup" aria-label={c.label}>
                  {[1, 2, 3, 4, 5].map((n) => {
                    const selected = criteriaRatings[c.key] === n;
                    return (
                      <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => onRateCriterion(c.key, n)}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                          selected
                            ? "bg-ink text-white"
                            : "bg-surface-2 text-ink-2 hover:bg-line"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
