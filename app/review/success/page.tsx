import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react/ssr";

export default function ReviewSuccessPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <CheckCircle size={64} weight="fill" className="text-good" />
      <h1 className="font-display text-2xl font-bold text-ink">Report submitted</h1>
      <p className="max-w-xs text-sm text-ink-2">
        Thanks for backing this up with evidence. It&apos;ll publish within the window you
        chose, under your anonymous alias. You can track it from My reviews.
      </p>
      <div className="mt-4 flex w-full max-w-xs flex-col gap-3">
        <Link
          href="/me"
          className="flex min-h-12 w-full items-center justify-center rounded-full bg-ink text-sm font-semibold text-white"
        >
          Go to My reviews
        </Link>
        <Link
          href="/"
          className="flex min-h-12 w-full items-center justify-center rounded-full border border-line bg-surface text-sm font-semibold text-ink"
        >
          Back to Discover
        </Link>
      </div>
    </div>
  );
}
