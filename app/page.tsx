import Link from "next/link";
import { Bell } from "@phosphor-icons/react/ssr";
import { CategoryTile } from "@/components/CategoryTile";
import { ReportCard } from "@/components/ReportCard";
import { UserAvatarBadge } from "@/components/UserAvatarBadge";
import { EntityAvatarBadge } from "@/components/EntityAvatarBadge";
import { EntityStatRow } from "@/components/EntityStatRow";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { REPORTED_RECENTLY, DISCOVER_CATEGORY_FILTERS, getAllExploreItems } from "@/lib/mock-data";

const CATEGORY_TILES: { type: "estate" | "restaurant" | "company" | "online_seller"; label: string; cat: string }[] = [
  { type: "estate", label: "Housing", cat: "housing" },
  { type: "restaurant", label: "Food", cat: "food" },
  { type: "company", label: "Companies", cat: "companies" },
  { type: "online_seller", label: "Online Shops", cat: "online" },
];

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; area?: string }>;
}) {
  const { cat, area } = await searchParams;
  const activeFilter = cat && DISCOVER_CATEGORY_FILTERS[cat] ? cat : undefined;
  const allItems = getAllExploreItems();
  let exploreItems = activeFilter
    ? allItems.filter((item) => DISCOVER_CATEGORY_FILTERS[activeFilter].includes(item.kind))
    : allItems;
  if (area) {
    exploreItems = exploreItems.filter((item) => item.area === area || item.city === area);
  }
  const activeLabel = CATEGORY_TILES.find((c) => c.cat === activeFilter)?.label ?? area;

  return (
    <main className="flex flex-col">
      <header className="sticky top-0 z-20 flex flex-col items-center gap-[7px] border-b border-black/5 bg-white px-4 pb-3 pt-2 shadow-[0px_4px_12px_-4px_rgba(12,12,13,0.10)]">
        <div className="flex w-full items-center gap-3">
          <span className="shrink-0 rounded-full" aria-label="Ofie" role="img">
            <UserAvatarBadge size={36} bordered />
          </span>
          <Link
            href="/search"
            aria-label="Search location or business"
            className="relative flex h-9 flex-1 items-center gap-3 rounded-3xl bg-white px-3 text-sm text-black/60 shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05),0px_1px_4px_0px_rgba(12,12,13,0.10)] outline outline-1 outline-offset-[-1px] outline-black/10"
          >
            <SearchIcon size={20} className="shrink-0" />
            Search Location
          </Link>
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05),0px_1px_4px_0px_rgba(12,12,13,0.10)] outline outline-1 outline-offset-[-1px] outline-black/10"
          >
            <Bell weight="fill" className="h-[18px] w-[18px] text-ink" />
          </button>
        </div>
      </header>

      <nav aria-label="Categories" className="flex gap-1 overflow-x-auto px-4 pb-2 pt-4">
        <CategoryTile type="other" label="All" href="/" isAll active={!activeFilter && !area} />
        {CATEGORY_TILES.map((c) => (
          <CategoryTile
            key={c.cat}
            type={c.type}
            label={c.label}
            href={`/?cat=${c.cat}`}
            active={activeFilter === c.cat}
          />
        ))}
      </nav>

      <div className="flex flex-col gap-6 px-4 pt-2">
        {!activeFilter && !area && (
          <section aria-labelledby="reported-recently-heading" className="flex flex-col gap-3">
            <h2 id="reported-recently-heading" className="font-display text-lg font-semibold text-ink">
              Reported recently
            </h2>
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
              {REPORTED_RECENTLY.map((item) => (
                <ReportCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="explore-heading" className="flex flex-col gap-3">
          <h2 id="explore-heading" className="font-display text-lg font-semibold text-ink">
            {activeLabel ? `Explore ${activeLabel}` : "Explore"}
          </h2>
          <div className="flex flex-col gap-3">
            {exploreItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center justify-between overflow-hidden rounded-2xl bg-surface shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-start gap-[11px] p-1.5">
                    <EntityAvatarBadge name={item.name} size={32} />
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="truncate text-sm font-medium text-black">{item.name}</p>
                      <p className="truncate text-xs uppercase text-black/50">{item.area}</p>
                    </div>
                  </div>
                  <div className="px-1.5 pb-2">
                    <EntityStatRow
                      reviewCount={item.reviewCount}
                      receiptCount={item.receiptCount}
                      daysAgo={item.daysAgo}
                    />
                  </div>
                </div>
                <div
                  className={`h-[87px] w-[98px] shrink-0 ${item.thumbnailTone ?? "bg-surface-2"}`}
                  aria-hidden
                />
              </Link>
            ))}
            {exploreItems.length === 0 && (
              <p className="py-10 text-center text-sm text-ink-2">Nothing in this category yet.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
