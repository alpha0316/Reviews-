export function UserAvatarBadge({
  initial = "K",
  size = 44,
  bordered = false,
}: {
  initial?: string;
  size?: number;
  bordered?: boolean;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-accent font-display font-bold text-white ${
        bordered
          ? "shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05),0px_1px_4px_0px_rgba(12,12,13,0.10)] outline outline-1 outline-offset-[-1px] outline-white"
          : ""
      }`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden
    >
      {initial.charAt(0).toUpperCase()}
    </span>
  );
}
