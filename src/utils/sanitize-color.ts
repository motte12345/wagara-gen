const HEX_COLOR_RE = /^#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?$/

export function isValidColor(value: string): boolean {
  return HEX_COLOR_RE.test(value)
}

export function sanitizeColor(value: string, fallback: string): string {
  return isValidColor(value) ? value : fallback
}
