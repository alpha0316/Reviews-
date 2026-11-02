import { describe, expect, it } from "vitest";
import { daysAgo, formatMonthYear, formatPublicDate, formatYearOnly, randomPublishDelayHours } from "../dates";

describe("formatYearOnly", () => {
  it("returns just the year", () => {
    expect(formatYearOnly(new Date("2024-03-12"))).toBe("2024");
  });
});

describe("formatMonthYear", () => {
  it("returns abbreviated month and year", () => {
    expect(formatMonthYear(new Date("2024-03-12"))).toBe("Mar 2024");
  });
});

describe("formatPublicDate", () => {
  it("shows year only for housing and company subjects", () => {
    const d = new Date("2024-03-12");
    expect(formatPublicDate(d, "estate")).toBe("2024");
    expect(formatPublicDate(d, "hostel")).toBe("2024");
    expect(formatPublicDate(d, "company")).toBe("2024");
  });

  it("shows month and year for everything else", () => {
    const d = new Date("2024-03-12");
    expect(formatPublicDate(d, "restaurant")).toBe("Mar 2024");
    expect(formatPublicDate(d, "online_seller")).toBe("Mar 2024");
  });

  it("never exposes the exact day", () => {
    const d = new Date("2024-03-12");
    for (const type of ["estate", "restaurant", "landlord", "company"]) {
      expect(formatPublicDate(d, type)).not.toMatch(/\b12\b/);
    }
  });
});

describe("daysAgo", () => {
  it("computes whole days between two dates", () => {
    const now = new Date("2024-03-15T00:00:00Z");
    const then = new Date("2024-03-10T00:00:00Z");
    expect(daysAgo(then, now)).toBe(5);
  });

  it("never returns a negative number", () => {
    const now = new Date("2024-03-10T00:00:00Z");
    const future = new Date("2024-03-15T00:00:00Z");
    expect(daysAgo(future, now)).toBe(0);
  });
});

describe("randomPublishDelayHours", () => {
  it("stays within 0-72 inclusive", () => {
    for (let i = 0; i < 50; i++) {
      const h = randomPublishDelayHours();
      expect(h).toBeGreaterThanOrEqual(0);
      expect(h).toBeLessThanOrEqual(72);
    }
  });

  it("respects an injected random source", () => {
    expect(randomPublishDelayHours(() => 0)).toBe(0);
    expect(randomPublishDelayHours(() => 0.999999)).toBe(72);
  });
});
