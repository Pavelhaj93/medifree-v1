const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

/** Escapes text and keeps the line breaks the user typed. */
export function escapeMultiline(value: unknown): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}
