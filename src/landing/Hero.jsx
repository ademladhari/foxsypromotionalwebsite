import { useState } from "react";
import { motion } from "framer-motion";
import { LuArrowRight, LuKeyRound, LuCheck } from "react-icons/lu";
import lockedImg from "../assets/screens/locked.webp";
import { Device, PlayIcon } from "./ui";
import { EASE_OUT } from "./utils";
import { PLAY } from "./data";
import Scene3D from "./Scene3D";

// Last app update shown in the hero pill — change the month index (0‑based) when the app ships.
const UPDATED = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(2026, 2, 1));

const LINES = [
  { words: ["Your", "phone"], cls: "" },
  { words: ["won’t", "stop."], cls: "" },
  { words: ["Now", "it", "has", "to."], cls: "text-grad" },
];

const rise = (delay) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE_OUT, delay },
});

export default function Hero() {
  const [compact] = useState(() => typeof window !== "undefined" && window.innerWidth < 900);
  let i = 0;
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="wrap hero-grid">
        <div>
          <motion.div {...rise(0.05)} className="status-pill">
            <span className="live-dot" aria-hidden="true" />
            Android app · Updated {UPDATED}
          </motion.div>

          <h1 id="hero-title" className="display hero-title">
            {LINES.map((line, li) => (
              <span key={li} className={"line " + line.cls}>
                {line.words.map((w) => {
                  const d = 0.15 + i++ * 0.06;
                  return (
                    <motion.span key={w} className="word" {...rise(d)}>
                      {w}
                      {" "}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p {...rise(0.7)} className="lede">
            Focsy blocks distracting apps, kills addictive feeds like Reels and Shorts, and puts a friend in charge of the
            unlock code — so you can’t cheat your way back in.
          </motion.p>

          <motion.div {...rise(0.8)} className="hero-ctas">
            <a className="btn btn-primary" href={PLAY} target="_blank" rel="noopener noreferrer">
              <PlayIcon />
              Get It on Google Play
            </a>
            <a className="btn btn-ghost" href="#how">
              See How It Works
              <LuArrowRight className="arrow" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.ul {...rise(0.9)} className="hero-meta" style={{ listStyle: "none", padding: 0 }}>
            <li><span><LuCheck aria-hidden="true" /> Free plan</span></li>
            <li><span><LuCheck aria-hidden="true" /> 2‑minute setup</span></li>
            <li><span><LuCheck aria-hidden="true" /> Friend‑held unlock</span></li>
          </motion.ul>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.35 }}
        >
          <Scene3D
            scene="hero"
            className="hero-scene"
            sceneProps={{ compact }}
            fallback={
              <Device className="hero-device" src={lockedImg} alt="Focsy showing an app locked by a friend, with an Ask button" eager />
            }
          />

          <motion.div
            className="float-card float-b"
            aria-hidden="true"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
            transition={{ opacity: { delay: 1.2, duration: 0.6 }, x: { delay: 1.2, duration: 0.6 }, y: { duration: 3.5, repeat: 3, ease: "easeInOut", delay: 1.8 } }}
          >
            <span className="ic"><LuKeyRound size={18} /></span>
            <span>
              <b>Unlock code</b>
              <span className="code-dots"><i /><i /><i /><i /><i /><i /></span>
              <small style={{ marginTop: 4 }}>SENT TO YOUR FRIEND</small>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
