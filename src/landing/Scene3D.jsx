import { Component, Suspense, lazy, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const HeroScene = lazy(() => import("./three/HeroScene"));
const LockScene = lazy(() => import("./three/LockScene"));
const SCENES = { hero: HeroScene, lock: LockScene };

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

/** If three.js throws (lost context, old GPU), keep showing the static fallback. */
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.warn("3D scene disabled:", err);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Lazy-loads a WebGL scene once its container nears the viewport, pauses rendering while it is
 * off-screen, freezes motion for prefers-reduced-motion, and shows `fallback` until the first frame.
 */
export default function Scene3D({ scene, fallback, className, style, sceneProps }) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const reduced = useReducedMotion();
  const Scene = SCENES[scene];

  useEffect(() => {
    setWebgl(supportsWebGL());
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={"scene3d " + (className || "")} style={style} data-ready={ready}>
      {fallback && <div className="scene3d-fallback" aria-hidden={ready || undefined}>{fallback}</div>}
      {webgl && near && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <div className="scene3d-canvas">
              <Scene active={visible} still={!!reduced} onReady={() => setReady(true)} {...sceneProps} />
            </div>
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
