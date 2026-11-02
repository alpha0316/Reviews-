import { describe, expect, it } from "vitest";
import { detectIdentityRisks, hasBlockingRisk } from "../identity-risk";

describe("detectIdentityRisks", () => {
  it("flags a Ghanaian phone number", () => {
    const risks = detectIdentityRisks("Call me on 0244123456 if you have questions.");
    expect(risks.some((r) => r.kind === "phone")).toBe(true);
  });

  it("flags an email address", () => {
    const risks = detectIdentityRisks("Reach the landlord at owner@example.com directly.");
    expect(risks.some((r) => r.kind === "email")).toBe(true);
  });

  it("flags a room number", () => {
    const risks = detectIdentityRisks("This happened in Room 204 last month.");
    expect(risks.some((r) => r.kind === "room_number")).toBe(true);
  });

  it("flags an exact date", () => {
    const risks = detectIdentityRisks("I paid the deposit on 12 March 2024.");
    expect(risks.some((r) => r.kind === "exact_date")).toBe(true);
  });

  it("flags what looks like a full name", () => {
    const risks = detectIdentityRisks("The agent, Kwame Mensah, promised a refund.");
    expect(risks.some((r) => r.kind === "name" && r.match === "Kwame Mensah")).toBe(true);
  });

  it("does not flag clean, vague text", () => {
    const risks = detectIdentityRisks(
      "The water stopped working after the first month and the landlord stopped replying."
    );
    expect(risks).toHaveLength(0);
  });

  it("treats phone and email as blocking risks", () => {
    expect(hasBlockingRisk([{ kind: "phone", match: "0244123456", index: 0, message: "" }])).toBe(
      true
    );
    expect(hasBlockingRisk([{ kind: "name", match: "Kwame Mensah", index: 0, message: "" }])).toBe(
      false
    );
  });
});
