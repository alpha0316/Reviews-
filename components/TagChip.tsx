export function TagChip({
  label,
  severity = "bad",
  selected = false,
  onClick,
}: {
  label: string;
  severity?: "bad" | "mid" | "good";
  selected?: boolean;
  onClick?: () => void;
}) {
  const palette =
    severity === "good"
      ? "bg-good-bg text-good border-good/30"
      : severity === "mid"
        ? "bg-mid-bg text-mid border-mid/30"
        : "bg-bad-bg text-bad border-bad/30";

  const Tag = onClick ? "button" : "span";

  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      aria-pressed={onClick ? selected : undefined}
      className={`inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-xs font-medium transition-opacity ${palette} ${
        onClick ? "cursor-pointer" : ""
      } ${selected ? "opacity-100 ring-2 ring-offset-1 ring-current" : "opacity-90"}`}
    >
      {label}
    </Tag>
  );
}
