// Public review dates never show exact days (privacy rule #8).
// Housing/company subjects show a year only; everything else shows month+year.

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatYearOnly(date: Date): string {
  return String(date.getFullYear());
}

export function formatMonthYear(date: Date): string {
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

const YEAR_ONLY_TYPES = new Set(["estate", "hostel", "company"]);

export function formatPublicDate(date: Date, subjectType: string): string {
  return YEAR_ONLY_TYPES.has(subjectType) ? formatYearOnly(date) : formatMonthYear(date);
}

export function daysAgo(date: Date, now: Date = new Date()): number {
  const ms = now.getTime() - date.getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

export function randomPublishDelayHours(seedRand: () => number = Math.random): number {
  return Math.floor(seedRand() * 73); // 0-72 inclusive
}
