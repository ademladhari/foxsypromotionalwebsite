export const EASE_OUT = [0.22, 1, 0.36, 1];

/** Tracks the pointer so .card::before can draw a spotlight under it. */
export function spotlight(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}


/** Whole amounts render without decimals (€0), others with two (€4.99). */
export const formatEur = (n) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Spotlight + 3D tilt toward the pointer. Uses the individual `rotate` property so it never
 * fights framer-motion's inline `transform` on the same element. Mouse only, skipped for reduced motion.
 */
export function tilt(e) {
  spotlight(e);
  if (e.pointerType !== "mouse" || prefersReduced()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5; // −0.5..0.5
  const y = (e.clientY - r.top) / r.height - 0.5;
  const max = r.width > 700 ? 3 : 6; // wide cards tilt less
  const deg = Math.min(1, Math.hypot(x, y) * 2) * max;
  el.style.rotate = `${-y} ${x} 0 ${deg.toFixed(2)}deg`;
}

export function untilt(e) {
  e.currentTarget.style.rotate = "";
}
