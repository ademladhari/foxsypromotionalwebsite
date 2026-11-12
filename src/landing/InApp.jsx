import inappImg from "../assets/inapp.png";
import { Reveal, Eyebrow } from "./ui";
import { BLOCKED_FEEDS } from "./data";

export default function InApp() {
  return (
    <section className="section" aria-labelledby="inapp-title" style={{ paddingTop: 0 }}>
      <div className="wrap split">
        <Reveal className="photo-frame">
          <img
            src={inappImg}
            alt="Focsy’s In‑App Blocking screen with toggles for YouTube Shorts and Instagram Reels"
            width="911"
            height="606"
            loading="lazy"
            decoding="async"
          />
          <span className="chip hot photo-tag" aria-hidden="true">● In‑App Blocking</span>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>In‑App Blocking</Eyebrow>
            <h2 id="inapp-title" className="h2">
              Block Reels, <span className="muted">not Instagram.</span>
              <br />
              Block Shorts, <span className="muted">not YouTube.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede">
              Most blockers force all‑or‑nothing. Focsy detects when you open a distracting section and closes it
              instantly — the rest of the app stays untouched. Check DMs. Search YouTube. Just no infinite scroll.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="chips" style={{ listStyle: "none", padding: 0, margin: "32px 0 0" }}>
              {BLOCKED_FEEDS.map((f) => (
                <li key={f} className="chip">{f}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
