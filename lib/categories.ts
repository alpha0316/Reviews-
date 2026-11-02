import type { SubjectType } from "./types";

export interface CategoryDef {
  type: SubjectType;
  label: string;
  group: "Housing" | "People" | "Business";
  icon: string; // reserved: Phosphor icon name (actual icon chosen in components/CategoryIcon.tsx)
  criteria: { key: string; label: string }[];
  reportTags: { key: string; label: string }[];
  praiseTags: { key: string; label: string }[];
  proofTypes: string[];
}

export const CATS: Record<SubjectType, CategoryDef> = {
  estate: {
    type: "estate",
    label: "Estate",
    group: "Housing",
    icon: "Building2",
    criteria: [
      { key: "water", label: "Water supply" },
      { key: "power", label: "Power & meter" },
      { key: "security", label: "Security" },
      { key: "landlord_response", label: "Landlord response" },
      { key: "deposit", label: "Deposit returned" },
      { key: "matches_listing", label: "Matches the listing" },
      { key: "flood", label: "Flood issues" },
    ],
    reportTags: [
      { key: "water_supply", label: "Water supply" },
      { key: "power_meter", label: "Power & meter" },
      { key: "security", label: "Security" },
      { key: "landlord_response", label: "Landlord response" },
      { key: "deposit_returned", label: "Deposit returned" },
      { key: "matches_listing", label: "Matches the listing" },
      { key: "flood_issues", label: "Flood issues" },
    ],
    praiseTags: [
      { key: "spacious_rooms", label: "Spacious rooms" },
      { key: "quiet_area", label: "Quiet area" },
      { key: "responsive_caretaker", label: "Responsive caretaker" },
    ],
    proofTypes: ["receipt", "photo", "video", "chat", "document"],
  },
  hostel: {
    type: "hostel",
    label: "Hostel",
    group: "Housing",
    icon: "Hotel",
    criteria: [
      { key: "water", label: "Water supply" },
      { key: "power", label: "Power & meter" },
      { key: "security", label: "Security" },
      { key: "management_response", label: "Management response" },
      { key: "deposit", label: "Deposit returned" },
      { key: "matches_listing", label: "Matches the listing" },
      { key: "cleanliness", label: "Cleanliness" },
    ],
    reportTags: [
      { key: "water_supply", label: "Water supply" },
      { key: "power_meter", label: "Power & meter" },
      { key: "security", label: "Security" },
      { key: "management_response", label: "Management response" },
      { key: "deposit_returned", label: "Deposit returned" },
      { key: "matches_listing", label: "Matches the listing" },
      { key: "overcrowding", label: "Overcrowding" },
    ],
    praiseTags: [
      { key: "spacious_rooms", label: "Spacious rooms" },
      { key: "good_wifi", label: "Good wifi" },
      { key: "friendly_staff", label: "Friendly staff" },
    ],
    proofTypes: ["receipt", "photo", "video", "chat", "document"],
  },
  landlord: {
    type: "landlord",
    label: "Landlord",
    group: "People",
    icon: "UserRound",
    criteria: [
      { key: "responsiveness", label: "Responsiveness" },
      { key: "deposit", label: "Deposit returned" },
      { key: "honesty", label: "Honesty about property" },
      { key: "fairness", label: "Fairness" },
    ],
    reportTags: [
      { key: "deposit_withheld", label: "Deposit withheld" },
      { key: "ignored_repairs", label: "Ignored repairs" },
      { key: "unfair_charges", label: "Unfair charges" },
      { key: "harassment", label: "Harassment" },
    ],
    praiseTags: [
      { key: "fair_pricing", label: "Fair pricing" },
      { key: "quick_fixes", label: "Quick fixes" },
    ],
    proofTypes: ["receipt", "momo_record", "chat", "photo", "document"],
  },
  hostel_manager: {
    type: "hostel_manager",
    label: "Hostel manager",
    group: "People",
    icon: "UserRound",
    criteria: [
      { key: "responsiveness", label: "Responsiveness" },
      { key: "deposit", label: "Deposit returned" },
      { key: "fairness", label: "Fairness" },
    ],
    reportTags: [
      { key: "deposit_withheld", label: "Deposit withheld" },
      { key: "unfair_charges", label: "Unfair charges" },
      { key: "harassment", label: "Harassment" },
    ],
    praiseTags: [{ key: "fair_pricing", label: "Fair pricing" }],
    proofTypes: ["receipt", "momo_record", "chat", "photo", "document"],
  },
  agent: {
    type: "agent",
    label: "Agent",
    group: "People",
    icon: "UserRound",
    criteria: [
      { key: "honesty", label: "Honesty about property" },
      { key: "fee_transparency", label: "Fee transparency" },
      { key: "responsiveness", label: "Responsiveness" },
    ],
    reportTags: [
      { key: "fake_listing", label: "Fake listing" },
      { key: "extra_fees", label: "Extra fees" },
      { key: "disappeared", label: "Disappeared after payment" },
    ],
    praiseTags: [{ key: "accurate_listing", label: "Accurate listing" }],
    proofTypes: ["receipt", "momo_record", "chat", "document"],
  },
  restaurant: {
    type: "restaurant",
    label: "Restaurant",
    group: "Business",
    icon: "UtensilsCrossed",
    criteria: [
      { key: "food_quality", label: "Food quality" },
      { key: "hygiene", label: "Hygiene" },
      { key: "service", label: "Service" },
      { key: "value", label: "Value for money" },
    ],
    reportTags: [
      { key: "hygiene_issue", label: "Hygiene issue" },
      { key: "overcharged", label: "Overcharged" },
      { key: "slow_service", label: "Slow service" },
      { key: "wrong_order", label: "Wrong order" },
    ],
    praiseTags: [
      { key: "great_taste", label: "Great taste" },
      { key: "fast_service", label: "Fast service" },
    ],
    proofTypes: ["receipt", "photo", "video", "chat"],
  },
  company: {
    type: "company",
    label: "Company",
    group: "Business",
    icon: "Briefcase",
    criteria: [
      { key: "pay_on_time", label: "Pays on time" },
      { key: "work_environment", label: "Work environment" },
      { key: "management", label: "Management" },
      { key: "job_process", label: "Hiring process honesty" },
    ],
    reportTags: [
      { key: "unpaid_wages", label: "Unpaid wages" },
      { key: "training_fee", label: "Charged a training fee" },
      { key: "fake_job", label: "Fake job posting" },
      { key: "poor_treatment", label: "Poor treatment of staff" },
    ],
    praiseTags: [
      { key: "pays_on_time", label: "Pays on time" },
      { key: "good_culture", label: "Good culture" },
    ],
    proofTypes: ["receipt", "momo_record", "chat", "payslip", "document"],
  },
  online_seller: {
    type: "online_seller",
    label: "Online seller",
    group: "Business",
    icon: "Store",
    criteria: [
      { key: "delivery", label: "Delivery as promised" },
      { key: "product_match", label: "Product matches photos" },
      { key: "responsiveness", label: "Responsiveness" },
      { key: "refunds", label: "Refunds honored" },
    ],
    reportTags: [
      { key: "no_delivery", label: "Never delivered" },
      { key: "wrong_item", label: "Wrong item sent" },
      { key: "no_refund", label: "Refused refund" },
      { key: "went_silent", label: "Went silent after payment" },
    ],
    praiseTags: [
      { key: "fast_delivery", label: "Fast delivery" },
      { key: "as_described", label: "As described" },
    ],
    proofTypes: ["receipt", "momo_record", "chat", "photo"],
  },
  service: {
    type: "service",
    label: "Shop & Service",
    group: "Business",
    icon: "Wrench",
    criteria: [
      { key: "quality", label: "Quality of work" },
      { key: "pricing", label: "Pricing honesty" },
      { key: "timeliness", label: "Timeliness" },
    ],
    reportTags: [
      { key: "overcharged", label: "Overcharged" },
      { key: "shoddy_work", label: "Shoddy work" },
      { key: "no_show", label: "No-show" },
    ],
    praiseTags: [{ key: "reliable", label: "Reliable" }],
    proofTypes: ["receipt", "momo_record", "chat", "photo"],
  },
  other: {
    type: "other",
    label: "Other",
    group: "Business",
    icon: "CircleEllipsis",
    criteria: [{ key: "overall", label: "Overall experience" }],
    reportTags: [{ key: "other_issue", label: "Other issue" }],
    praiseTags: [{ key: "other_praise", label: "Other praise" }],
    proofTypes: ["receipt", "chat", "photo", "document"],
  },
};

export const CATEGORY_GROUPS: { group: CategoryDef["group"]; types: SubjectType[] }[] = [
  { group: "Housing", types: ["estate", "hostel"] },
  { group: "People", types: ["landlord", "hostel_manager", "agent"] },
  { group: "Business", types: ["restaurant", "company", "online_seller", "service", "other"] },
];
