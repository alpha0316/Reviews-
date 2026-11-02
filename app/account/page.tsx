import Link from "next/link";
import { ShieldCheck, SignOut } from "@phosphor-icons/react/ssr";
import { TopBar } from "@/components/TopBar";
import { MaskAvatar } from "@/components/MaskAvatar";
import { PRIVACY_PROMISE_POINTS } from "@/lib/copy";

export default function AccountPage() {
  return (
    <div className="flex flex-col">
      <TopBar title="Account & privacy" />
      <div className="flex flex-col gap-4 px-4 pt-4">
        <div className="flex items-center gap-3 rounded-2xl bg-surface p-4 shadow-sm">
          <MaskAvatar size={48} />
          <div>
            <p className="font-display font-semibold text-ink">Anonymous</p>
            <p className="text-xs text-ink-2">Your nickname is only visible to you.</p>
          </div>
        </div>

        <div className="rounded-2xl bg-brand-soft p-4">
          <p className="flex items-center gap-2 font-display text-sm font-semibold text-brand">
            <ShieldCheck size={16} weight="fill" /> What Ofie knows about you
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-ink">
            {PRIVACY_PROMISE_POINTS.map((p) => (
              <li key={p} className="flex gap-2">
                <span aria-hidden>&bull;</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <nav className="flex flex-col divide-y divide-line rounded-2xl bg-surface shadow-sm">
          <Link href="/me" className="flex min-h-12 items-center px-4 text-sm font-medium text-ink">
            My reviews
          </Link>
          <Link href="/recovery" className="flex min-h-12 items-center px-4 text-sm font-medium text-ink">
            Change password
          </Link>
          <Link href="/" className="flex min-h-12 items-center px-4 text-sm font-medium text-ink">
            Content policy
          </Link>
        </nav>

        <Link
          href="/signin"
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-surface text-sm font-semibold text-bad shadow-sm"
        >
          <SignOut size={16} weight="fill" /> Sign out
        </Link>
      </div>
    </div>
  );
}
