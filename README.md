# Ofie

Anonymous, evidence-backed reviews for businesses, landlords, hostels, employers and
online sellers in Accra and Kumasi.

This is **Phase 1**: a frontend-only build on mock data. There is no database, no real
authentication, and no file storage yet — see "What's not here yet" below.

## Stack

- Next.js 16 (App Router), TypeScript (strict), Tailwind CSS v4
- `@phosphor-icons/react` for icons, `zod` installed for Phase 2 validation
- Vitest + Testing Library for unit tests, Playwright for an end-to-end smoke test

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint
pnpm typecheck
pnpm test       # unit tests (Vitest)
pnpm e2e        # end-to-end smoke test (Playwright; starts its own dev server)
pnpm build
```

## Structure

```
app/                      routes (App Router)
  page.tsx                 Discover — tapping a category filters Explore via ?cat=,
                           tapping a location result filters via ?area=
  search/                  Full-screen search (recent searches, mixed entity/location/
                           keyword results, each with a type-appropriate icon)
  s/[slug]/                Subject profile (General / Evidence / Reviews tabs)
  s/[slug]/evidence/[id]/  Evidence viewer
  seller/[slug]/           Online seller profile (handles, past handles, MoMo)
  check/                   "Check before you pay" handle/MoMo lookup
  review/new/               3-step compose flow (tell your story → rate → evidence)
  review/success/          Submission confirmation
  me/                      My reviews (local-only in Phase 1)
  signup/, signin/, recovery/   Nickname+password auth UI (mocked, no backend)
  account/                 Account & privacy ("What Ofie knows about you")

components/                shared UI (BottomNav, CategoryPickerSheet, ScoreStamp, ...)
components/compose/        the 3 compose-flow steps + shell/footer
lib/
  types.ts                 domain types
  categories.ts             category → criteria/report-tags/praise-tags/proof-types config
  evidence-categories.ts    per-subject-type evidence tile sets for the compose flow
  mock-data.ts              seeded subjects, sellers, reviews, "reported recently" feed —
                             every subject type has a "good" and a "bad/mixed" example so
                             every category's pages render fully populated
  identity-risk.ts          live de-anonymization detector used in the compose flow
  aliases.ts                "<Role> <2-char code>" alias generator
  dates.ts                  year-only / month-year public date formatting
  recovery-code.ts          16-char recovery code generator/validator
  compose-store.ts          sessionStorage-backed draft state for the compose flow
lib/__tests__/              unit tests for the above
e2e/                        Playwright smoke test
```

Design tokens (light/dark) live in `app/globals.css` as CSS variables, mapped into the
Tailwind theme (`bg-brand`, `text-ink-2`, `bg-bad-bg`, `bg-accent`, etc.) via
`@theme inline`. The app background is white in light mode (`--color-bg: #ffffff`); dark
mode is unaffected. Fonts (Familjen Grotesk, Figtree, JetBrains Mono) are loaded in
`app/layout.tsx`.

Icons come from the Phosphor Icons pack and default to the filled weight everywhere:
client components get it via an `IconContext.Provider` (`components/IconProvider.tsx`,
mounted once in `app/layout.tsx`) so they don't need `weight="fill"` on every call;
server components import from `@phosphor-icons/react/ssr` instead (it needs no
client-side icon context, so it won't force a component to be client-only) and pass
`weight="fill"` explicitly, since the SSR variant can't read the context. A couple of
icons intentionally override the default where the weight carries meaning — the star
rating in the compose flow (filled only up to the selected rating) and the FAB's "+".

### UI flow

The home tab bar (`components/BottomNav.tsx`) is a plain row of three tabs (Discover,
My Reviews, Profile) plus a separate floating "+" button. It's hidden on entity detail
pages (`/s/[slug]` and `/seller/[slug]`), the compose flow, and the auth screens, each
of which has its own full-width CTA or footer instead. Tapping "+" opens
`CategoryPickerSheet`, a bottom sheet of 8 categories; picking one routes to
`/review/new?type=<category>` and starts the compose flow already scoped to that
category. The flow itself is 3 steps — "Tell your story" (title + free text + optional
duration/amount for housing, with the identity-risk detector watching as you type),
"How Was Your Experience" (5-star overall + per-criterion 1-5 ratings), and "Add your
evidence" (tap the evidence categories you can back up, see the content policy, submit).

## Privacy rules this build already follows

These shaped the UI even before there's a real backend behind it:

1. **No email/phone/real name at sign-up.** Just a nickname and password, plus an 18+
   confirmation checkbox.
2. **One-time recovery code.** Sign-up generates a `XXXX-XXXX-XXXX-XXXX` code shown once;
   in Phase 2 only its hash is stored server-side, and it's the only way to reset a password.
3. **Anonymous aliases on reviews.** Reviews never show a nickname — only an alias like
   "Tenant 7Q" (`lib/aliases.ts`).
4. **No exact dates publicly.** Housing and company reviews show a year only; everything
   else shows month + year (`lib/dates.ts`). Never a day — the compose flow's own
   "Duration" fields use month-granularity `<input type="month">` pickers for the same
   reason, so a reviewer can't even enter an exact day by mistake.
5. **Live identity-risk detection while writing.** The "Tell your story" step flags phone
   numbers, emails, room/unit numbers, full names and exact dates as you type
   (`lib/identity-risk.ts`), and blocks advancing to the next step on phone numbers/emails.
6. **Evidence framed as facts, not verdicts.** Subject profiles show counted criteria
   scores and tag counts ("Based on user reports"), never a label like "Scam" — matching
   the legal-guardrail requirement that Ofie never issues its own verdict.
7. **Content policy shown before submitting.** The last compose step shows the policy
   (back claims with evidence, don't name individual staff, no health/criminal claims
   without evidence) right above the submit button.
8. **"What Ofie knows about you."** The account page states plainly what is and isn't
   collected.

## What's not here yet (Phase 2 / 3)

- PostgreSQL + Drizzle schema, argon2id password hashing, opaque session cookies.
- Real file uploads, EXIF/metadata stripping, the 48-hour proof-file deletion job.
- The randomized 0–72h publish-delay picker from the original spec (dropped from the
  compose flow to match the supplied mockups exactly; straightforward to re-add as a
  step before "Phase 2 backend" work starts).
- Server-side enforcement of anything above — right now it's all UI-level and mock data;
  nothing is actually persisted beyond `sessionStorage` for the compose draft and
  submitted "My reviews" entries (cleared on new browser sessions).
- Moderation queue, owner claim/replies, disputes, takedown flow, MoMo-number linking.

## Design source

Two mockup passes, both supplied as reference images/SVGs rather than live Figma access
(the Figma MCP connection hit this account's seat rate limit early in the session):

1. An initial pass (green/brand palette, rotated score stamp) built from four SVG screen
   exports (Discover, Evidence, Rate, "Tell your story").
2. The current design — orange accent palette, flat (non-rotated) score card, plain
   bottom tab bar with a separate floating "+" button, bottom-sheet category picker,
   star + number-pill ratings, and the restructured 3-step compose flow — built from a
   second, more detailed set of mobile screen mockups, using the Phosphor Icons pack as
   specified.
# Reviews-
