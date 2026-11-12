import { useRef } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";
import { LuArrowRight, LuBookOpen, LuLanguages, LuStickyNote } from "react-icons/lu";
import modesImg from "../assets/screens/modes.webp";
import { Reveal, Eyebrow, Device } from "./ui";
import { blockModes } from "./data";

const DESTINATIONS = [
  { icon: LuBookOpen, label: "A book" },
  { icon: LuLanguages, label: "A language app" },
  { icon: LuStickyNote, label: "Your notes" },
];

export default function Redirect() {
  const stage = useRef(null);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const rotateY = useTransform(p, [0, 0.5, 1], [24, 6, -16]);
  const rotateX = useTransform(p, [0, 0.5, 1], [8, 2, -6]);

  return (
    <section id="redirect" className="section" aria-labelledby="redirect-title" style={{ paddingTop: 0 }}>
      <div className="wrap split">
        <div>
          <Reveal>
            <Eyebrow>Redirect</Eyebrow>
            <h2 id="redirect-title" className="h2">
              Open a blocked app. <span className="text-grad">Land somewhere better.</span>
            </h2>
            <p className="lede">
              Choose where Focsy sends you when a block kicks in. Reach for TikTok out of habit and you end up in
              something you actually wanted to do.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="redirect-flow" aria-hidden="true">
              <span className="chip hot">Blocked app</span>
              <LuArrowRight />
              {DESTINATIONS.map(({ icon: Icon, label }) => (
                <span className="chip" key={label}><Icon size={14} /> {label}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="modes-title">5 ways to block, per app</h3>
            <ul className="modes">
              {blockModes.map((m) => (
                <li key={m.title}>
                  <b>{m.title}</b>
                  <span>{m.desc}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="phone-stage phone-3d">
          <div ref={stage}>
            <Device
              src={modesImg}
              alt="Focsy’s blocking mode picker with Always Block, Daily Limit, Schedule, Sessions and Friend Approval, plus a ‘When blocked, open’ setting"
              style={{ rotateY, rotateX, transformPerspective: 1200 }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
