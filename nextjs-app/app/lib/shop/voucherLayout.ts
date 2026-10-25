/**
 * Picks font sizes for the voucher PDF so the title, the contents and the dedication always fit
 * into the fixed content box above the code row. Text height is estimated from character counts
 * (Satoshi averages under 0.5 em per character), which errs on the side of a denser layout.
 */

export type VoucherLevel = {
  title: number;
  titleLineHeight: number;
  titleGap: number;
  bullet: number;
  bulletLineHeight: number;
  bulletGap: number;
  dedication: number;
  dedicationLineHeight: number;
  dedicationPadding: number;
  dedicationGap: number;
};

export const VOUCHER_LEVELS: VoucherLevel[] = [
  { title: 15, titleLineHeight: 1.25, titleGap: 8, bullet: 8.5, bulletLineHeight: 1.35, bulletGap: 2.5, dedication: 9.5, dedicationLineHeight: 1.35, dedicationPadding: 8, dedicationGap: 10 },
  { title: 13.5, titleLineHeight: 1.25, titleGap: 6, bullet: 7.5, bulletLineHeight: 1.3, bulletGap: 1.5, dedication: 8.5, dedicationLineHeight: 1.3, dedicationPadding: 6, dedicationGap: 7 },
  { title: 12, titleLineHeight: 1.2, titleGap: 5, bullet: 7, bulletLineHeight: 1.25, bulletGap: 1, dedication: 7.5, dedicationLineHeight: 1.25, dedicationPadding: 5, dedicationGap: 5 },
  { title: 11, titleLineHeight: 1.15, titleGap: 4, bullet: 6.5, bulletLineHeight: 1.2, bulletGap: 0.5, dedication: 7, dedicationLineHeight: 1.2, dedicationPadding: 4, dedicationGap: 4 },
];

// Panel geometry in points (see voucherPdf.tsx).
export const CONTENT_WIDTH = 282;
export const BULLET_INDENT = 10;
export const CONTENT_HEIGHT = 205;
export const MAX_INCLUDES = 9;
// Words longer than this are split so they can wrap instead of running off the panel.
export const LONG_WORD = 18;

const CHAR_EM = 0.5;

export function estimateLines(text: string, fontSize: number, width: number): number {
  const charWidth = fontSize * CHAR_EM;
  const perLine = Math.max(1, Math.floor(width / charWidth));
  let lines = 0;
  for (const paragraph of text.split("\n")) {
    let used = 0;
    let count = 1;
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      let len = word.length;
      if (used > 0 && used + 1 + len > perLine) {
        count++;
        used = 0;
      }
      // A word longer than a line wraps in chunks.
      while (len > perLine) {
        count++;
        len -= perLine;
      }
      used += (used > 0 ? 1 : 0) + len;
    }
    lines += count;
  }
  return lines;
}

export function splitIncludes(includes?: string | null): string[] {
  return (includes ?? "")
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-•+*]\s*/, "").trim())
    .filter(Boolean)
    .slice(0, MAX_INCLUDES);
}

/** One paragraph: line breaks and runs of spaces from the checkout form collapse into single spaces. */
export function normalizeDedication(dedication?: string | null): string | null {
  const text = (dedication ?? "").replace(/\s+/g, " ").trim();
  return text || null;
}

export type VoucherLayout = {
  level: VoucherLevel;
  includes: string[];
  dedication: string | null;
  /** Set only when the dedication had to be cut to fit (rendered with an ellipsis). */
  dedicationMaxLines?: number;
};

function contentHeight(level: VoucherLevel, title: string, includes: string[], dedicationLines: number) {
  const bulletWidth = CONTENT_WIDTH - BULLET_INDENT;
  let h = estimateLines(title, level.title, CONTENT_WIDTH) * level.title * level.titleLineHeight + level.titleGap;
  for (const line of includes) {
    h += estimateLines(line, level.bullet, bulletWidth) * level.bullet * level.bulletLineHeight + level.bulletGap;
  }
  if (dedicationLines > 0) {
    h += level.dedicationGap + 2 * level.dedicationPadding + dedicationLines * level.dedication * level.dedicationLineHeight;
  }
  return h;
}

export function voucherLayout(input: {
  title: string;
  includes?: string | null;
  dedication?: string | null;
}): VoucherLayout {
  const includes = splitIncludes(input.includes);
  const dedication = normalizeDedication(input.dedication);
  const dedicationLines = (level: VoucherLevel) =>
    dedication
      ? estimateLines(`„${dedication}“`, level.dedication, CONTENT_WIDTH - 2 * level.dedicationPadding)
      : 0;

  for (const level of VOUCHER_LEVELS) {
    if (contentHeight(level, input.title, includes, dedicationLines(level)) <= CONTENT_HEIGHT) {
      return { level, includes, dedication };
    }
  }

  // Still too long at the smallest size: keep every line of the contents and cut the dedication.
  const level = VOUCHER_LEVELS[VOUCHER_LEVELS.length - 1];
  const rest = contentHeight(level, input.title, includes, 0);
  const lineHeight = level.dedication * level.dedicationLineHeight;
  const free = CONTENT_HEIGHT - rest - level.dedicationGap - 2 * level.dedicationPadding;
  const dedicationMaxLines = Math.max(2, Math.floor(free / lineHeight));
  return { level, includes, dedication, dedicationMaxLines };
}

/** Hyphenation callback for react-pdf: never split normal words, chunk only very long ones. */
export function splitLongWord(word: string): string[] {
  if (word.length <= LONG_WORD) return [word];
  const parts: string[] = [];
  for (let i = 0; i < word.length; i += 10) parts.push(word.slice(i, i + 10));
  return parts;
}
