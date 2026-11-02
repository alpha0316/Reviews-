"use client";

import { ArrowLeft, X } from "@phosphor-icons/react";

export function ComposeShell({
  title,
  step,
  totalSteps,
  onBack,
  onClose,
  children,
}: {
  title: string;
  step: number;
  totalSteps: number;
  onBack: () => void;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col bg-[#FAFAFA]">
      <header className="sticky top-0 z-30 flex items-center gap-3 bg-[#FAFAFA] px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-ink shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="flex-1 text-center font-display text-base font-semibold text-ink">
          {title}
        </h1>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cancel and exit"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-ink shadow-sm"
        >
          <X size={20} />
        </button>
      </header>
      <p className="sr-only" role="status">
        Step {step} of {totalSteps}
      </p>
      <div className="flex-1 px-4 pb-28 pt-2">{children}</div>
    </div>
  );
}

export function ComposeFooter({
  onNext,
  label = "Continue",
  disabled = false,
}: {
  onNext: () => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[480px] bg-[#FAFAFA] px-4 pb-[max(env(safe-area-inset-bottom),16px)] pt-3">
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className="flex min-h-12 w-full items-center justify-center rounded-full bg-ink text-sm font-semibold text-white shadow-[0_12px_28px_-8px_rgba(20,20,20,0.55)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {label}
      </button>
    </div>
  );
}
