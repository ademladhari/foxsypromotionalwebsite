import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import { Padlock, Key } from "./Models";
import { C } from "./palette";

/** Padlock that unlocks when `open` becomes true: the key flies into the keyhole, turns, the shackle pops. */
function UnlockRig({ open, still, onReady }) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);
  const openRef = useRef(still && open ? 1 : 0);
  const keyRef = useRef();
  const turnRef = useRef();
  const lock = useRef();
  const t0 = useRef(null);

  useEffect(() => {
    t0.current = null;
  }, [open]);

  useFrame((state, dt) => {
    const k = 1 - Math.pow(0.0005, dt);
    if (t0.current === null) t0.current = state.clock.elapsedTime;
    const t = still ? 10 : state.clock.elapsedTime - t0.current;

    // Phase 1 (0–0.8s): key travels into the keyhole. Phase 2 (0.8–1.3s): it turns. Then the shackle pops.
    const travel = open ? THREE.MathUtils.clamp(t / 0.8, 0, 1) : 0;
    const ease = 1 - Math.pow(1 - travel, 3);
    if (keyRef.current) {
      keyRef.current.position.z = THREE.MathUtils.lerp(3.4, 1.08, ease);
      keyRef.current.visible = open;
    }
    if (turnRef.current) {
      const turn = open ? THREE.MathUtils.clamp((t - 0.8) / 0.5, 0, 1) : 0;
      turnRef.current.rotation.x = (1 - Math.pow(1 - turn, 3)) * (Math.PI / 2);
    }
    const shackleTarget = open && t > 1.3 ? 1 : 0;
    openRef.current = still ? shackleTarget : THREE.MathUtils.lerp(openRef.current, shackleTarget, k * 0.9);

    if (lock.current && !still) {
      lock.current.rotation.y = -0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.18;
    }
  });

  return (
    <group position={[0, -0.25, 0]}>
      <group ref={lock} rotation={[0.14, -0.5, 0]}>
        <Float speed={still ? 0 : 1.5} rotationIntensity={still ? 0 : 0.15} floatIntensity={still ? 0 : 0.4}>
          <Padlock openRef={openRef} scale={1.25} />
          {/* key: shaft points into the keyhole (−z) */}
          <group ref={keyRef} position={[0, 0.1, 3.4]} visible={false}>
            <group rotation={[0, Math.PI / 2, 0]}>
              <group ref={turnRef}>
                <Key scale={0.6} color={C.cream} />
              </group>
            </group>
          </group>
        </Float>
      </group>
      {!still && <Sparkles count={40} scale={[6, 3.5, 2]} size={4} speed={0.4} color={C.orange} opacity={0.8} />}
    </group>
  );
}

export default function LockScene({ open = false, active = true, still = false, onReady }) {
  return (
    <Canvas
      frameloop={active && !still ? "always" : "demand"}
      dpr={[1, 2]}
      camera={{ position: [0, 0.2, 7], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} color={C.cream} />
      <directionalLight position={[3, 5, 4]} intensity={1.3} />
      <Suspense fallback={null}>
        <UnlockRig open={open} still={still} onReady={onReady} />
        <Environment resolution={128}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer form="circle" intensity={3} position={[0, 5, -9]} scale={2} />
            <Lightformer form="circle" intensity={1.5} position={[-5, 1, -1]} scale={2} color={C.peach} />
            <Lightformer form="circle" intensity={1.5} position={[10, 1, 0]} scale={8} color={C.cream} />
          </group>
        </Environment>
        <ContactShadows position={[0, -1.45, 0]} opacity={0.3} scale={8} blur={2.6} far={3} color={C.brown} frames={still ? 1 : Infinity} />
      </Suspense>
    </Canvas>
  );
}
