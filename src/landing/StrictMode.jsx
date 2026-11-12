import { useRef } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";
import strictImg from "../assets/screens/strict.webp";
import { Reveal, Eyebrow, Device } from "./ui";
import { strictPoints } from "./data";

export default function StrictMode() {
  const stage = useRef(null);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "end start"] });
  // The phone turns to face you as it scrolls through the viewport, then turns away.
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const rotateY = useTransform(p, [0, 0.5, 1], [-28, -6, 18]);
  const rotateX = useTransform(p, [0, 0.5, 1], [10, 2, -6]);
  const y = useTransform(p, [0, 1], [40, -40]);

  return (
    <section className="section" aria-labelledby="strict-title">
      <div className="wrap split">
        <div>
          <Reveal>
            <Eyebrow>Strict Mode</Eyebrow>
            <h2 id="strict-title" className="h2">
              For when you genuinely <span className="text-grad">can’t trust yourself.</span>
            </h2>
            <p className="lede">
              The hard‑lock option. Once it’s on, restrictions can’t be casually undone — your limits can only get
              stricter.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ol className="big-list">
              {strictPoints.map((p, i) => (
                <li key={p.title}>
                  <span className="n" aria-hidden="true">0{i + 1}</span>
                  <div>
                    <b>{p.title}</b>
                    <span>{p.desc}</span>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="phone-stage phone-3d">
          <div ref={stage}>
            <Device
              src={strictImg}
              alt="Focsy’s Strict Mode screen showing the challenge required to disable it"
              style={{ rotateY, rotateX, y, transformPerspective: 1200 }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
