"use client";

import { useMemo } from "react";
import { Shield, Warning, CalendarBlank } from "@phosphor-icons/react";
import { detectIdentityRisks } from "@/lib/identity-risk";
import type { SubjectType } from "@/lib/types";

const HOUSING_TYPES = new Set<SubjectType>(["estate", "hostel", "landlord", "hostel_manager"]);

export function StepTellYourStory({
  subjectType,
  entityName,
  story,
  durationFrom,
  durationTo,
  amount,
  onChangeStory,
  onChangeDurationFrom,
  onChangeDurationTo,
  onChangeAmount,
}: {
  subjectType?: SubjectType;
  entityName: string;
  story: string;
  durationFrom: string;
  durationTo: string;
  amount: number;
  onChangeStory: (v: string) => void;
  onChangeDurationFrom: (v: string) => void;
  onChangeDurationTo: (v: string) => void;
  onChangeAmount: (v: number) => void;
}) {
  const risks = useMemo(() => detectIdentityRisks(story), [story]);
  const showExtraDetails = HOUSING_TYPES.has(subjectType ?? "other");

  return (
    <div className="flex flex-col gap-4">
      {entityName && (
        <p className="text-xs font-medium uppercase tracking-wide text-ink-2">
          Reporting <span className="text-ink">{entityName}</span>
        </p>
      )}

      <label htmlFor="report-story" className="sr-only">
        What happened?
      </label>
      <textarea
        id="report-story"
        value={story}
        onChange={(e) => onChangeStory(e.target.value)}
        placeholder="What happened?"
        rows={6}
        className="w-full resize-none bg-transparent text-base text-ink placeholder:text-ink-2/70 focus-visible:outline-none"
      />

      {showExtraDetails && (
        <div className="rounded-2xl bg-surface p-4 shadow-sm">
          <h2 className="font-display text-sm font-semibold text-ink">Extra Details</h2>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-ink">Duration</span>
            <div className="flex gap-2">
              <DatePill label="From" value={durationFrom} onChange={onChangeDurationFrom} />
              <DatePill label="To" value={durationTo} onChange={onChangeDurationTo} />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-ink">Rent you paid</span>
            <label className="flex items-center gap-1 rounded-full bg-surface-2 px-3 py-1.5 text-sm text-ink">
              GHC
              <input
                type="number"
                min={0}
                value={amount || ""}
                onChange={(e) => onChangeAmount(Number(e.target.value) || 0)}
                aria-label="Rent you paid, in Ghana cedis"
                className="w-14 bg-transparent text-right focus-visible:outline-none"
              />
            </label>
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 rounded-2xl bg-surface-2 p-3">
        <Shield size={18} weight="fill" className="mt-0.5 shrink-0 text-brand" />
        <p className="text-xs text-ink-2">
          Nothing here points to you. Avoid mentioning things only you would know, like a
          specific argument or your course.
        </p>
      </div>

      {risks.length > 0 && (
        <div role="alert" className="flex flex-col gap-2 rounded-2xl bg-mid-bg p-3">
          <p className="flex items-center gap-2 text-xs font-semibold text-mid">
            <Warning size={16} weight="fill" /> Possible identifying details found
          </p>
          <ul className="flex flex-col gap-1 text-xs text-ink">
            {risks.map((r, i) => (
              <li key={`${r.kind}-${i}`}>
                <span className="font-mono">&ldquo;{r.match}&rdquo;</span> &mdash; {r.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DatePill({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="relative flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1.5 text-sm text-ink">
      <CalendarBlank size={16} />
      {value || label}
      <input
        type="month"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </label>
  );
}
