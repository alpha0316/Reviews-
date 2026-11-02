// Core domain types for Ofie (mock-data phase)

export type City = "Accra" | "Kumasi";

export type SubjectType =
  | "estate"
  | "hostel"
  | "landlord"
  | "hostel_manager"
  | "agent"
  | "restaurant"
  | "company"
  | "online_seller"
  | "service"
  | "other";

export type ProofType =
  | "receipt"
  | "momo_record"
  | "chat"
  | "photo"
  | "video"
  | "payslip"
  | "document";

export interface CriterionScore {
  key: string;
  label: string;
  score: number; // 0 - 10
}

export interface TagCount {
  key: string;
  label: string;
  count: number;
  severity: "bad" | "mid" | "good";
}

export interface EvidenceItem {
  id: string;
  exhibitId: string; // e.g. EX-2219
  kind: "photo" | "video" | "chat" | "receipt" | "document";
  category: string; // e.g. "Documents", "Polytank", "Room", "Landlord", "Cracks", "Chats"
  caption: string;
  monthYear: string; // e.g. "Mar 2025"
  thumbnailTone: string; // tailwind bg class for placeholder tile
}

export interface ReviewAuthor {
  alias: string; // e.g. "Tenant 7Q"
}

export interface Review {
  id: string;
  subjectId: string;
  author: ReviewAuthor;
  monthYear: string;
  overallScore: number;
  body: string;
  tags: string[]; // tag keys
  proofCount: number;
  helpfulCount: number;
  relationship?: string; // for companies: "Former employee", etc.
}

export interface Subject {
  id: string;
  slug: string;
  type: SubjectType;
  name: string;
  city: City;
  area: string;
  heroTone: string;
  priceGhc?: number;
  priceUnit?: string;
  bedrooms?: number;
  yearsTracked?: number;
  overallScore: number; // 0 - 10
  reviewCount: number;
  receiptCount: number;
  criteria: CriterionScore[];
  redFlags: TagCount[];
  praise: TagCount[];
  evidence: EvidenceItem[];
  linkedPeople?: { id: string; name: string; role: string }[];
  handles?: { platform: string; handle: string; active: boolean }[];
  pastHandles?: string[];
  momoMasked?: string;
}

export interface ReportedRecentItem {
  id: string;
  subjectId: string;
  name: string;
  kind: string; // "Company", "Restaurant"
  city: City;
  quote: string;
  reviewCount: number;
  receiptCount: number;
  daysAgo: number;
}
