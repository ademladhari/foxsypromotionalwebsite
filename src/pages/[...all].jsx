import { useEffect } from "react";
import { Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import "../landing/landing.css";
import { LogoMark } from "../landing/ui";

export default function NotFound() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Page Not Found — Focsy";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="page">
      <main className="hero" style={{ textAlign: "center", justifyContent: "center", paddingTop: 48 }}>
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" style={{ right: "auto", left: "50%", transform: "translate(-50%, -50%)" }} />
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <LogoMark size={34} />
          </div>
          <p className="eyebrow" style={{ justifyContent: "center", width: "100%" }}>Error 404</p>
          <h1 className="display" style={{ fontSize: "clamp(48px, 9vw, 120px)", margin: "0 auto 24px", maxWidth: "11ch" }}>
            This page is <span className="text-grad">blocked.</span>
          </h1>
          <p className="lede" style={{ margin: "0 auto 40px" }}>
            The page you’re looking for doesn’t exist — and no friend has the unlock code for it.
          </p>
          <Link className="btn btn-primary" to="/">
            <LuArrowLeft aria-hidden="true" />
            Back to Focsy
          </Link>
        </div>
      </main>
    </div>
  );
}
