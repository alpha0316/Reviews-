"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { generateRecoveryCode } from "@/lib/recovery-code";

export default function SignUpPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmAge, setConfirmAge] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const canSubmit = nickname.trim().length >= 3 && password.length >= 8 && confirmAge;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    // Mock: generate and display the recovery code once. In Phase 2 this
    // becomes a server action that stores only its argon2id hash.
    setRecoveryCode(generateRecoveryCode());
  }

  if (recoveryCode) {
    return (
      <div className="flex flex-col">
        <TopBar title="Save your recovery code" />
        <div className="px-4 pt-6">
          <p className="text-sm text-ink-2">
            This is the <strong>only</strong> way to reset your password. Ofie doesn&apos;t
            collect your email or phone number, so if you lose it, you lose access. We won&apos;t
            show it again.
          </p>
          <div className="mt-4 rounded-2xl border border-line bg-surface p-5 text-center">
            <p className="break-all font-mono text-lg font-semibold tracking-wider text-ink">
              {recoveryCode}
            </p>
          </div>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(recoveryCode);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
            className="mt-3 min-h-11 w-full rounded-full border border-line bg-surface text-sm font-semibold text-ink"
          >
            {copied ? "Copied" : "Copy code"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-3 min-h-12 w-full rounded-full bg-brand text-sm font-semibold text-white"
          >
            I&apos;ve saved it &mdash; continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <TopBar title="Create account" backHref="/" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 pt-4">
        <p className="text-sm text-ink-2">
          No email or phone number needed. Just a nickname and password.
        </p>

        <div>
          <label htmlFor="nickname" className="mb-1 block text-sm font-medium text-ink">
            Nickname
          </label>
          <input
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            minLength={3}
            required
            className="min-h-11 w-full rounded-xl border border-line bg-surface px-4 text-sm text-ink focus-visible:outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-ink">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
            className="min-h-11 w-full rounded-xl border border-line bg-surface px-4 text-sm text-ink focus-visible:outline-none"
          />
          <p className="mt-1 text-xs text-ink-2">At least 8 characters.</p>
        </div>

        <label className="flex min-h-11 items-start gap-3 rounded-xl border border-line bg-surface px-4 py-3">
          <input
            type="checkbox"
            checked={confirmAge}
            onChange={(e) => setConfirmAge(e.target.checked)}
            className="mt-0.5 h-5 w-5 accent-brand"
          />
          <span className="text-sm text-ink">I confirm I am 18 years or older.</span>
        </label>

        <button
          type="submit"
          disabled={!canSubmit}
          className="min-h-12 w-full rounded-full bg-brand text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Create account
        </button>

        <p className="text-center text-sm text-ink-2">
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-brand">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
