import { LuEyeOff, LuLock } from "react-icons/lu";
import { Reveal, Eyebrow } from "./ui";
import { tilt, untilt } from "./utils";
import { features } from "./data";

const byId = Object.fromEntries(features.map((f) => [f.id, f]));

function Kicker({ f }) {
  const Icon = f.icon;
  return (
    <div className="card-kicker">
      <span className="ic"><Icon size={16} aria-hidden="true" /></span>
      {f.kicker}
    </div>
  );
}

function Card({ f, className = "", children, delay = 0 }) {
  return (
    <Reveal as="article" delay={delay} className={"card " + className} onPointerMove={tilt} onPointerLeave={untilt}>
      {children ?? (
        <>
          <Kicker f={f} />
          <h3 className="h3">{f.title}</h3>
          <p>{f.desc}</p>
        </>
      )}
    </Reveal>
  );
}

/* ── Small illustrative visuals (decorative) ─────────────── */
function CodeViz() {
  return (
    <div className="code-viz" aria-hidden="true">
      <div className="code-viz-head">
        <span>Unlock code</span>
        <span className="accent">● Sent</span>
      </div>
      <div className="code-boxes">
        {Array.from({ length: 6 }, (_, i) => <span key={i}>•</span>)}
      </div>
      <div className="code-viz-foot">
        <LuEyeOff size={16} />
        Delivered to your friend. Hidden from you.
      </div>
    </div>
  );
}

function ToggleViz() {
  const rows = [
    ["Block Reels", "Instagram", true],
    ["Block Shorts", "YouTube", true],
    ["Direct messages", "Still works", false],
  ];
  return (
    <div className="toggle-list viz" aria-hidden="true">
      {rows.map(([label, sub, on]) => (
        <div className="toggle-row" key={label}>
          <span>
            {label}
            <br />
            <small>{sub}</small>
          </span>
          <span className={"tg" + (on ? " on" : "")} />
        </div>
      ))}
    </div>
  );
}

function RingViz() {
  return (
    <div className="ring-viz viz" aria-hidden="true">
      <svg width="76" height="76" viewBox="0 0 76 76">
        <circle cx="38" cy="38" r="31" fill="none" stroke="rgba(240,123,74,.15)" strokeWidth="7" />
        <circle cx="38" cy="38" r="31" fill="none" stroke="var(--accent)" strokeWidth="7" strokeLinecap="round" strokeDasharray="194.8" strokeDashoffset="0" transform="rotate(-90 38 38)" />
      </svg>
      <div>
        <b>Limit hit</b>
        <small>Access blocked automatically</small>
      </div>
    </div>
  );
}

function BarsViz() {
  const h = [46, 70, 38, 88, 56, 30, 64];
  return (
    <div className="viz" aria-hidden="true">
      <div className="bars">
        {h.map((v, i) => <span key={i} className={i === 3 ? "hi" : ""} style={{ height: `${v}%` }} />)}
      </div>
      <div className="bars-labels">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <i key={i}>{d}</i>)}
      </div>
    </div>
  );
}

function LockViz() {
  return (
    <div className="lock-viz viz" aria-hidden="true">
      <span className="r" style={{ width: 96, height: 96 }} />
      <span className="r" style={{ width: 140, height: 140, opacity: 0.6 }} />
      <span className="r" style={{ width: 190, height: 190, opacity: 0.3 }} />
      <span className="core"><LuLock size={26} /></span>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="section" aria-labelledby="features-title">
      <div className="wrap">
        <div className="sec-head">
          <Reveal>
            <Eyebrow>What Focsy does</Eyebrow>
            <h2 id="features-title" className="h2">
              6 tools that replace <span className="accent">willpower</span> with structure.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede">
              Built on Android’s AccessibilityService, Focsy works inside apps — not just around them.
            </p>
          </Reveal>
        </div>

        <div className="bento">
          <Card f={byId.friend} className="span-4">
            <div className="card-row">
              <div>
                <Kicker f={byId.friend} />
                <h3 className="h3" style={{ fontSize: "clamp(26px, 2.6vw, 34px)" }}>{byId.friend.title}</h3>
                <p>{byId.friend.desc}</p>
              </div>
              <CodeViz />
            </div>
          </Card>

          <Card f={byId.inapp} className="span-2" delay={0.05}>
            <Kicker f={byId.inapp} />
            <h3 className="h3">{byId.inapp.title}</h3>
            <p>{byId.inapp.desc}</p>
            <ToggleViz />
          </Card>

          <Card f={byId.limits} className="span-2">
            <Kicker f={byId.limits} />
            <h3 className="h3">{byId.limits.title}</h3>
            <p>{byId.limits.desc}</p>
            <RingViz />
          </Card>

          <Card f={byId.stats} className="span-2" delay={0.05}>
            <Kicker f={byId.stats} />
            <h3 className="h3">{byId.stats.title}</h3>
            <p>{byId.stats.desc}</p>
            <BarsViz />
          </Card>

          <Card f={byId.strict} className="span-2" delay={0.1}>
            <Kicker f={byId.strict} />
            <h3 className="h3">{byId.strict.title}</h3>
            <p>{byId.strict.desc}</p>
            <LockViz />
          </Card>

          <Card f={byId.a11y} className="span-6">
            <div className="card-row">
              <div>
                <Kicker f={byId.a11y} />
                <h3 className="h3">{byId.a11y.title}</h3>
                <p>{byId.a11y.desc}</p>
              </div>
              <div className="chips" style={{ justifyContent: "flex-end" }} aria-hidden="true">
                <span className="chip hot">● Reels detected</span>
                <span className="chip">→ closed instantly</span>
                <span className="chip">DMs untouched</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
