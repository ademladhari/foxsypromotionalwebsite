import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer } from "@react-three/drei";
import friendScreen from "../../assets/screens/locked.webp";
import { Phone, Padlock, Key, BlockedTile } from "./Models";
import { C } from "./palette";

/** Window-wide pointer (−1..1) so the scene reacts even when the cursor is over the copy. */
function usePointer() {
  const p = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const on = (e) => {
      p.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      p.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, []);
  return p;
}

function Rig({ still, onReady }) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);
  const group = useRef();
  const phone = useRef();
  const pointer = usePointer();

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.pow(0.001, dt); // frame-rate independent damping
    const scroll = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
    const px = still ? 0 : pointer.current.x;
    const py = still ? 0 : pointer.current.y;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, px * 0.28, k);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, py * 0.14, k);
    if (phone.current) {
      phone.current.rotation.y = THREE.MathUtils.lerp(phone.current.rotation.y, -0.38 + scroll * 0.9, k);
      phone.current.position.y = THREE.MathUtils.lerp(phone.current.position.y, scroll * 0.6, k);
    }
  });

  const f = still ? { speed: 0, floatIntensity: 0, rotationIntensity: 0 } : null;
  // The object cluster spans about 6 × 5.4 world units; shrink it to whatever the canvas shows.
  const viewport = useThree((st) => st.viewport);
  const s = Math.min(1.15, viewport.width / 6, viewport.height / 5.4);

  return (
    <group ref={group} scale={s}>
      <group ref={phone} rotation={[0.06, -0.38, 0.04]}>
        <Float {...(f ?? { speed: 1.4, rotationIntensity: 0.25, floatIntensity: 0.6 })}>
          <Phone screen={friendScreen} />
        </Float>
      </group>

      <Float {...(f ?? { speed: 2, rotationIntensity: 0.8, floatIntensity: 1.2 })}>
        <Padlock position={[-2.05, 1.35, -0.6]} rotation={[0.1, 0.5, -0.12]} scale={0.78} />
      </Float>

      <Float {...(f ?? { speed: 1.8, rotationIntensity: 1, floatIntensity: 1.4 })}>
        <Key position={[1.4, -0.95, 0.9]} rotation={[0.3, -0.5, 0.6]} scale={0.8} />
      </Float>

      <Float {...(f ?? { speed: 2.2, rotationIntensity: 1.1, floatIntensity: 1 })}>
        <BlockedTile position={[1.85, 1.45, -0.5]} rotation={[0.2, -0.6, 0.15]} />
      </Float>
      <Float {...(f ?? { speed: 1.6, rotationIntensity: 0.9, floatIntensity: 1.1 })}>
        <BlockedTile position={[-1.95, -1.75, 0.4]} rotation={[-0.2, 0.55, -0.2]} color={C.blush} scale={0.85} />
      </Float>
      <Float {...(f ?? { speed: 2.4, rotationIntensity: 1.2, floatIntensity: 0.9 })}>
        <BlockedTile position={[2.45, 0.45, -1.4]} rotation={[0.1, -0.8, 0.1]} color={C.orange} mark="#FFFFFF" scale={0.7} />
      </Float>
    </group>
  );
}

export default function HeroScene({ active = true, still = false, compact = false, onReady }) {
  return (
    <Canvas
      frameloop={active && !still ? "always" : "demand"}
      dpr={[1, compact ? 1.5 : 2]}
      camera={{ position: [0, 0, 9.5], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.55} color={C.cream} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#fff3ea" />
      <pointLight position={[-4, -2, 3]} intensity={18} color={C.peach} distance={12} />

      <Suspense fallback={null}>
        <Rig still={still} onReady={onReady} />
        {/* Studio lighting from in-scene light panels — no external HDR download. */}
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer form="circle" intensity={3} position={[0, 5, -9]} scale={2} />
            <Lightformer form="circle" intensity={1.5} position={[-5, 1, -1]} scale={2} color={C.peach} />
            <Lightformer form="circle" intensity={1.5} position={[10, 1, 0]} scale={8} color={C.cream} />
            <Lightformer form="ring" intensity={2} position={[-5, -3, 3]} scale={3} color={C.orange} />
          </group>
        </Environment>
        <ContactShadows position={[0, -2.6, 0]} opacity={0.32} scale={12} blur={2.8} far={4.5} color={C.brown} frames={still ? 1 : Infinity} />
      </Suspense>
    </Canvas>
  );
}
