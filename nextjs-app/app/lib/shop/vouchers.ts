import { createHmac } from "crypto";
import { addMonths } from "date-fns";

// Crockford base32: no I, L, O, U, so codes are easy to read out over the phone.
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

/**
 * Deterministic per (session, line, piece): if Stripe retries the webhook, the customer gets
 * the same code again instead of a second, different one. The secret keeps codes unguessable.
 */
export function voucherCode(
  secret: string,
  sessionId: string,
  lineIndex: number,
  piece: number,
): string {
  if (!secret) throw new Error("Missing VOUCHER_SECRET");
  const digest = createHmac("sha256", secret)
    .update(`${sessionId}:${lineIndex}:${piece}`)
    .digest();

  let chars = "";
  // 8 chars × 5 bits = 40 bits taken from the first 5 bytes.
  let bits = 0;
  let value = 0;
  for (const byte of digest.subarray(0, 5)) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      chars += ALPHABET[(value >> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  return `MF-${chars.slice(0, 4)}-${chars.slice(4, 8)}`;
}

export function voucherDocId(sessionId: string, lineIndex: number, piece: number) {
  return `voucher-${sessionId}-${lineIndex}-${piece}`;
}

/** Last valid day (YYYY-MM-DD), inclusive. */
export function voucherValidUntil(purchasedAt: Date, months: number): string {
  return addMonths(purchasedAt, months).toISOString().slice(0, 10);
}

export function formatCzechDate(isoDate: string): string {
  const [y, m, d] = isoDate.slice(0, 10).split("-").map(Number);
  return `${d}. ${m}. ${y}`;
}
