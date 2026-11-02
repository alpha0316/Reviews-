import type { SubjectType } from "./types";

export interface EvidenceCategoryDef {
  key: string;
  label: string;
  tone: string; // tailwind bg-[...] class
}

const HOUSING: EvidenceCategoryDef[] = [
  { key: "documents", label: "Documents", tone: "bg-[#F6EDD6]" },
  { key: "water", label: "Polytank", tone: "bg-[#F4F4F4]" },
  { key: "room", label: "Room", tone: "bg-[#DEEDE0]" },
  { key: "landlord", label: "LandLord", tone: "bg-[#EDDEE0]" },
  { key: "cracks", label: "Cracks", tone: "bg-[#E0DEED]" },
  { key: "chats", label: "Chats", tone: "bg-[#EDEBDE]" },
];

const COMPANY: EvidenceCategoryDef[] = [
  { key: "documents", label: "Documents", tone: "bg-[#F6EDD6]" },
  { key: "payslip", label: "Payslip", tone: "bg-[#F4F4F4]" },
  { key: "contract", label: "Contract", tone: "bg-[#DEEDE0]" },
  { key: "office", label: "Office", tone: "bg-[#EDDEE0]" },
  { key: "chats", label: "Chats", tone: "bg-[#E0DEED]" },
  { key: "other", label: "Other", tone: "bg-[#EDEBDE]" },
];

const SELLER: EvidenceCategoryDef[] = [
  { key: "receipt", label: "Receipt", tone: "bg-[#F6EDD6]" },
  { key: "momo", label: "MoMo Proof", tone: "bg-[#F4F4F4]" },
  { key: "product", label: "Product Photos", tone: "bg-[#DEEDE0]" },
  { key: "page", label: "Page Screenshot", tone: "bg-[#EDDEE0]" },
  { key: "chats", label: "Chats", tone: "bg-[#E0DEED]" },
  { key: "other", label: "Other", tone: "bg-[#EDEBDE]" },
];

const GENERIC: EvidenceCategoryDef[] = [
  { key: "receipt", label: "Receipt", tone: "bg-[#F6EDD6]" },
  { key: "photos", label: "Photos", tone: "bg-[#F4F4F4]" },
  { key: "chats", label: "Chats", tone: "bg-[#DEEDE0]" },
  { key: "documents", label: "Documents", tone: "bg-[#EDDEE0]" },
  { key: "other", label: "Other", tone: "bg-[#EDEBDE]" },
];

const BY_TYPE: Partial<Record<SubjectType, EvidenceCategoryDef[]>> = {
  estate: HOUSING,
  hostel: HOUSING,
  landlord: HOUSING,
  hostel_manager: HOUSING,
  company: COMPANY,
  online_seller: SELLER,
};

export function evidenceCategoriesFor(type?: SubjectType): EvidenceCategoryDef[] {
  if (!type) return GENERIC;
  return BY_TYPE[type] ?? GENERIC;
}
