"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";

export default function SignInPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col">
      <TopBar title="Sign in" backHref="/" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/");
        }}
        className="flex flex-col gap-4 px-4 pt-4"
      >
        <div>
          <label htmlFor="nickname" className="mb-1 block text-sm font-medium text-ink">
            Nickname
          </label>
          <input
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
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
            required
            className="min-h-11 w-full rounded-xl border border-line bg-surface px-4 text-sm text-ink focus-visible:outline-none"
          />
        </div>

        <button
          type="submit"
          className="min-h-12 w-full rounded-full bg-brand text-sm font-semibold text-white"
        >
          Sign in
        </button>

        <div className="flex flex-col items-center gap-1 text-sm">
          <Link href="/recovery" className="font-medium text-brand">
            Forgot password? Use your recovery code
          </Link>
          <p className="text-ink-2">
            New here?{" "}
            <Link href="/signup" className="font-medium text-brand">
              Create an account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
