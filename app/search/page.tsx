"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, X, ClockCounterClockwise, MapPin, ArrowRight } from "@phosphor-icons/react";
import { CategoryIcon } from "@/components/CategoryIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { getAllExploreItems, getAllLocations } from "@/lib/mock-data";
import type { SubjectType } from "@/lib/types";

const RECENT_KEY = "ofie:recent-searches";
const MAX_RECENT = 6;

interface KeywordSuggestion {
  label: string;
  type: SubjectType;
}

// Curated keyword suggestions standing in for a real search index, so typing
// a category-ish term (or landing with an empty query) surfaces something
// beyond literal entity-name matches.
const KEYWORD_SUGGESTIONS: KeywordSuggestion[] = [
  { label: "Automobile works", type: "service" },
  { label: "Electric fault finding", type: "service" },
  { label: "Spa day", type: "service" },
  { label: "Jollof", type: "restaurant" },
  { label: "Buka kitchen", type: "restaurant" },
  { label: "Hostel rooms", type: "hostel" },
  { label: "Estate agents", type: "agent" },
  { label: "Online sellers", type: "online_seller" },
];

type ResultRow =
  | { kind: "entity"; id: string; label: string; sublabel: string; type: SubjectType; href: string }
  | { kind: "location"; id: string; label: string; href: string }
  | { kind: "keyword"; id: string; label: string; type: SubjectType; href: string };

function readRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function SearchPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecent(readRecent());
    setHydrated(true);
    inputRef.current?.focus();
  }, []);

  const allItems = useMemo(() => getAllExploreItems(), []);
  const allLocations = useMemo(() => getAllLocations(), []);

  const results: ResultRow[] = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      // Nothing typed yet: surface a short, mixed "trending" list so the
      // page isn't empty on first open.
      const trendingEntities = allItems.slice(0, 2).map((item) => ({
        kind: "entity" as const,
        id: item.id,
        label: item.name,
        sublabel: item.area,
        type: item.kind as SubjectType,
        href: item.href,
      }));
      const trendingLocations = allLocations.slice(0, 1).map((loc) => ({
        kind: "location" as const,
        id: loc,
        label: loc,
        href: `/?area=${encodeURIComponent(loc)}`,
      }));
      const trendingKeywords = KEYWORD_SUGGESTIONS.slice(0, 2).map((k) => ({
        kind: "keyword" as const,
        id: k.label,
        label: k.label,
        type: k.type,
        href: `/?cat=${k.type === "restaurant" ? "food" : k.type}`,
      }));
      return [...trendingEntities, ...trendingLocations, ...trendingKeywords];
    }

    const entityResults: ResultRow[] = allItems
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.area.toLowerCase().includes(q) ||
          item.city.toLowerCase().includes(q)
      )
      .slice(0, 8)
      .map((item) => ({
        kind: "entity",
        id: item.id,
        label: item.name,
        sublabel: item.area,
        type: item.kind as SubjectType,
        href: item.href,
      }));

    const locationResults: ResultRow[] = allLocations
      .filter((loc) => loc.toLowerCase().includes(q))
      .slice(0, 4)
      .map((loc) => ({
        kind: "location",
        id: loc,
        label: loc,
        href: `/?area=${encodeURIComponent(loc)}`,
      }));

    const keywordResults: ResultRow[] = KEYWORD_SUGGESTIONS.filter((k) =>
      k.label.toLowerCase().includes(q)
    ).map((k) => ({
      kind: "keyword",
      id: k.label,
      label: k.label,
      type: k.type,
      href: `/?cat=${k.type === "restaurant" ? "food" : k.type}`,
    }));

    return [...entityResults, ...locationResults, ...keywordResults];
  }, [query, allItems, allLocations]);

  function saveRecent(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;
    const next = [trimmed, ...recent.filter((r) => r.toLowerCase() !== trimmed.toLowerCase())].slice(
      0,
      MAX_RECENT
    );
    setRecent(next);
    try {
      window.sessionStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      // ignore storage failures
    }
  }

  function handleSelectResult(row: ResultRow) {
    saveRecent(row.label);
    router.push(row.href);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) saveRecent(query);
  }

  return (
    <div className="fixed inset-0 z-40 mx-auto flex w-full max-w-120 flex-col bg-surface">
      <div className="flex shrink-0 items-center gap-2 bg-surface px-4 pt-4 pb-3">
        <Link
          href="/"
          aria-label="Go back"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bg text-ink shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <form onSubmit={handleSubmit} className="relative flex-1">
          <SearchIcon
            size={20}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search"
            aria-label="Search"
            autoComplete="off"
            className="h-11 w-full appearance-none rounded-full border border-line bg-bg pl-10 pr-10 text-sm text-ink placeholder:text-ink-2 focus-visible:outline-none [&::-webkit-search-cancel-button]:appearance-none"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-ink-2"
            >
              <X size={16} />
            </button>
          )}
        </form>
      </div>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto overscroll-contain px-4 pb-10 pt-1">
        {hydrated && recent.length > 0 && query.trim().length === 0 && (
          <div>
            <h2 className="mb-2 font-display text-sm font-semibold text-ink">Recent</h2>
            <div className="flex flex-wrap gap-2">
              {recent.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink"
                >
                  <ClockCounterClockwise size={14} />
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        <ul className="flex flex-col divide-y divide-line">
          {results.map((row) => (
            <li key={`${row.kind}-${row.id}`}>
              <button
                type="button"
                onClick={() => handleSelectResult(row)}
                className="flex min-h-14 w-full items-center gap-3 py-3 text-left active:opacity-60"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-ink">
                  {row.kind === "location" ? (
                    <MapPin size={18} />
                  ) : (
                    <CategoryIcon type={row.type} size={18} />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">{row.label}</span>
                  {row.kind === "entity" && (
                    <span className="block truncate text-xs text-ink-2">{row.sublabel}</span>
                  )}
                </span>
                <ArrowRight size={18} className="shrink-0 text-ink-2" />
              </button>
            </li>
          ))}
        </ul>

        {results.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-2">No matches for &ldquo;{query}&rdquo;.</p>
        )}
      </div>
    </div>
  );
}
