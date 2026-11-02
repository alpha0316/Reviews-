import { CATS } from "./categories";
import type { CriterionScore, Review, ReportedRecentItem, Subject, SubjectType, TagCount } from "./types";

// Comprehensive mock dataset: every subject type in CATS has at least one
// "good" and one "bad/mixed" example, so every page (General/Evidence/Reviews
// tabs, compose flow, Discover) has real content to render for every category.

function criteriaFor(type: SubjectType, scores: number[]): CriterionScore[] {
  const defs = CATS[type].criteria;
  return defs.map((d, i) => ({ key: d.key, label: d.label, score: scores[i] ?? scores[scores.length - 1] }));
}

function tagsFrom(
  defs: { key: string; label: string }[],
  entries: Record<string, number>,
  severity: TagCount["severity"]
): TagCount[] {
  return Object.entries(entries)
    .map(([key, count]) => {
      const def = defs.find((d) => d.key === key);
      return def ? { key, label: def.label, count, severity } : null;
    })
    .filter((t): t is TagCount => t !== null);
}

function redFlagsFor(type: SubjectType, entries: Record<string, number>): TagCount[] {
  return tagsFrom(CATS[type].reportTags, entries, "bad");
}

function praiseFor(type: SubjectType, entries: Record<string, number>): TagCount[] {
  return tagsFrom(CATS[type].praiseTags, entries, "good");
}

const HOUSING_EVIDENCE_TONES = [
  "bg-[#F6EDD6]",
  "bg-[#F4F4F4]",
  "bg-[#DEEDE0]",
  "bg-[#EDDEE0]",
  "bg-[#E0DEED]",
  "bg-[#EDEBDE]",
];

function evidence(
  items: { category: string; caption: string; monthYear: string; kind: "photo" | "video" | "chat" | "receipt" | "document" }[],
  idPrefix: string
) {
  return items.map((it, i) => ({
    id: `${idPrefix}-${i + 1}`,
    exhibitId: `EX-${2200 + i}`,
    kind: it.kind,
    category: it.category,
    caption: it.caption,
    monthYear: it.monthYear,
    thumbnailTone: HOUSING_EVIDENCE_TONES[i % HOUSING_EVIDENCE_TONES.length],
  }));
}

// --- Subjects ---------------------------------------------------------------

export const SUBJECTS: Subject[] = [
  // Estate (housing) ----------------------------------------------------------
  {
    id: "palmview-estate",
    slug: "palmview-estate",
    type: "estate",
    name: "Palmview Estate",
    city: "Kumasi",
    area: "Asokwa, Kumasi",
    heroTone: "bg-surface-2",
    priceGhc: 2500,
    priceUnit: "month",
    bedrooms: 2,
    yearsTracked: 2,
    overallScore: 2.1,
    reviewCount: 112,
    receiptCount: 3,
    criteria: criteriaFor("estate", [1.6, 1.6, 1.6, 1.6, 1.6, 1.6, 1.6]),
    redFlags: redFlagsFor("estate", {
      water_supply: 1.6,
      power_meter: 1.6,
      security: 1.6,
      landlord_response: 1.6,
      deposit_returned: 1.6,
      matches_listing: 1.6,
      flood_issues: 1.6,
    }),
    praise: praiseFor("estate", { spacious_rooms: 1.6 }),
    evidence: evidence(
      [
        { category: "Documents", caption: "Tenancy agreement", monthYear: "Mar 2024", kind: "document" },
        { category: "Polytank", caption: "Empty polytank, 3rd week", monthYear: "Apr 2024", kind: "photo" },
        { category: "Room", caption: "Damp ceiling corner", monthYear: "Apr 2024", kind: "photo" },
        { category: "LandLord", caption: "No response, 9 days", monthYear: "May 2024", kind: "chat" },
        { category: "Cracks", caption: "Wall crack, east room", monthYear: "May 2024", kind: "photo" },
        { category: "Chats", caption: "Deposit follow-up thread", monthYear: "Jun 2024", kind: "chat" },
      ],
      "palmview"
    ),
  },
  {
    id: "golden-acres-estate",
    slug: "golden-acres-estate",
    type: "estate",
    name: "Golden Acres Estate",
    city: "Accra",
    area: "East Legon, Accra",
    heroTone: "bg-surface-2",
    priceGhc: 4200,
    priceUnit: "month",
    bedrooms: 3,
    yearsTracked: 5,
    overallScore: 8.4,
    reviewCount: 64,
    receiptCount: 11,
    criteria: criteriaFor("estate", [8.8, 8.1, 9.0, 7.9, 8.6, 8.9, 9.2]),
    redFlags: redFlagsFor("estate", { deposit_returned: 6.9 }),
    praise: praiseFor("estate", {
      spacious_rooms: 8.7,
      quiet_area: 9.0,
      responsive_caretaker: 8.5,
    }),
    evidence: evidence(
      [
        { category: "Documents", caption: "Signed lease, year 2", monthYear: "Jan 2024", kind: "document" },
        { category: "Room", caption: "Living room, move-in condition", monthYear: "Jan 2024", kind: "photo" },
        { category: "Chats", caption: "Caretaker responding same-day", monthYear: "Mar 2024", kind: "chat" },
      ],
      "golden-acres"
    ),
  },

  // Hostel ----------------------------------------------------------------
  {
    id: "sunrise-heights-hostel",
    slug: "sunrise-heights-hostel",
    type: "hostel",
    name: "Sunrise Heights Hostel",
    city: "Kumasi",
    area: "Ayeduase",
    heroTone: "bg-surface-2",
    priceGhc: 3200,
    priceUnit: "year",
    bedrooms: 1,
    yearsTracked: 4,
    overallScore: 6.4,
    reviewCount: 112,
    receiptCount: 3,
    criteria: criteriaFor("hostel", [6.8, 6.1, 7.2, 5.9, 5.5, 7.0, 6.9]),
    redFlags: redFlagsFor("hostel", { deposit_returned: 5.5, management_response: 5.9 }),
    praise: praiseFor("hostel", { spacious_rooms: 7.0, good_wifi: 7.4, friendly_staff: 7.1 }),
    evidence: evidence(
      [
        { category: "Room", caption: "Shared room, 2 occupants", monthYear: "Sep 2024", kind: "photo" },
        { category: "Documents", caption: "Hostel booking receipt", monthYear: "Sep 2024", kind: "receipt" },
      ],
      "sunrise"
    ),
  },
  {
    id: "valley-view-hostel",
    slug: "valley-view-hostel",
    type: "hostel",
    name: "Valley View Hostel",
    city: "Accra",
    area: "Legon, Accra",
    heroTone: "bg-surface-2",
    priceGhc: 2800,
    priceUnit: "year",
    bedrooms: 1,
    yearsTracked: 1,
    overallScore: 2.8,
    reviewCount: 39,
    receiptCount: 2,
    criteria: criteriaFor("hostel", [2.1, 1.9, 3.0, 2.4, 1.8, 3.2, 2.6]),
    redFlags: redFlagsFor("hostel", {
      water_supply: 2.1,
      power_meter: 1.9,
      overcrowding: 2.0,
      deposit_returned: 1.8,
    }),
    praise: praiseFor("hostel", { good_wifi: 6.0 }),
    evidence: evidence(
      [
        { category: "Room", caption: "4-in-a-room instead of 2 advertised", monthYear: "Aug 2024", kind: "photo" },
        { category: "Chats", caption: "Management ignoring complaints", monthYear: "Sep 2024", kind: "chat" },
      ],
      "valley-view"
    ),
  },

  // Landlord (people) -------------------------------------------------------
  {
    id: "landlord-mr-owusu",
    slug: "landlord-mr-owusu",
    type: "landlord",
    name: "Landlord — Mr. Owusu (Asokwa properties)",
    city: "Kumasi",
    area: "Asokwa, Kumasi",
    heroTone: "bg-surface-2",
    yearsTracked: 3,
    overallScore: 2.4,
    reviewCount: 18,
    receiptCount: 5,
    criteria: criteriaFor("landlord", [2.0, 1.8, 2.9, 2.6]),
    redFlags: redFlagsFor("landlord", { deposit_withheld: 1.8, ignored_repairs: 2.0, unfair_charges: 2.6 }),
    praise: praiseFor("landlord", {}),
    evidence: evidence(
      [{ category: "Chats", caption: "Deposit request ignored for 6 weeks", monthYear: "Jul 2024", kind: "chat" }],
      "owusu"
    ),
  },
  {
    id: "landlord-mrs-ansah",
    slug: "landlord-mrs-ansah",
    type: "landlord",
    name: "Landlord — Mrs. Ansah (Spintex properties)",
    city: "Accra",
    area: "Spintex, Accra",
    heroTone: "bg-surface-2",
    yearsTracked: 6,
    overallScore: 8.9,
    reviewCount: 22,
    receiptCount: 9,
    criteria: criteriaFor("landlord", [9.1, 8.8, 8.9, 8.8]),
    redFlags: redFlagsFor("landlord", {}),
    praise: praiseFor("landlord", { fair_pricing: 8.9, quick_fixes: 9.0 }),
    evidence: evidence(
      [{ category: "Chats", caption: "Plumbing fixed within a day", monthYear: "Feb 2024", kind: "chat" }],
      "ansah"
    ),
  },

  // Hostel manager (people) -------------------------------------------------
  {
    id: "manager-k-boateng",
    slug: "manager-k-boateng",
    type: "hostel_manager",
    name: "Hostel Manager — K. Boateng",
    city: "Accra",
    area: "Legon, Accra",
    heroTone: "bg-surface-2",
    yearsTracked: 2,
    overallScore: 3.3,
    reviewCount: 14,
    receiptCount: 2,
    criteria: criteriaFor("hostel_manager", [3.0, 2.4, 3.6]),
    redFlags: redFlagsFor("hostel_manager", { deposit_withheld: 2.4, unfair_charges: 3.1 }),
    praise: praiseFor("hostel_manager", {}),
    evidence: [],
  },

  // Agent (people) ----------------------------------------------------------
  {
    id: "agent-d-adjei",
    slug: "agent-d-adjei",
    type: "agent",
    name: "Agent — D. Adjei",
    city: "Kumasi",
    area: "Ayeduase, Kumasi",
    heroTone: "bg-surface-2",
    yearsTracked: 1,
    overallScore: 1.9,
    reviewCount: 9,
    receiptCount: 4,
    criteria: criteriaFor("agent", [1.5, 1.2, 2.9]),
    redFlags: redFlagsFor("agent", { fake_listing: 1.5, extra_fees: 1.2, disappeared: 1.8 }),
    praise: praiseFor("agent", {}),
    evidence: evidence(
      [{ category: "Chats", caption: "Listing photos didn't match the unit", monthYear: "May 2024", kind: "chat" }],
      "adjei"
    ),
  },
  {
    id: "agent-r-mensah",
    slug: "agent-r-mensah",
    type: "agent",
    name: "Agent — R. Mensah",
    city: "Accra",
    area: "Osu, Accra",
    heroTone: "bg-surface-2",
    yearsTracked: 4,
    overallScore: 8.2,
    reviewCount: 31,
    receiptCount: 10,
    criteria: criteriaFor("agent", [8.5, 8.0, 8.1]),
    redFlags: redFlagsFor("agent", {}),
    praise: praiseFor("agent", { accurate_listing: 8.6 }),
    evidence: [],
  },

  // Restaurant --------------------------------------------------------------
  {
    id: "skyline-grill",
    slug: "skyline-grill",
    type: "restaurant",
    name: "Skyline Grill",
    city: "Accra",
    area: "Osu, Accra",
    heroTone: "bg-surface-2",
    yearsTracked: 1,
    overallScore: 2.6,
    reviewCount: 27,
    receiptCount: 6,
    criteria: criteriaFor("restaurant", [2.8, 2.1, 2.5, 3.0]),
    redFlags: redFlagsFor("restaurant", { hygiene_issue: 2.1, overcharged: 2.4, slow_service: 2.9 }),
    praise: praiseFor("restaurant", { great_taste: 5.8 }),
    evidence: evidence(
      [
        { category: "Receipt", caption: "Bill with unordered items", monthYear: "Jun 2024", kind: "receipt" },
        { category: "Photos", caption: "Undercooked order", monthYear: "Jun 2024", kind: "photo" },
      ],
      "skyline"
    ),
  },
  {
    id: "mama-aba-kitchen",
    slug: "mama-aba-kitchen",
    type: "restaurant",
    name: "Mama Aba's Kitchen",
    city: "Kumasi",
    area: "Adum, Kumasi",
    heroTone: "bg-surface-2",
    yearsTracked: 3,
    overallScore: 9.1,
    reviewCount: 85,
    receiptCount: 20,
    criteria: criteriaFor("restaurant", [9.3, 9.0, 8.9, 9.2]),
    redFlags: redFlagsFor("restaurant", { slow_service: 6.2 }),
    praise: praiseFor("restaurant", { great_taste: 9.4, fast_service: 8.6 }),
    evidence: evidence(
      [{ category: "Photos", caption: "Jollof special, Saturday rush", monthYear: "Apr 2024", kind: "photo" }],
      "mama-aba"
    ),
  },

  // Company -------------------------------------------------------------------
  {
    id: "brightpath-recruitment",
    slug: "brightpath-recruitment",
    type: "company",
    name: "BrightPath Recruitment",
    city: "Accra",
    area: "Accra",
    heroTone: "bg-surface-2",
    yearsTracked: 1,
    overallScore: 1.8,
    reviewCount: 23,
    receiptCount: 7,
    criteria: criteriaFor("company", [1.2, 2.1, 1.9, 1.0]),
    redFlags: redFlagsFor("company", { training_fee: 2.0, fake_job: 1.3, unpaid_wages: 1.6 }),
    praise: praiseFor("company", {}),
    evidence: evidence(
      [
        { category: "Documents", caption: "\"Training fee\" invoice", monthYear: "Feb 2024", kind: "document" },
        { category: "Chats", caption: "Job offer withdrawn after payment", monthYear: "Feb 2024", kind: "chat" },
      ],
      "brightpath"
    ),
  },
  {
    id: "kofi-tech-solutions",
    slug: "kofi-tech-solutions",
    type: "company",
    name: "Kofi Tech Solutions",
    city: "Accra",
    area: "Airport Residential, Accra",
    heroTone: "bg-surface-2",
    yearsTracked: 4,
    overallScore: 8.7,
    reviewCount: 41,
    receiptCount: 15,
    criteria: criteriaFor("company", [8.9, 8.6, 8.4, 9.0]),
    redFlags: redFlagsFor("company", {}),
    praise: praiseFor("company", { pays_on_time: 9.1, good_culture: 8.5 }),
    evidence: evidence(
      [{ category: "Payslip", caption: "On-time payslip, 14 months running", monthYear: "Mar 2024", kind: "document" }],
      "kofitech"
    ),
  },

  // Service (shops & services) ----------------------------------------------
  {
    id: "swift-fix-electricals",
    slug: "swift-fix-electricals",
    type: "service",
    name: "Swift Fix Electricals",
    city: "Kumasi",
    area: "Bantama, Kumasi",
    heroTone: "bg-surface-2",
    yearsTracked: 2,
    overallScore: 3.1,
    reviewCount: 16,
    receiptCount: 5,
    criteria: criteriaFor("service", [3.4, 2.2, 3.6]),
    redFlags: redFlagsFor("service", { overcharged: 2.2, shoddy_work: 3.0 }),
    praise: praiseFor("service", {}),
    evidence: evidence(
      [{ category: "Receipt", caption: "Invoice disputed after rewiring job", monthYear: "May 2024", kind: "receipt" }],
      "swiftfix"
    ),
  },
  {
    id: "reliable-ac-repairs",
    slug: "reliable-ac-repairs",
    type: "service",
    name: "Reliable AC Repairs",
    city: "Accra",
    area: "Tema, Accra",
    heroTone: "bg-surface-2",
    yearsTracked: 5,
    overallScore: 9.0,
    reviewCount: 58,
    receiptCount: 22,
    criteria: criteriaFor("service", [9.2, 8.9, 8.8]),
    redFlags: redFlagsFor("service", {}),
    praise: praiseFor("service", { reliable: 9.3 }),
    evidence: [],
  },

  // Other -----------------------------------------------------------------
  {
    id: "citywide-movers",
    slug: "citywide-movers",
    type: "other",
    name: "Citywide Movers",
    city: "Accra",
    area: "Dansoman, Accra",
    heroTone: "bg-surface-2",
    yearsTracked: 1,
    overallScore: 5.0,
    reviewCount: 7,
    receiptCount: 2,
    criteria: criteriaFor("other", [5.0]),
    redFlags: redFlagsFor("other", { other_issue: 4.5 }),
    praise: praiseFor("other", { other_praise: 6.0 }),
    evidence: [],
  },
];

// --- Online sellers ----------------------------------------------------------

export interface SellerHandle {
  platform: "Instagram" | "Snapchat" | "TikTok" | "WhatsApp" | "Facebook";
  handle: string;
  active: boolean;
}

export interface Seller {
  id: string;
  slug: string;
  displayName: string;
  city: "Accra" | "Kumasi";
  handles: SellerHandle[];
  pastHandles: string[];
  momoMasked: string;
  overallScore: number;
  reviewCount: number;
  receiptCount: number;
  redFlags: { key: string; label: string; count: number; severity: "bad" | "mid" | "good" }[];
  praise: { key: string; label: string; count: number; severity: "good" }[];
}

export const SELLERS: Seller[] = [
  {
    id: "glam-closet-gh",
    slug: "glam-closet-gh",
    displayName: "Glam Closet GH",
    city: "Accra",
    handles: [
      { platform: "Instagram", handle: "@glamclosetgh", active: true },
      { platform: "WhatsApp", handle: "+233 XX XXX XXXX", active: true },
    ],
    pastHandles: ["@glamcloset_official", "@gc_boutiquegh"],
    momoMasked: "02X XXX XX89",
    overallScore: 3.2,
    reviewCount: 27,
    receiptCount: 9,
    redFlags: [
      { key: "no_delivery", label: "Never delivered", count: 11, severity: "bad" },
      { key: "went_silent", label: "Went silent after payment", count: 8, severity: "bad" },
    ],
    praise: [{ key: "as_described", label: "As described (when delivered)", count: 6, severity: "good" }],
  },
  {
    id: "accra-sneaker-plug",
    slug: "accra-sneaker-plug",
    displayName: "Accra Sneaker Plug",
    city: "Accra",
    handles: [
      { platform: "TikTok", handle: "@accrasneakerplug", active: true },
      { platform: "Snapchat", handle: "sneakerplug_gh", active: true },
    ],
    pastHandles: [],
    momoMasked: "05X XXX XX12",
    overallScore: 8.6,
    reviewCount: 143,
    receiptCount: 52,
    redFlags: [{ key: "wrong_item", label: "Wrong item sent", count: 6, severity: "mid" }],
    praise: [
      { key: "fast_delivery", label: "Fast delivery", count: 9, severity: "good" },
      { key: "as_described", label: "As described", count: 9, severity: "good" },
    ],
  },
  {
    id: "kumasi-phone-deals",
    slug: "kumasi-phone-deals",
    displayName: "Kumasi Phone Deals",
    city: "Kumasi",
    handles: [{ platform: "Facebook", handle: "Kumasi Phone Deals", active: true }],
    pastHandles: ["Kumasi Phone Deals Official", "KPD Electronics"],
    momoMasked: "02X XXX XX47",
    overallScore: 1.9,
    reviewCount: 19,
    receiptCount: 11,
    redFlags: [
      { key: "no_delivery", label: "Never delivered", count: 9, severity: "bad" },
      { key: "no_refund", label: "Refused refund", count: 7, severity: "bad" },
      { key: "went_silent", label: "Went silent after payment", count: 6, severity: "bad" },
    ],
    praise: [],
  },
];

export function getSellerBySlug(slug: string): Seller | undefined {
  return SELLERS.find((s) => s.slug === slug);
}

// --- Reviews ----------------------------------------------------------------

export const REVIEWS: Review[] = [
  // Palmview Estate
  {
    id: "rev-palmview-1",
    subjectId: "palmview-estate",
    author: { alias: "Tenant 7Q" },
    monthYear: "2024",
    overallScore: 1.5,
    body: "Water supply stopped after the first month. Landlord stopped replying on WhatsApp after the third follow-up. Deposit was never returned when I moved out.",
    tags: ["water_supply", "landlord_response", "deposit_returned"],
    proofCount: 3,
    helpfulCount: 41,
  },
  {
    id: "rev-palmview-2",
    subjectId: "palmview-estate",
    author: { alias: "Tenant K2" },
    monthYear: "2024",
    overallScore: 2.0,
    body: "Rooms are spacious but the polytank was empty for weeks at a time. Had to buy sachet water for drinking and bathing.",
    tags: ["water_supply", "flood_issues"],
    proofCount: 2,
    helpfulCount: 18,
  },
  // Golden Acres Estate
  {
    id: "rev-golden-1",
    subjectId: "golden-acres-estate",
    author: { alias: "Tenant 3F" },
    monthYear: "2023",
    overallScore: 9.0,
    body: "Two years in and nothing has broken that wasn't fixed within a day. Quiet estate, security actually walks the grounds at night.",
    tags: ["spacious_rooms", "quiet_area"],
    proofCount: 1,
    helpfulCount: 22,
  },
  // Sunrise Heights Hostel
  {
    id: "rev-sunrise-1",
    subjectId: "sunrise-heights-hostel",
    author: { alias: "Resident 4M" },
    monthYear: "Mar 2025",
    overallScore: 7.0,
    body: "Solid for the price. Wifi is reliable and the room was exactly as advertised. Deposit took about 3 weeks to come back after I moved out, which was the only friction point.",
    tags: ["deposit_returned", "good_wifi", "spacious_rooms"],
    proofCount: 1,
    helpfulCount: 9,
  },
  // Valley View Hostel
  {
    id: "rev-valley-1",
    subjectId: "valley-view-hostel",
    author: { alias: "Resident 9P" },
    monthYear: "Sep 2024",
    overallScore: 2.5,
    body: "Advertised as 2 to a room, moved in to find 4 beds crammed in. Management brushed off every complaint about the water pressure too.",
    tags: ["overcrowding", "water_supply"],
    proofCount: 2,
    helpfulCount: 14,
  },
  // Landlord Owusu
  {
    id: "rev-owusu-1",
    subjectId: "landlord-mr-owusu",
    author: { alias: "Tenant 5R" },
    monthYear: "2024",
    overallScore: 2.0,
    body: "Took my deposit and stopped answering calls. Had to involve a mutual friend just to get a partial refund six weeks later.",
    tags: ["deposit_withheld", "ignored_repairs"],
    proofCount: 2,
    helpfulCount: 12,
  },
  // Landlord Ansah
  {
    id: "rev-ansah-1",
    subjectId: "landlord-mrs-ansah",
    author: { alias: "Tenant 2D" },
    monthYear: "2023",
    overallScore: 9.0,
    body: "Sent a plumber the same evening I reported a leak. Returned my full deposit within a week of moving out, itemized and everything.",
    tags: ["quick_fixes", "fair_pricing"],
    proofCount: 1,
    helpfulCount: 19,
  },
  // Hostel manager Boateng
  {
    id: "rev-boateng-1",
    subjectId: "manager-k-boateng",
    author: { alias: "Resident 6L" },
    monthYear: "2024",
    overallScore: 3.0,
    body: "Charged an 'inspection fee' that was never mentioned at check-in and wouldn't explain what it covered.",
    tags: ["unfair_charges"],
    proofCount: 1,
    helpfulCount: 7,
  },
  // Agent Adjei
  {
    id: "rev-adjei-1",
    subjectId: "agent-d-adjei",
    author: { alias: "Client 8Y" },
    monthYear: "2024",
    overallScore: 1.5,
    body: "Showed us photos of a renovated unit, the actual apartment hadn't been touched in years. Asked for an 'agency fee' before we'd even agreed to anything.",
    tags: ["fake_listing", "extra_fees"],
    proofCount: 2,
    helpfulCount: 16,
  },
  // Agent Mensah
  {
    id: "rev-mensah-1",
    subjectId: "agent-r-mensah",
    author: { alias: "Client 1Z" },
    monthYear: "2024",
    overallScore: 8.5,
    body: "Every listing matched what we saw in person. Transparent about fees from the first conversation.",
    tags: ["accurate_listing"],
    proofCount: 0,
    helpfulCount: 11,
  },
  // Skyline Grill
  {
    id: "rev-skyline-1",
    subjectId: "skyline-grill",
    author: { alias: "Diner 9X" },
    monthYear: "Jun 2024",
    overallScore: 2.0,
    body: "Food arrived cold and the bill had extra items we never ordered. Staff refused to adjust it when we asked.",
    tags: ["hygiene_issue", "overcharged"],
    proofCount: 2,
    helpfulCount: 23,
  },
  // Mama Aba's Kitchen
  {
    id: "rev-mamaaba-1",
    subjectId: "mama-aba-kitchen",
    author: { alias: "Diner 4T" },
    monthYear: "Apr 2024",
    overallScore: 9.5,
    body: "Best jollof in Adum, hands down. Gets busy on weekends but the wait is worth it.",
    tags: ["great_taste"],
    proofCount: 1,
    helpfulCount: 34,
  },
  // BrightPath Recruitment
  {
    id: "rev-brightpath-1",
    subjectId: "brightpath-recruitment",
    author: { alias: "Employee 2Q" },
    monthYear: "2024",
    overallScore: 1.5,
    body: "Asked for a 'training fee' before the role even started. The job offer disappeared the moment I asked for a receipt.",
    tags: ["training_fee", "fake_job"],
    proofCount: 3,
    helpfulCount: 29,
  },
  {
    id: "rev-brightpath-2",
    subjectId: "brightpath-recruitment",
    author: { alias: "Applicant 6M" },
    monthYear: "2024",
    overallScore: 2.0,
    body: "Interview process felt legitimate, but once I was 'selected' the requests for money started.",
    tags: ["training_fee"],
    proofCount: 1,
    helpfulCount: 8,
  },
  // Kofi Tech Solutions
  {
    id: "rev-kofitech-1",
    subjectId: "kofi-tech-solutions",
    author: { alias: "Employee 3K" },
    monthYear: "2023",
    overallScore: 9.0,
    body: "Pay lands on the same date every month without fail. Management actually listens in retros.",
    tags: ["pays_on_time", "good_culture"],
    proofCount: 1,
    helpfulCount: 15,
  },
  // Swift Fix Electricals
  {
    id: "rev-swiftfix-1",
    subjectId: "swift-fix-electricals",
    author: { alias: "Customer 7B" },
    monthYear: "May 2024",
    overallScore: 3.0,
    body: "Quoted one price, invoiced double after the job was already done. Wiring also had to be redone by someone else.",
    tags: ["overcharged", "shoddy_work"],
    proofCount: 1,
    helpfulCount: 10,
  },
  // Reliable AC Repairs
  {
    id: "rev-reliableac-1",
    subjectId: "reliable-ac-repairs",
    author: { alias: "Customer 5N" },
    monthYear: "2024",
    overallScore: 9.0,
    body: "Same-day callout, fixed on the first visit, and the price matched the quote exactly.",
    tags: ["reliable"],
    proofCount: 1,
    helpfulCount: 20,
  },
];

export function reviewsForSubject(subjectId: string): Review[] {
  return REVIEWS.filter((r) => r.subjectId === subjectId);
}

export function getSubjectBySlug(slug: string): Subject | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}

export function getSubjectById(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

// --- Reported recently (discover feed) ------------------------------------

export const REPORTED_RECENTLY: ReportedRecentItem[] = [
  {
    id: "rr-1",
    subjectId: "brightpath-recruitment",
    name: "BrightPath Recruitment",
    kind: "Company",
    city: "Accra",
    quote: "Charged a \"training fee\" for a job",
    reviewCount: 23,
    receiptCount: 7,
    daysAgo: 4,
  },
  {
    id: "rr-2",
    subjectId: "skyline-grill",
    name: "Skyline Grill",
    kind: "Restaurant",
    city: "Accra",
    quote: "Charged extra items we never ordered",
    reviewCount: 27,
    receiptCount: 6,
    daysAgo: 4,
  },
  {
    id: "rr-3",
    subjectId: "kumasi-phone-deals",
    name: "Kumasi Phone Deals",
    kind: "Online Seller",
    city: "Kumasi",
    quote: "Took payment, never delivered",
    reviewCount: 19,
    receiptCount: 11,
    daysAgo: 6,
  },
  {
    id: "rr-4",
    subjectId: "agent-d-adjei",
    name: "Agent — D. Adjei",
    kind: "Agent",
    city: "Kumasi",
    quote: "Listing photos didn't match the unit",
    reviewCount: 9,
    receiptCount: 4,
    daysAgo: 8,
  },
];

// --- Combined search / explore helpers --------------------------------------

export interface ExploreItem {
  id: string;
  slug: string;
  name: string;
  kind: SubjectType | "online_seller";
  city: string;
  area: string;
  href: string;
  reviewCount: number;
  receiptCount: number;
  overallScore: number;
  daysAgo: number;
  thumbnailTone?: string;
}

// Deterministic "days ago" stand-in for last-activity timestamps we don't
// actually track yet in the mock dataset.
function daysAgoFor(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (Math.imul(31, h) + id.charCodeAt(i)) | 0;
  return 1 + (Math.abs(h) % 30);
}

export function getAllExploreItems(): ExploreItem[] {
  const subjectItems: ExploreItem[] = SUBJECTS.map((s) => ({
    id: s.id,
    slug: s.slug,
    name: s.name,
    kind: s.type,
    city: s.city,
    area: s.area,
    href: `/s/${s.slug}`,
    reviewCount: s.reviewCount,
    receiptCount: s.receiptCount,
    overallScore: s.overallScore,
    daysAgo: daysAgoFor(s.id),
    thumbnailTone: s.evidence[0]?.thumbnailTone,
  }));
  const sellerItems: ExploreItem[] = SELLERS.map((s) => ({
    id: s.id,
    slug: s.slug,
    name: s.displayName,
    kind: "online_seller",
    city: s.city,
    area: s.city,
    href: `/seller/${s.slug}`,
    reviewCount: s.reviewCount,
    receiptCount: s.receiptCount,
    overallScore: s.overallScore,
    daysAgo: daysAgoFor(s.id),
  }));
  return [...subjectItems, ...sellerItems];
}

export function getAllSearchable(): { id: string; slug: string; name: string; kind: string; city: string; href: string }[] {
  return getAllExploreItems().map(({ id, slug, name, kind, city, href }) => ({ id, slug, name, kind, city, href }));
}

// Discover's top category row maps to these subject-type groups.
export const DISCOVER_CATEGORY_FILTERS: Record<string, SubjectType[]> = {
  housing: ["estate", "hostel"],
  food: ["restaurant"],
  companies: ["company"],
  online: ["online_seller"],
};

// Unique areas/cities across all entities, for location search results.
export function getAllLocations(): string[] {
  const areas = new Set<string>();
  for (const s of SUBJECTS) areas.add(s.area);
  for (const s of SELLERS) areas.add(s.city);
  return Array.from(areas).sort();
}
