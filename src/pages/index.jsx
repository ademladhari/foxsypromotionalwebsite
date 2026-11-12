import { MotionConfig } from "framer-motion";
import "../landing/landing.css";
import Nav from "../landing/Nav";
import Hero from "../landing/Hero";
import Marquee from "../landing/Marquee";
import Features from "../landing/Features";
import InApp from "../landing/InApp";
import HowItWorks from "../landing/HowItWorks";
import StrictMode from "../landing/StrictMode";
import Testimonials from "../landing/Testimonials";
// Pricing is hidden for now; re-add <Pricing /> (and its NAV entry in data.js) to bring it back.
import Redirect from "../landing/Redirect";
import Faq from "../landing/Faq";
import { FinalCta, Footer } from "../landing/Closing";

export default function FocsyLanding() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="page">
        <a className="skip-link" href="#main">Skip to Content</a>
        <Nav />
        <main id="main">
          <Hero />
          <Marquee />
          <Features />
          <InApp />
          <Redirect />
          <HowItWorks />
          <StrictMode />
          <Testimonials />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
