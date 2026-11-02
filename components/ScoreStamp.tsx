function verdictFor(score: number): { label: string; tone: string; bg: string } {
  if (score < 4) return { label: "Poor", tone: "text-bad", bg: "border-bad" };
  if (score < 7) return { label: "Mixed", tone: "text-mid", bg: "border-mid" };
  return { label: "Good", tone: "text-good", bg: "border-good" };
}

export function ScoreStamp({ score }: { score: number }) {
  const v = verdictFor(score);
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border-2 ${v.bg} bg-surface font-display`}
      >
        <span className={`text-xl font-bold leading-none ${v.tone}`}>{score.toFixed(1)}</span>
        <span className="mt-0.5 text-[9px] leading-none text-ink-2">out of 10</span>
      </div>
      <div>
        <p className={`font-display text-lg font-bold ${v.tone}`}>{v.label}</p>
      </div>
    </div>
  );
}
