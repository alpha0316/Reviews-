"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChatCircle, Receipt, ShieldCheck, TrendUp } from "@phosphor-icons/react";
import { TopBar } from "./TopBar";
import { ScoreStamp } from "./ScoreStamp";
import { CriteriaBar } from "./CriteriaBar";
import { TagChip } from "./TagChip";
import { EvidenceTile } from "./EvidenceTile";
import { MaskAvatar } from "./MaskAvatar";
import type { Review, Subject } from "@/lib/types";

const TABS = ["General", "Evidence", "Reviews"] as const;
type Tab = (typeof TABS)[number];

function toneFor(score: number): "bad" | "mid" | "good" {
  if (score < 4) return "bad";
  if (score < 7) return "mid";
  return "good";
}

export function SubjectProfile({ subject, reviews }: { subject: Subject; reviews: Review[] }) {
  const [tab, setTab] = useState<Tab>("General");

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-30 bg-bg">
        <TopBar title={subject.name} subtitle={subject.area} backHref="/" sticky={false} />

        <div className="border-b border-line px-4 pb-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pb-3 text-sm text-ink-2">
            {subject.priceGhc && (
              <span>
                GH₵ {subject.priceGhc.toLocaleString()} / {subject.priceUnit}
              </span>
            )}
            {subject.bedrooms && <span>{subject.bedrooms}-bedroom</span>}
            {subject.yearsTracked && (
              <span>
                {subject.yearsTracked} {subject.yearsTracked === 1 ? "year" : "years"} tracked
              </span>
            )}
          </div>

          <div role="tablist" aria-label="Subject sections" className="flex gap-6">
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`min-h-11 border-b-2 px-1 text-sm font-medium transition-colors active:opacity-60 ${
                  tab === t
                    ? "border-ink text-ink"
                    : "border-transparent text-ink-2 hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-24 pt-4">
        {tab === "General" && <GeneralTab subject={subject} />}
        {tab === "Evidence" && <EvidenceTab subject={subject} />}
        {tab === "Reviews" && <ReviewsTab subject={subject} reviews={reviews} />}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[480px] bg-bg px-4 pb-[max(env(safe-area-inset-bottom),16px)] pt-3">
        <Link
          href={`/review/new?subject=${subject.id}`}
          className="flex min-h-12 w-full items-center justify-center rounded-full bg-ink font-semibold text-white shadow-[0_8px_24px_-8px_rgba(20,20,20,0.5)] transition-opacity hover:opacity-90"
        >
          Write a report
        </Link>
      </div>
    </div>
  );
}

function GeneralTab({ subject }: { subject: Subject }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-surface p-4 shadow-sm">
        <ScoreStamp score={subject.overallScore} />
        <div className="mt-3 flex items-center gap-4 text-xs text-ink-2">
          <span className="flex items-center gap-1">
            <ChatCircle size={14} /> {subject.reviewCount} Reviews
          </span>
          <span className="flex items-center gap-1">
            <Receipt size={14} /> {subject.receiptCount} Receipts
          </span>
        </div>
        <Link
          href="/about/verification"
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand"
        >
          <ShieldCheck size={14} weight="fill" /> How we verify reviews
        </Link>
      </div>

      {subject.redFlags.length > 0 && (
        <div className="rounded-2xl bg-surface p-4 shadow-sm">
          <h3 className="font-display text-sm font-semibold text-bad">Red flags people reported</h3>
          <div className="mt-2">
            {subject.redFlags.map((f) => (
              <CriteriaBar key={f.key} label={f.label} score={f.count} tone="bad" />
            ))}
          </div>
        </div>
      )}

      {subject.praise.length > 0 && (
        <div className="rounded-2xl bg-surface p-4 shadow-sm">
          <h3 className="font-display text-sm font-semibold text-good">What people praise</h3>
          <div className="mt-2">
            {subject.praise.map((p) => (
              <CriteriaBar key={p.key} label={p.label} score={p.count} tone="good" />
            ))}
          </div>
        </div>
      )}

      {subject.criteria.length > 0 && (
        <div className="rounded-2xl bg-surface p-4 shadow-sm">
          <h3 className="font-display text-sm font-semibold text-ink">Criteria scores</h3>
          <div className="mt-2">
            {subject.criteria.map((c) => (
              <CriteriaBar key={c.key} label={c.label} score={c.score} tone={toneFor(c.score)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EvidenceTab({ subject }: { subject: Subject }) {
  if (subject.evidence.length === 0) {
    return <p className="mt-6 text-center text-sm text-ink-2">No evidence uploaded yet.</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-3">
      {subject.evidence.map((item) => (
        <EvidenceTile key={item.id} item={item} subjectSlug={subject.slug} />
      ))}
    </div>
  );
}

const SORTS = ["Most Helpful", "Newest", "Oldest"] as const;
type Sort = (typeof SORTS)[number];

function ReviewsTab({ subject, reviews }: { subject: Subject; reviews: Review[] }) {
  const [sort, setSort] = useState<Sort>("Most Helpful");

  const trending = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of reviews) {
      for (const t of r.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key, count]) => {
        const tag = subject.redFlags.find((f) => f.key === key) ?? subject.praise.find((f) => f.key === key);
        return { key, label: tag?.label ?? key, severity: tag?.severity ?? "bad", count };
      });
  }, [reviews, subject]);

  const sorted = useMemo(() => {
    const list = [...reviews];
    if (sort === "Most Helpful") list.sort((a, b) => b.helpfulCount - a.helpfulCount);
    else if (sort === "Newest") list.reverse();
    return list;
  }, [reviews, sort]);

  if (reviews.length === 0) {
    return <p className="mt-6 text-center text-sm text-ink-2">No reviews yet.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {trending.length > 0 && (
        <div className="rounded-2xl bg-surface-2 p-3">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-ink">
            <TrendUp size={14} weight="fill" className="text-brand" /> Trending in reviews
          </p>
          <div className="flex flex-wrap gap-1.5">
            {trending.map((t) => (
              <TagChip key={t.key} label={`${t.label} (${t.count})`} severity={t.severity} />
            ))}
          </div>
        </div>
      )}

      <div
        role="tablist"
        aria-label="Sort reviews"
        className="-mx-4 flex gap-2 overflow-x-auto px-4"
      >
        {SORTS.map((s) => (
          <button
            key={s}
            role="tab"
            type="button"
            aria-selected={sort === s}
            onClick={() => setSort(s)}
            className={`min-h-9 shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors active:opacity-60 ${
              sort === s ? "bg-ink text-white" : "bg-surface-2 text-ink-2"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {sorted.map((r) => (
          <article key={r.id} className="rounded-2xl bg-surface p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <MaskAvatar size={32} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">{r.author.alias}</p>
                <p className="text-xs text-ink-2">{r.monthYear}</p>
              </div>
              <span className="font-display text-sm font-bold text-ink">{r.overallScore.toFixed(1)}</span>
            </div>
            <p className="mt-2 text-sm text-ink">{r.body}</p>
            {r.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {r.tags.map((t) => {
                  const tag = subject.redFlags.find((f) => f.key === t) ?? subject.praise.find((f) => f.key === t);
                  return (
                    <TagChip
                      key={t}
                      label={tag?.label ?? t}
                      severity={tag?.severity ?? "bad"}
                    />
                  );
                })}
              </div>
            )}
            <div className="mt-3 flex items-center gap-4 border-t border-line pt-2 text-xs text-ink-2">
              {r.proofCount > 0 && (
                <span className="flex items-center gap-1">
                  <Receipt size={14} /> {r.proofCount} proof file{r.proofCount === 1 ? "" : "s"}
                </span>
              )}
              <span>{r.helpfulCount} found this helpful</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
