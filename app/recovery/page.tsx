"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { isValidRecoveryCodeFormat } from "@/lib/recovery-code";

export default function RecoveryPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidRecoveryCodeFormat(code)) {
      setError("That doesn't look like a valid recovery code (format: XXXX-XXXX-XXXX-XXXX).");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError(null);
    router.push("/signin");
  }

  return (
    <div className="flex flex-col">
      <TopBar title="Recover account" backHref="/signin" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 pt-4">
        <p className="text-sm text-ink-2">
          Enter the recovery code you saved when you created your account.
        </p>

        <div>
          <label htmlFor="code" className="mb-1 block text-sm font-medium text-ink">
            Recovery code
          </label>
          <input
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="XXXX-XXXX-XXXX-XXXX"
            className="min-h-11 w-full rounded-xl border border-line bg-surface px-4 font-mono text-sm text-ink focus-visible:outline-none"
          />
        </div>

        <div>
          <label htmlFor="new-password" className="mb-1 block text-sm font-medium text-ink">
            New password
          </label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={8}
            className="min-h-11 w-full rounded-xl border border-line bg-surface px-4 text-sm text-ink focus-visible:outline-none"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-bad">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="min-h-12 w-full rounded-full bg-brand text-sm font-semibold text-white"
        >
          Reset password
        </button>
      </form>
    </div>
  );
}
