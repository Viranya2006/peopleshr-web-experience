export function money(amount: number, currency: string, opts: { compact?: boolean } = {}) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: opts.compact && Math.abs(amount) >= 1_000_000 ? 1 : 0,
    notation: opts.compact && Math.abs(amount) >= 1_000_000 ? "compact" : "standard",
  }).format(amount);
}

export function hours(n: number) {
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: n < 10 ? 1 : 0 }).format(n)} h`;
}

export function decimal(n: number, digits = 1) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(n);
}

export function percent(share: number) {
  return `${Math.round(share * 100)}%`;
}
