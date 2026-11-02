import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { getSubjectBySlug } from "@/lib/mock-data";

export default async function EvidenceViewerPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const subject = getSubjectBySlug(slug);
  if (!subject) notFound();

  const item = subject.evidence.find((e) => e.id === id);
  if (!item) notFound();

  return (
    <div className="flex flex-col">
      <TopBar title="Evidence" backHref={`/s/${subject.slug}`} />
      <div className="px-4 pt-4">
        <div className={`flex aspect-square w-full items-center justify-center rounded-2xl ${item.thumbnailTone}`}>
          <span className="font-mono text-sm text-ink-2">{item.exhibitId}</span>
        </div>
        <div className="mt-4 rounded-2xl bg-surface p-4 shadow-sm">
          <p className="font-mono text-xs text-ink-2">{item.exhibitId}</p>
          <h2 className="mt-1 font-display text-lg font-semibold text-ink">{item.category}</h2>
          <p className="mt-1 text-sm text-ink">{item.caption}</p>
          <p className="mt-2 text-xs text-ink-2">Uploaded {item.monthYear}</p>
        </div>
        <p className="mt-4 text-center text-xs text-ink-2">
          Metadata (location, device, filename) is stripped before evidence is shown publicly.
        </p>
      </div>
    </div>
  );
}
