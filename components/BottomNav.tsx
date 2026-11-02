"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, ListChecks, Plus } from "@phosphor-icons/react";
import { UserAvatarBadge } from "./UserAvatarBadge";
import { CategoryPickerSheet } from "./CategoryPickerSheet";

const PILL_SHADOW = "shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05),0px_1px_4px_0px_rgba(12,12,13,0.10)]";

export function BottomNav() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  const hidden =
    pathname.startsWith("/review/new") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/recovery") ||
    pathname.startsWith("/s/") ||
    pathname.startsWith("/seller/") ||
    pathname.startsWith("/search");

  if (hidden) return null;

  return (
    <>
      <nav
        aria-label="Primary"
        className="relative z-40 w-full shrink-0 px-4 pb-[max(env(safe-area-inset-bottom),16px)]"
      >
        <div className="flex items-center justify-center gap-3">
          <div
            className={`flex h-[52px] w-[min(257px,calc(100%-68px))] items-center justify-between gap-0.5 rounded-[36px] bg-white/90 p-0.5 ${PILL_SHADOW}`}
          >
            <NavItem href="/" label="Discover" icon={Compass} active={pathname === "/"} />
            <NavItem
              href="/me"
              label="My Reviews"
              icon={ListChecks}
              active={pathname.startsWith("/me")}
            />
            <ProfileItem active={pathname.startsWith("/account")} />
          </div>

          {!sheetOpen && (
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              aria-label="Write a report"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink text-white shadow-[0_10px_28px_-6px_rgba(20,20,20,0.55)] transition-transform hover:scale-105 active:scale-90"
            >
              <Plus size={26} weight="bold" />
            </button>
          )}
        </div>
      </nav>

      {sheetOpen && <CategoryPickerSheet onClose={() => setSheetOpen(false)} />}
    </>
  );
}

function NavItem({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof Compass;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex min-h-11 flex-1 flex-col items-center justify-center gap-1 rounded-[32px] transition-transform active:scale-90 ${
        active
          ? `bg-surface-2 px-2 py-1 outline outline-2 outline-offset-[-2px] outline-white ${PILL_SHADOW}`
          : "px-2 py-1"
      }`}
    >
      <Icon size={20} weight="fill" className={active ? "text-ink" : "text-ink/50"} />
      <span className={`text-[10px] font-medium ${active ? "text-ink" : "text-ink/50"}`}>
        {label}
      </span>
    </Link>
  );
}

function ProfileItem({ active }: { active: boolean }) {
  return (
    <Link
      href="/account"
      aria-label="Profile"
      aria-current={active ? "page" : undefined}
      className={`flex min-h-11 flex-1 flex-col items-center justify-center gap-1 rounded-[32px] transition-transform active:scale-90 ${
        active
          ? `bg-surface-2 px-2 py-1 outline outline-2 outline-offset-[-2px] outline-white ${PILL_SHADOW}`
          : "px-2 py-1"
      }`}
    >
      <UserAvatarBadge size={24} />
      <span className={`text-[10px] font-medium ${active ? "text-ink" : "text-ink/50"}`}>
        Profile
      </span>
    </Link>
  );
}
