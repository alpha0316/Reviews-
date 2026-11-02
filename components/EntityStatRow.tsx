import { ChatCircle, Receipt } from "@phosphor-icons/react/ssr";

function Dot() {
  return <span className="h-[2px] w-[2px] shrink-0 rounded-full bg-[#D9D9D9]" aria-hidden />;
}

export function EntityStatRow({
  reviewCount,
  receiptCount,
  daysAgo,
}: {
  reviewCount: number;
  receiptCount: number;
  daysAgo?: number;
}) {
  return (
    <div className="flex items-center gap-[9px] text-xs">
      <span className="flex items-center gap-[5px]">
        <ChatCircle size={14} weight="duotone" className="text-black" />
        <span>
          <span className="text-black">{reviewCount} </span>
          <span className="text-black/40">Reviews</span>
        </span>
      </span>
      <Dot />
      <span className="flex items-center gap-[5px]">
        <Receipt size={14} weight="duotone" className="text-black" />
        <span>
          <span className="text-black">{receiptCount} </span>
          <span className="text-black/40">Receipts</span>
        </span>
      </span>
      {daysAgo !== undefined && (
        <>
          <Dot />
          <span>
            <span className="text-black">{daysAgo} </span>
            <span className="text-black/40">d</span>
          </span>
        </>
      )}
    </div>
  );
}
