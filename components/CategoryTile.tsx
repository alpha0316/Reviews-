import Link from "next/link";
import { Compass } from "@phosphor-icons/react/ssr";
import { CategoryIcon } from "./CategoryIcon";
import type { SubjectType } from "@/lib/types";

export function CategoryTile({
  type,
  label,
  href,
  isAll = false,
  active = false,
}: {
  type: SubjectType;
  label: string;
  href: string;
  isAll?: boolean;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="flex min-h-11 shrink-0 flex-col items-center gap-1.5 px-2 py-1 transition-transform active:scale-90"
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full ${
          active ? "bg-ink text-white" : "bg-bg text-ink shadow-sm"
        }`}
      >
        {isAll ? (
          <Compass size={20} weight="fill" />
        ) : (
          <CategoryIcon type={type} size={20} />
        )}
      </span>
      <span className={`text-xs ${active ? "font-semibold text-ink" : "font-medium text-ink-2"}`}>
        {label}
      </span>
    </Link>
  );
}
