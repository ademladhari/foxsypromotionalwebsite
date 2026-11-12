import { motion } from "framer-motion";

import { EASE_OUT } from "./utils";
import logoImg from "../assets/logo.webp";

/** Fade + rise when scrolled into view (once). Transform/opacity only. */
export function Reveal({ children, delay = 0, y = 24, as = "div", className, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

export function LogoMark({ size = 30 }) {
  return (
    <span className="logo-mark" aria-hidden="true" style={{ width: size, height: size }}>
      <img src={logoImg} alt="" width={size} height={size} decoding="async" />
    </span>
  );
}

export function Logo({ href = "#top", onClick }) {
  return (
    <a className="logo" href={href} onClick={onClick} aria-label="Focsy home">
      <LogoMark />
      <span translate="no">Focsy</span>
    </a>
  );
}

/** Real app screenshot inside a CSS phone frame. `style` takes framer motion values. */
export function Device({ src, alt, className = "", style, eager = false }) {
  return (
    <motion.div className={"device " + className} style={style}>
      <span className="device-island" aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        width="640"
        height="1229"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        {...(eager ? { fetchpriority: "high" } : {})}
      />
    </motion.div>
  );
}

export function PlayIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.7-.6-1.2V3c0-.5.2-1 .6-1.2Zm11.6 8.8 2.6-2.6 3.3 1.9c.9.5.9 1.8 0 2.3l-3.3 1.9-2.6-2.6-.4-.4.4-.5ZM4.8 1.2l11.9 6.8-2.5 2.5L4.8 1.2Zm0 21.6 9.4-9.3 2.5 2.5-11.9 6.8Z" />
    </svg>
  );
}
