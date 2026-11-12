import { useState } from "react";
import { LuX, LuPause, LuPlay } from "react-icons/lu";
import { BLOCKED_FEEDS } from "./data";

function Group({ hidden }) {
  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {[...BLOCKED_FEEDS, ...BLOCKED_FEEDS].map((f, i) => (
        <span className="marquee-item" key={i}>
          <span className="strike">{f}</span>
          <LuX size={28} aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="marquee" data-paused={paused} aria-label="Feeds Focsy can block">
      <p className="sr-only">Focsy can block: {BLOCKED_FEEDS.join(", ")}.</p>
      <div className="marquee-track" aria-hidden="true">
        <Group />
        <Group hidden />
      </div>
      <button
        type="button"
        className="marquee-toggle"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play Scrolling Banner" : "Pause Scrolling Banner"}
        aria-pressed={paused}
      >
        {paused ? <LuPlay size={14} aria-hidden="true" /> : <LuPause size={14} aria-hidden="true" />}
      </button>
    </section>
  );
}
