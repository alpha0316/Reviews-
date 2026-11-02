"use client";

import { Check } from "@phosphor-icons/react";
import { evidenceCategoriesFor } from "@/lib/evidence-categories";
import { CONTENT_POLICY_POINTS } from "@/lib/copy";
import type { SubjectType } from "@/lib/types";

export function StepEvidence({
  subjectType,
  selected,
  onToggle,
}: {
  subjectType?: SubjectType;
  selected: string[];
  onToggle: (key: string) => void;
}) {
  const categories = evidenceCategoriesFor(subjectType);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-ink-2">
        Photos make reports more useful. Each file gets an exhibit number, and we strip its
        capture date and location before it&apos;s shown.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((c) => {
          const isSelected = selected.includes(c.key);
          return (
            <button
              key={c.key}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggle(c.key)}
              className={`relative flex aspect-[176/128] flex-col justify-end rounded-2xl ${c.tone} p-3 text-left shadow-sm transition-transform hover:-translate-y-0.5`}
            >
              {isSelected && (
                <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-white">
                  <Check size={14} weight="bold" />
                </span>
              )}
              <span className="text-sm font-medium text-ink/70">{c.label}</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl bg-surface-2 p-3">
        <p className="mb-1 text-xs font-semibold text-ink">Before you submit</p>
        <ul className="list-disc space-y-0.5 pl-4 text-xs text-ink-2">
          {CONTENT_POLICY_POINTS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
