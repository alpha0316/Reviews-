import { notFound } from "next/navigation";
import Link from "next/link";
import { ChatCircle, Receipt, DeviceMobile } from "@phosphor-icons/react/ssr";
import { TopBar } from "@/components/TopBar";
import { ScoreStamp } from "@/components/ScoreStamp";
import { CriteriaBar } from "@/components/CriteriaBar";
import { getSellerBySlug } from "@/lib/mock-data";

export default async function SellerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seller = getSellerBySlug(slug);
  if (!seller) notFound();

  return (
    <div className="flex flex-col">
      <TopBar title={seller.displayName} subtitle={seller.city} backHref="/" />

      <div className="px-4 pb-24 pt-4">
        <div className="rounded-2xl bg-surface p-4 shadow-sm">
          <ScoreStamp score={seller.overallScore} />
          <div className="mt-3 flex items-center gap-4 text-xs text-ink-2">
            <span className="flex items-center gap-1">
              <ChatCircle size={14} weight="fill" /> {seller.reviewCount} Reviews
            </span>
            <span className="flex items-center gap-1">
              <Receipt size={14} weight="fill" /> {seller.receiptCount} Receipts
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-surface p-4 shadow-sm">
          <h3 className="font-display text-sm font-semibold text-ink">Handles</h3>
          <ul className="mt-2 flex flex-col gap-2">
            {seller.handles.map((h) => (
              <li key={h.handle} className="flex items-center justify-between text-sm">
                <span className="text-ink-2">{h.platform}</span>
                <span className="font-mono text-ink">{h.handle}</span>
              </li>
            ))}
          </ul>
          {seller.pastHandles.length > 0 && (
            <p className="mt-2 text-xs text-ink-2">
              Past handles: {seller.pastHandles.join(", ")}
            </p>
          )}
          <p className="mt-2 flex items-center gap-1 text-xs text-ink-2">
            <DeviceMobile size={14} weight="fill" /> MoMo on file: {seller.momoMasked}
          </p>
        </div>

        {seller.redFlags.length > 0 && (
          <div className="mt-4 rounded-2xl bg-surface p-4 shadow-sm">
            <h3 className="font-display text-sm font-semibold text-bad">Red flags people reported</h3>
            <div className="mt-2">
              {seller.redFlags.map((f) => (
                <CriteriaBar key={f.key} label={f.label} score={f.count} max={seller.reviewCount || 1} tone="bad" />
              ))}
            </div>
          </div>
        )}

        {seller.praise.length > 0 && (
          <div className="mt-4 rounded-2xl bg-surface p-4 shadow-sm">
            <h3 className="font-display text-sm font-semibold text-good">What people praise</h3>
            <div className="mt-2">
              {seller.praise.map((p) => (
                <CriteriaBar key={p.key} label={p.label} score={p.count} max={seller.reviewCount || 1} tone="good" />
              ))}
            </div>
          </div>
        )}

        <Link
          href="/check"
          className="mt-4 block rounded-2xl bg-brand-soft p-4 text-center text-sm font-medium text-brand"
        >
          Checking a handle or MoMo number before you pay? Try &ldquo;Check before you pay&rdquo;
        </Link>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[480px] bg-bg px-4 pb-[max(env(safe-area-inset-bottom),16px)] pt-3">
        <Link
          href={`/review/new?type=online_seller&subject=${seller.id}`}
          className="flex min-h-12 w-full items-center justify-center rounded-full bg-ink font-semibold text-white shadow-[0_8px_24px_-8px_rgba(20,20,20,0.5)] transition-opacity hover:opacity-90"
        >
          Write a report
        </Link>
      </div>
    </div>
  );
}
