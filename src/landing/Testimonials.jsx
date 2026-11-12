import { LuQuote, LuStar } from "react-icons/lu";
import { Reveal, Eyebrow } from "./ui";
import { tilt, untilt } from "./utils";
import { testimonials } from "./data";

export default function Testimonials() {
  return (
    <section className="section" aria-labelledby="quotes-title" style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="sec-head">
          <Reveal>
            <Eyebrow>What people say</Eyebrow>
            <h2 id="quotes-title" className="h2">
              Less scrolling. <span className="muted">More everything else.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede">From people who actually needed to stop doomscrolling — and did.</p>
          </Reveal>
        </div>

        <div className="quotes">
          {testimonials.map((t, i) => (
            <Reveal as="figure" key={t.name} delay={i * 0.08} className="card" onPointerMove={tilt} onPointerLeave={untilt} style={{ margin: 0 }}>
              <LuQuote className="quote-mark" size={28} aria-hidden="true" />
              <blockquote className="quote-text" style={{ margin: "0 0 28px" }}>
                “{t.quote}”
              </blockquote>
              <figcaption className="person">
                <span className="avatar" aria-hidden="true">{t.initials}</span>
                <span>
                  <b>{t.name}</b>
                  <small>{t.role}</small>
                </span>
                <span className="stars" role="img" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }, (_, s) => <LuStar key={s} size={13} fill="currentColor" aria-hidden="true" />)}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
