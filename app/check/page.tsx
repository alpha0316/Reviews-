"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ShieldWarning, ShieldCheck, MagnifyingGlass } from "@phosphor-icons/react";
import { TopBar } from "@/components/TopBar";
import { SELLERS } from "@/lib/mock-data";

export default function CheckBeforeYouPayPage() {
  const [query, setQuery] = useState("");
  const [checked, setChecked] = useState(false);

  const match = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/[\s@]/g, "");
    if (!q) return undefined;
    return SELLERS.find((s) =>
      s.handles.some((h) => h.handle.toLowerCase().replace(/[\s@]/g, "").includes(q)) ||
      s.pastHandles.some((h) => h.toLowerCase().replace(/[\s@]/g, "").includes(q)) ||
      s.momoMasked.replace(/\s/g, "").includes(q)
    );
  }, [query]);

  return (
    <div className="flex flex-col">
      <TopBar title="Check before you pay" backHref="/" />

      <div className="px-4 pt-4">
        <p className="text-sm text-ink-2">
          Paste a seller&apos;s Instagram/WhatsApp handle, or MoMo number, before you send money.
          We match against handles, past handles, and reported MoMo numbers.
        </p>

        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setChecked(true);
          }}
        >
          <label className="relative flex-1">
            <span className="sr-only">Handle or MoMo number</span>
            <MagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-2" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setChecked(false);
              }}
              placeholder="@handle or 02X XXX XXXX"
              className="h-11 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm text-ink placeholder:text-ink-2 focus-visible:outline-none"
            />
          </label>
          <button
            type="submit"
            className="min-h-11 rounded-full bg-brand px-5 text-sm font-semibold text-white"
          >
            Check
          </button>
        </form>

        {checked && (
          <div className="mt-6">
            {match ? (
              <div className="rounded-2xl border border-bad bg-bad-bg p-4">
                <p className="flex items-center gap-2 font-display text-sm font-semibold text-bad">
                  <ShieldWarning className="h-5 w-5" /> Reports found
                </p>
                <p className="mt-1 text-sm text-ink">
                  &ldquo;{match.displayName}&rdquo; has {match.reviewCount} reports and a score of{" "}
                  {match.overallScore.toFixed(1)}/10.
                </p>
                <Link
                  href={`/seller/${match.slug}`}
                  className="mt-3 inline-block text-sm font-medium text-brand underline"
                >
                  View full report
                </Link>
              </div>
            ) : (
              <div className="rounded-2xl border border-good bg-good-bg p-4">
                <p className="flex items-center gap-2 font-display text-sm font-semibold text-good">
                  <ShieldCheck className="h-5 w-5" /> No reports found
                </p>
                <p className="mt-1 text-sm text-ink">
                  Nothing matches this handle or number yet. That doesn&apos;t guarantee it&apos;s safe
                  &mdash; only that Ofie has no reports on it so far.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
