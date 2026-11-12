import { useEffect, useState } from "react";
import { LuCheck, LuArrowUpRight } from "react-icons/lu";
import { Reveal, Eyebrow } from "./ui";
import { formatEur } from "./utils";
import { plans, PRICES, PLAY } from "./data";

const SAVING = Math.round((1 - PRICES.yearly / (PRICES.monthly * 12)) * 100);

function readBilling() {
  if (typeof window === "undefined") return "yearly";
  return new URLSearchParams(window.location.search).get("billing") === "monthly" ? "monthly" : "yearly";
}

export default function Pricing() {
  const [billing, setBilling] = useState(readBilling);
  const yearly = billing === "yearly";

  // Keep the URL in sync so the selected billing period can be shared/deep-linked.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (yearly) url.searchParams.delete("billing");
    else url.searchParams.set("billing", "monthly");
    window.history.replaceState(null, "", url);
  }, [yearly]);

  return (
    <section id="pricing" className="section" aria-labelledby="pricing-title">
      <div className="wrap">
        <div className="sec-head">
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
            <h2 id="pricing-title" className="h2">
              Simple, honest pricing.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede">Start free. Upgrade when you’re ready to go all‑in on focus.</p>
          </Reveal>
        </div>

        <div className="billing" role="group" aria-label="Billing period">
          <button type="button" aria-pressed={!yearly} onClick={() => setBilling("monthly")}>
            Monthly
          </button>
          <button type="button" aria-pressed={yearly} onClick={() => setBilling("yearly")}>
            Yearly <span className="save">−{SAVING}%</span>
          </button>
        </div>

        <div className="plans">
          {plans.map((plan, i) => {
            const isPro = plan.id === "pro";
            const price = isPro ? formatEur(yearly ? PRICES.yearly : PRICES.monthly) : formatEur(0);
            const period = isPro ? (yearly ? "/ year" : "/ month") : "forever";
            return (
              <Reveal key={plan.id} as="article" delay={i * 0.08} className={"plan" + (isPro ? " pro" : "")} aria-labelledby={`plan-${plan.id}`}>
                <div className="plan-name">
                  <h3 id={`plan-${plan.id}`} style={{ margin: 0, font: "inherit" }}>{plan.name}</h3>
                  {isPro && yearly && <span className="plan-badge">Best value</span>}
                </div>
                <div className="price" aria-live="polite">
                  {price}
                  <small>{period}</small>
                </div>
                <p className="price-note">
                  {isPro && yearly ? `≈ ${formatEur(PRICES.yearly / 12)} / month, billed yearly` : " "}
                </p>
                <p className="plan-desc">{plan.desc}</p>
                <ul>
                  {plan.features.map((f) => (
                    <li key={f}>
                      <LuCheck size={16} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  className={"btn " + (isPro ? "btn-primary" : "btn-ghost")}
                  href={PLAY}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isPro ? (yearly ? "Get Pro Yearly" : "Get Pro Monthly") : "Download Free"}
                  <LuArrowUpRight className="arrow" aria-hidden="true" />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
