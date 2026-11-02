"use client";

import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";

export function TopBar({
  title,
  subtitle,
  backHref,
  sticky = true,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
  /** Set false when an ancestor is already `sticky` — nesting sticky
   * elements triggers a hit-testing bug on iOS Safari where taps inside
   * the nested sticky element land on stale coordinates. */
  sticky?: boolean;
}) {
  return (
    <header
      className={`flex items-center gap-3 bg-bg px-4 py-3 ${sticky ? "sticky top-0 z-30" : ""}`}
    >
      {backHref && (
        <Link
          href={backHref}
          aria-label="Go back"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-ink shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
      )}
      <div className="min-w-0 flex-1 text-center">
        <h1 className="truncate font-display text-base font-semibold text-ink">{title}</h1>
        {subtitle && <p className="truncate text-xs text-ink-2">{subtitle}</p>}
      </div>
      {backHref && <div className="h-11 w-11 shrink-0" aria-hidden />}
    </header>
  );
}
