// 16-character recovery code, grouped XXXX-XXXX-XXXX-XXXX.
// Alphabet excludes ambiguous characters (0/O, 1/I/L).

const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

export function generateRecoveryCode(rand: () => number = Math.random): string {
  const groups: string[] = [];
  for (let g = 0; g < 4; g++) {
    let group = "";
    for (let i = 0; i < 4; i++) {
      group += ALPHABET[Math.floor(rand() * ALPHABET.length)];
    }
    groups.push(group);
  }
  return groups.join("-");
}

export function isValidRecoveryCodeFormat(code: string): boolean {
  return /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code.trim().toUpperCase());
}
