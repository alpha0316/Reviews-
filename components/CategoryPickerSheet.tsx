"use client";

import { useRouter } from "next/navigation";
import { X } from "@phosphor-icons/react";
import { CategoryIcon } from "./CategoryIcon";
import type { SubjectType } from "@/lib/types";

const SHEET_CATEGORIES: { type: SubjectType; label: string }[] = [
  { type: "restaurant", label: "Restaurant" },
  { type: "company", label: "Company" },
  { type: "online_seller", label: "Online Seller" },
  { type: "service", label: "Shop & Service" },
  { type: "hostel", label: "Hostel" },
  { type: "estate", label: "Estate" },
  { type: "landlord", label: "Landlord" },
  { type: "agent", label: "Agent" },
];

export function CategoryPickerSheet({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  function handleSelect(type: SubjectType) {
    onClose();
    router.push(`/review/new?type=${type}`);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="Close category picker"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40"
      />
      <div className="relative z-10 mx-auto w-full max-w-[480px] px-4 pb-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Choose a category"
          className="rounded-3xl bg-surface p-4 shadow-xl"
        >
          <div className="grid grid-cols-2 gap-2">
            {SHEET_CATEGORIES.map((c) => (
              <button
                key={c.type}
                type="button"
                onClick={() => handleSelect(c.type)}
                className="flex min-h-11 flex-col items-start gap-2 rounded-2xl bg-surface-2 px-4 py-3 text-left transition-colors hover:bg-brand-soft active:bg-brand-soft active:opacity-80"
              >
                <CategoryIcon type={c.type} size={18} className="text-ink-2" />
                <span className="text-sm font-medium text-ink">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-ink shadow-lg"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
