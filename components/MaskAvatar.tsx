"use client";

import { MaskHappy } from "@phosphor-icons/react";

export function MaskAvatar({ size = 36 }: { size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <MaskHappy size={size * 0.55} weight="fill" />
    </div>
  );
}
