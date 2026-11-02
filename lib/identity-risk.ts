// Live identity-risk detector used in the compose flow.
// Flags text that could de-anonymize a reviewer or name a third party:
// phone numbers, emails, room numbers, full names, exact dates.

export type RiskKind = "phone" | "email" | "room_number" | "name" | "exact_date";

export interface RiskMatch {
  kind: RiskKind;
  match: string;
  index: number;
  message: string;
}

const PHONE_RE = /(?:\+233|0)[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{4}\b/g;
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const ROOM_RE = /\b(?:room|rm|flat|apt|apartment|suite)\s*#?\s*\d{1,4}[a-zA-Z]?\b/gi;
// Exact calendar dates: "12 March 2024", "March 12, 2024", "12/03/2024", "2024-03-12"
const EXACT_DATE_RE =
  /\b(\d{1,2}(st|nd|rd|th)?\s+(January|February|March|April|May|June|July|August|September|October|November|December)(\s+\d{4})?|((January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(st|nd|rd|th)?(,\s*\d{4})?)|\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4}|\d{4}-\d{2}-\d{2})\b/gi;
// Very rough full-name heuristic: two or more consecutive capitalized words,
// excluding common sentence-starters and category words.
const NAME_RE = /\b([A-Z][a-z]{1,}\s+[A-Z][a-z]{1,}(?:\s+[A-Z][a-z]{1,})?)\b/g;
const NAME_STOPWORDS = new Set([
  "I Was",
  "I Paid",
  "I Had",
  "I Am",
  "This Is",
  "They Were",
  "We Were",
]);

function messageFor(kind: RiskKind): string {
  switch (kind) {
    case "phone":
      return "This looks like a phone number. Remove it to stay anonymous.";
    case "email":
      return "This looks like an email address. Remove it to stay anonymous.";
    case "room_number":
      return "This names a specific room or unit number. Consider removing it.";
    case "name":
      return "This looks like a full name. Avoid naming individual staff.";
    case "exact_date":
      return "This is an exact date. Ofie shows only month/year (or year) publicly — consider loosening it.";
  }
}

export function detectIdentityRisks(text: string): RiskMatch[] {
  const matches: RiskMatch[] = [];

  for (const re of [PHONE_RE, EMAIL_RE, ROOM_RE, EXACT_DATE_RE]) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      const kind: RiskKind =
        re === PHONE_RE
          ? "phone"
          : re === EMAIL_RE
            ? "email"
            : re === ROOM_RE
              ? "room_number"
              : "exact_date";
      matches.push({ kind, match: m[0], index: m.index, message: messageFor(kind) });
      if (m[0].length === 0) re.lastIndex++;
    }
  }

  NAME_RE.lastIndex = 0;
  let nm: RegExpExecArray | null;
  while ((nm = NAME_RE.exec(text)) !== null) {
    const candidate = nm[0];
    if (NAME_STOPWORDS.has(candidate)) continue;
    matches.push({
      kind: "name",
      match: candidate,
      index: nm.index,
      message: messageFor("name"),
    });
  }

  return matches.sort((a, b) => a.index - b.index);
}

export function hasBlockingRisk(matches: RiskMatch[]): boolean {
  return matches.some((m) => m.kind === "phone" || m.kind === "email");
}
