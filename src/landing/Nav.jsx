import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuMenu, LuX, LuArrowUpRight } from "react-icons/lu";
import { Logo, PlayIcon } from "./ui";
import { EASE_OUT } from "./utils";
import { NAV, PLAY } from "./data";

/** Highlights the nav item whose section crosses the upper third of the viewport. */
function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );
    els.forEach((el) => io.observe(el));
    // Clear the highlight when back in the hero.
    const hero = document.getElementById("top");
    const heroIo = hero
      ? new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), { rootMargin: "-30% 0px -65% 0px" })
      : null;
    if (hero) heroIo.observe(hero);
    return () => {
      io.disconnect();
      heroIo?.disconnect();
    };
  }, [ids]);
  return active;
}

const IDS = NAV.map((n) => n.id);

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 900 && setOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={"nav" + (scrolled || open ? " is-scrolled" : "")}>
        <Logo onClick={close} />
        <nav aria-label="Main">
          <ul className="nav-links">
            {NAV.map((n) => (
              <li key={n.id}>
                <a className="nav-link" href={`#${n.id}`} aria-current={active === n.id ? "true" : undefined}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-actions">
          <a className="btn btn-primary btn-sm nav-cta" href={PLAY} target="_blank" rel="noopener noreferrer">
            <PlayIcon size={15} />
            Get Focsy Free
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-label={open ? "Close Menu" : "Open Menu"}
            aria-expanded={open}
            aria-controls="mobile-sheet"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <LuX size={20} aria-hidden="true" /> : <LuMenu size={20} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-sheet"
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            <nav aria-label="Mobile">
              <ul>
                {NAV.map((n, i) => (
                  <motion.li
                    key={n.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.05 + i * 0.05 }}
                  >
                    <a className="sheet-link" href={`#${n.id}`} onClick={close} aria-current={active === n.id ? "true" : undefined}>
                      <span>0{i + 1}</span>
                      {n.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <a className="btn btn-primary" href={PLAY} target="_blank" rel="noopener noreferrer" onClick={close}>
              <PlayIcon />
              Get It on Google Play
              <LuArrowUpRight className="arrow" aria-hidden="true" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
