import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import waitingImg from "../assets/screens/waiting.webp";
import { Reveal, Eyebrow, Device } from "./ui";
import { steps } from "./data";

export default function HowItWorks() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section
      id="how"
      className="section"
      aria-labelledby="how-title"
      style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--line)" }}
    >
      <div className="wrap">
        <div className="sec-head">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <h2 id="how-title" className="h2">
              You can’t unlock it on a whim. <span className="text-grad">That’s the point.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede">
              Set up in 2 minutes. A friend holds the code, so the easy escape hatch is gone.
            </p>
          </Reveal>
        </div>

        <div className="how-body">
          <div className="steps" ref={listRef}>
            <div className="steps-rail" aria-hidden="true">
              <motion.span style={{ scaleY: progress }} />
            </div>
            <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {steps.map((s, i) => (
                <Reveal as="li" key={s.num} className="step" delay={i * 0.05}>
                  <span className="step-num" aria-hidden="true">{s.num}</span>
                  <div>
                    <h3 className="h3">
                      <span className="sr-only">Step {i + 1}: </span>
                      {s.title}
                    </h3>
                    <p>{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={0.15} className="phone-stage how-phone">
            <Device src={waitingImg} alt="Focsy waiting for your friend @wings to approve an unlock request" style={{ width: "min(100%, 280px)" }} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
