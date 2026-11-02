import {
  Buildings,
  Bed,
  UserCircle,
  ForkKnife,
  Briefcase,
  Storefront,
  Wrench,
  DotsThreeCircle,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react/lib";
import type { SubjectType } from "@/lib/types";

const ICONS: Record<SubjectType, Icon> = {
  estate: Buildings,
  hostel: Bed,
  landlord: UserCircle,
  hostel_manager: UserCircle,
  agent: UserCircle,
  restaurant: ForkKnife,
  company: Briefcase,
  online_seller: Storefront,
  service: Wrench,
  other: DotsThreeCircle,
};

export function CategoryIcon({
  type,
  className,
  size = 20,
}: {
  type: SubjectType;
  className?: string;
  size?: number;
}) {
  const IconComponent = ICONS[type] ?? DotsThreeCircle;
  return <IconComponent size={size} weight="fill" className={className} aria-hidden />;
}
