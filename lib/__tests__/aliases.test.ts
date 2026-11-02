import { describe, expect, it } from "vitest";
import { generateAlias, generateAliasCode, ROLE_WORDS } from "../aliases";

describe("generateAliasCode", () => {
  it("produces a 2-character code", () => {
    expect(generateAliasCode("seed-1")).toHaveLength(2);
  });

  it("is deterministic for the same seed", () => {
    expect(generateAliasCode("seed-1")).toBe(generateAliasCode("seed-1"));
  });

  it("differs across different seeds (not guaranteed, but should hold for these fixtures)", () => {
    expect(generateAliasCode("seed-1")).not.toBe(generateAliasCode("seed-2"));
  });

  it("never includes ambiguous characters (0, O, 1, I)", () => {
    for (const seed of ["a", "b", "c", "d", "e", "f"]) {
      const code = generateAliasCode(seed);
      expect(code).not.toMatch(/[01OI]/);
    }
  });
});

describe("generateAlias", () => {
  it("uses the role word for the subject type", () => {
    const alias = generateAlias("estate", "seed-x");
    expect(alias.startsWith(`${ROLE_WORDS.estate} `)).toBe(true);
  });

  it("falls back to Reporter for unknown subject types", () => {
    const alias = generateAlias("unknown_type", "seed-y");
    expect(alias.startsWith("Reporter ")).toBe(true);
  });

  it("has the shape '<Role> <2 chars>'", () => {
    const alias = generateAlias("restaurant", "seed-z");
    expect(alias).toMatch(/^[A-Za-z]+ [A-Z0-9]{2}$/);
  });
});
