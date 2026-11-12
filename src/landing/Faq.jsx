import { useState } from "react";
import { motion } from "framer-motion";
import { LuPlus } from "react-icons/lu";
import { Reveal, Eyebrow } from "./ui";
import { EASE_OUT } from "./utils";
import { faqs } from "./data";

function Item({ q, a, idx, open, onToggle }) {
  const btnId = `faq-q-${idx}`;
  const panelId = `faq-a-${idx}`;
  return (
    <div className="faq-item">
      <h3>
        <button id={btnId} type="button" className="faq-q" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          {q}
          <span className="faq-icon" aria-hidden="true"><LuPlus size={18} /></span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={btnId} hidden={!open}>
        <motion.p
          className="faq-a"
          initial={false}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
        >
          {a}
        </motion.p>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section" aria-labelledby="faq-title" style={{ paddingTop: 0 }}>
      <div className="wrap how-grid">
        <Reveal className="how-sticky">
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="faq-title" className="h2">Questions, answered.</h2>
          <p className="lede">Focsy is strict on purpose. Here’s how that plays out day to day.</p>
        </Reveal>
        <Reveal delay={0.1} className="faq-list">
          {faqs.map((f, i) => (
            <Item key={f.q} idx={i} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
