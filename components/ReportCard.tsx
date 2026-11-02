import Link from "next/link";
import { EntityAvatarBadge } from "./EntityAvatarBadge";
import { EntityStatRow } from "./EntityStatRow";
import type { ReportedRecentItem } from "@/lib/types";

export function ReportCard({ item }: { item: ReportedRecentItem }) {
  return (
    <Link
      href={`/s/${item.subjectId}`}
      className="flex w-64 shrink-0 flex-col overflow-hidden rounded-xl outline outline-1 outline-offset-[-1px] outline-black/5 transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
    >
      <div className="flex items-center gap-[11px] border-b border-black/5 bg-[#FAFAFA] p-1.5">
        <EntityAvatarBadge name={item.name} size={32} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-black">{item.name}</p>
          <p className="truncate text-xs uppercase text-black/50">
            {item.kind} &middot; {item.city}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-surface px-1.5 pb-2 pt-2.5">
        <p className="line-clamp-2 text-[13px] leading-[1.36] text-black/80">
          &ldquo;{item.quote}&rdquo;
        </p>
        <EntityStatRow reviewCount={item.reviewCount} receiptCount={item.receiptCount} daysAgo={item.daysAgo} />
      </div>
    </Link>
  );
}
