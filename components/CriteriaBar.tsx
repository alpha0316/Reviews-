export function CriteriaBar({
  label,
  score,
  max = 10,
  tone = "bad",
}: {
  label: string;
  score: number;
  max?: number;
  tone?: "bad" | "mid" | "good";
}) {
  const pct = Math.min(100, Math.max(0, (score / max) * 100));
  const barColor =
    tone === "good" ? "bg-good" : tone === "mid" ? "bg-mid" : "bg-bad";

  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="w-36 shrink-0 truncate text-sm text-ink">{label}</span>
      <div
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2"
        role="img"
        aria-label={`${label}: ${score.toFixed(1)} out of ${max}`}
      >
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 shrink-0 text-right text-sm tabular-nums text-ink-2">
        {score.toFixed(1)}
      </span>
    </div>
  );
}
