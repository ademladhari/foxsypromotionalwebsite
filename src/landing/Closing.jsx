import { useRef } from "react";
import { useInView } from "framer-motion";
import { LuArrowUpRight, LuArrowUp } from "react-icons/lu";
import { Reveal, Eyebrow, Logo, PlayIcon } from "./ui";
import { NAV, PLAY } from "./data";
import Scene3D from "./Scene3D";

export function FinalCta() {
  const ref = useRef(null);
  const unlocked = useInView(ref, { once: true, amount: 0.4 });
  return (
    <section ref={ref} className="section final" aria-labelledby="final-title">
      <div className="wrap">
        <Scene3D scene="lock" className="lock-scene" sceneProps={{ open: unlocked }} />
        <Reveal>
          <Eyebrow>Ready when you are</Eyebrow>
          <h2 id="final-title" className="display final-title">
            Take your time <span className="text-grad">back.</span>
          </h2>
          <p className="lede">Two minutes to set up. Your friend does the rest.</p>
          <a className="btn btn-primary" href={PLAY} target="_blank" rel="noopener noreferrer" style={{ minHeight: 60, padding: "0 32px", fontSize: 16 }}>
            <PlayIcon />
            Get It on Google Play
            <LuArrowUpRight className="arrow" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Logo />
            <p className="muted" style={{ margin: "16px 0 0", maxWidth: 340, fontSize: 15 }}>
              Block distracting apps and feeds. Put a friend in charge of the unlock code. Get your focus back.
            </p>
          </div>
          <nav aria-labelledby="foot-product">
            <h2 id="foot-product">Product</h2>
            <ul>
              {NAV.map((n) => (
                <li key={n.id}><a className="footer-link" href={`#${n.id}`}>{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <h2>Download</h2>
            <ul>
              <li>
                <a className="footer-link" href={PLAY} target="_blank" rel="noopener noreferrer">
                  Google Play (Android)
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} <span translate="no">Focsy</span>. All rights reserved.</span>
          <a className="footer-link" href="#top" style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}>
            Back to Top <LuArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
      <span className="wordmark" aria-hidden="true" translate="no">Focsy</span>
    </footer>
  );
}
