// Alias generator for reviews: "<Role> <2-char code>", e.g. "Tenant 7Q".
// Deterministic given a seed (so mock data + tests are stable);
// random when no seed is supplied (real submissions).

const CODE_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // no 0/O/1/I to avoid ambiguity

export const ROLE_WORDS: Record<string, string> = {
  estate: "Tenant",
  hostel: "Resident",
  landlord: "Tenant",
  hostel_manager: "Resident",
  agent: "Client",
  restaurant: "Diner",
  company: "Employee",
  online_seller: "Buyer",
  service: "Customer",
  other: "Reporter",
};

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStringToSeed(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}

export function generateAliasCode(seed?: string): string {
  const rand = seed ? mulberry32(hashStringToSeed(seed)) : Math.random;
  let code = "";
  for (let i = 0; i < 2; i++) {
    code += CODE_ALPHABET[Math.floor(rand() * CODE_ALPHABET.length)];
  }
  return code;
}

export function generateAlias(subjectType: string, seed?: string): string {
  const role = ROLE_WORDS[subjectType] ?? "Reporter";
  return `${role} ${generateAliasCode(seed)}`;
}
