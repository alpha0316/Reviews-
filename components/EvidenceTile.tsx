import Link from "next/link";
import type { EvidenceItem } from "@/lib/types";

export function EvidenceTile({ item, subjectSlug }: { item: EvidenceItem; subjectSlug: string }) {
  return (
    <Link
      href={`/s/${subjectSlug}/evidence/${item.id}`}
      className={`flex aspect-[176/128] flex-col justify-end rounded-2xl ${item.thumbnailTone} p-3 shadow-sm transition-transform hover:-translate-y-0.5 active:scale-95`}
    >
      <p className="text-sm font-medium text-ink/70">{item.category}</p>
    </Link>
  );
}
