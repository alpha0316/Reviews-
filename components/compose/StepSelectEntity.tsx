"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass, Check, ArrowRight, Plus } from "@phosphor-icons/react";
import { CategoryIcon } from "@/components/CategoryIcon";
import { getAllExploreItems } from "@/lib/mock-data";
import { CATS } from "@/lib/categories";
import type { SubjectType } from "@/lib/types";

const SELLER_PLATFORMS = ["Instagram", "Snapchat", "TikTok", "WhatsApp", "Facebook"] as const;

export function StepSelectEntity({
  subjectType,
  title,
  entitySubjectId,
  sellerPlatform,
  sellerHandle,
  onSelectExisting,
  onAddNew,
  onChangeSellerPlatform,
  onChangeSellerHandle,
}: {
  subjectType?: SubjectType;
  title: string;
  entitySubjectId?: string;
  sellerPlatform: string;
  sellerHandle: string;
  onSelectExisting: (id: string, name: string) => void;
  onAddNew: (name: string) => void;
  onChangeSellerPlatform: (platform: string) => void;
  onChangeSellerHandle: (handle: string) => void;
}) {
  const [query, setQuery] = useState(title);

  const allItems = useMemo(() => getAllExploreItems(), []);

  const results = useMemo(() => {
    if (!subjectType) return [];
    const q = query.trim().toLowerCase();
    const sameType = allItems.filter((item) => item.kind === subjectType);
    if (!q) return sameType.slice(0, 6);
    return sameType.filter((item) => item.name.toLowerCase().includes(q));
  }, [allItems, subjectType, query]);

  if (subjectType === "online_seller") {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="font-display text-xl font-bold text-ink">Who are you reporting?</h1>
          <p className="mt-1 text-sm text-ink-2">
            Pick the platform they sell on, then enter their handle or page name.
          </p>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-ink">Platform</p>
          <div className="grid grid-cols-3 gap-2">
            {SELLER_PLATFORMS.map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={sellerPlatform === p}
                onClick={() => onChangeSellerPlatform(p)}
                className={`flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  sellerPlatform === p
                    ? "bg-ink text-white"
                    : "bg-surface-2 text-ink hover:bg-brand-soft"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="seller-handle" className="mb-1 block text-sm font-medium text-ink">
            Handle or page name
          </label>
          <input
            id="seller-handle"
            value={sellerHandle}
            onChange={(e) => onChangeSellerHandle(e.target.value)}
            placeholder="@handle or page name"
            className="min-h-11 w-full rounded-xl border border-line bg-surface px-4 text-sm text-ink placeholder:text-ink-2 focus-visible:outline-none"
          />
          <p className="mt-1 text-xs text-ink-2">
            This is matched against past handles too, so reports stay linked even if they rebrand.
          </p>
        </div>
      </div>
    );
  }

  const categoryLabel = subjectType ? CATS[subjectType].label : "entity";

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">Who or what is this about?</h1>
        <p className="mt-1 text-sm text-ink-2">
          Search for an existing {categoryLabel.toLowerCase()}, or add a new one.
        </p>
      </div>

      <label className="relative flex items-center">
        <MagnifyingGlass
          size={18}
          weight="fill"
          className="pointer-events-none absolute left-3 text-ink-2"
        />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (entitySubjectId) onSelectExisting("", "");
          }}
          placeholder={`Search ${categoryLabel.toLowerCase()}s`}
          aria-label="Search for an entity"
          className="h-11 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm text-ink placeholder:text-ink-2 focus-visible:outline-none"
        />
      </label>

      {entitySubjectId && (
        <div className="flex items-center gap-2 rounded-xl bg-brand-soft px-3 py-2 text-sm text-brand">
          <Check size={16} weight="bold" />
          Selected: <span className="font-medium">{title}</span>
        </div>
      )}

      {!entitySubjectId && results.length > 0 && (
        <ul className="flex flex-col divide-y divide-line overflow-hidden rounded-2xl bg-surface shadow-sm">
          {results.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  onSelectExisting(item.id, item.name);
                  setQuery(item.name);
                }}
                className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left active:opacity-60"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-ink">
                  <CategoryIcon type={item.kind} size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">{item.name}</span>
                  <span className="block truncate text-xs text-ink-2">{item.area}</span>
                </span>
                <ArrowRight size={16} className="shrink-0 text-ink-2" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {!entitySubjectId && query.trim().length > 0 && (
        <button
          type="button"
          onClick={() => onAddNew(query.trim())}
          className="flex min-h-14 items-center gap-3 rounded-2xl border border-dashed border-line px-4 py-3 text-left active:opacity-60"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-ink">
            <Plus size={18} weight="bold" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium text-ink">
              Can&apos;t find it? Add &ldquo;{query.trim()}&rdquo;
            </span>
            <span className="block text-xs text-ink-2">
              It&apos;ll be reviewed before it&apos;s shown publicly.
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
