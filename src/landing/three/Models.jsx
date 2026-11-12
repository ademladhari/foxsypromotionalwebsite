import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";

import { C } from "./palette";

/** Rounded-rectangle plane whose UVs span 0..1 (ShapeGeometry UVs are raw positions). */
function useRoundedPlane(w, h, r) {
  return useMemo(() => {
    const s = new THREE.Shape();
    const x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    const g = new THREE.ShapeGeometry(s, 12);
    const pos = g.attributes.position;
    const uv = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
      uv[i * 2] = (pos.getX(i) - x) / w;
      uv[i * 2 + 1] = (pos.getY(i) - y) / h;
    }
    g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    return g;
  }, [w, h, r]);
}

/** Phone with a real Focsy screen as its display. */
export function Phone({ screen, ...props }) {
  const tex = useTexture(screen);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const W = 1.9, H = 3.9, D = 0.22;
  // Cover-fit: crop the screenshot's sides/top so it isn't stretched onto the 1.76 × 3.53 display.
  const plane = 1.76 / 3.53, img = tex.image ? tex.image.width / tex.image.height : plane;
  if (img > plane) { tex.repeat.set(plane / img, 1); tex.offset.set((1 - plane / img) / 2, 0); }
  else { tex.repeat.set(1, img / plane); tex.offset.set(0, 1 - img / plane); }
  const screenGeo = useRoundedPlane(1.76, 3.53, 0.2);
  const glassGeo = useRoundedPlane(1.8, 3.6, 0.22);

  return (
    <group {...props}>
      {/* body */}
      <RoundedBox args={[W, H, D]} radius={0.26} smoothness={8} castShadow>
        <meshPhysicalMaterial color="#2f2a2b" metalness={0.65} roughness={0.32} clearcoat={1} clearcoatRoughness={0.15} />
      </RoundedBox>
      {/* bezel glass */}
      <mesh geometry={glassGeo} position={[0, 0, D / 2 + 0.001]}>
        <meshStandardMaterial color="#0d0b0b" roughness={0.2} />
      </mesh>
      {/* display */}
      <mesh geometry={screenGeo} position={[0, 0, D / 2 + 0.003]}>
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      {/* dynamic island */}
      <RoundedBox args={[0.46, 0.13, 0.01]} radius={0.06} position={[0, 1.6, D / 2 + 0.006]}>
        <meshBasicMaterial color="#0a0909" />
      </RoundedBox>
      {/* side buttons */}
      <RoundedBox args={[0.05, 0.5, 0.08]} radius={0.02} position={[W / 2 + 0.01, 0.9, 0]}>
        <meshStandardMaterial color="#3a3435" metalness={0.7} roughness={0.3} />
      </RoundedBox>
      <RoundedBox args={[0.05, 0.32, 0.08]} radius={0.02} position={[-W / 2 - 0.01, 1.05, 0]}>
        <meshStandardMaterial color="#3a3435" metalness={0.7} roughness={0.3} />
      </RoundedBox>
      <RoundedBox args={[0.05, 0.32, 0.08]} radius={0.02} position={[-W / 2 - 0.01, 0.62, 0]}>
        <meshStandardMaterial color="#3a3435" metalness={0.7} roughness={0.3} />
      </RoundedBox>
      {/* back: orange camera bump */}
      <RoundedBox args={[0.7, 0.7, 0.06]} radius={0.16} position={[-0.45, 1.35, -D / 2 - 0.02]}>
        <meshPhysicalMaterial color="#2a2526" metalness={0.6} roughness={0.25} clearcoat={1} />
      </RoundedBox>
    </group>
  );
}

const glossy = (color, extra = {}) => (
  <meshPhysicalMaterial color={color} roughness={0.22} metalness={0.05} clearcoat={1} clearcoatRoughness={0.12} {...extra} />
);

/**
 * Padlock. `openRef.current` (0..1) drives the shackle — 0 locked, 1 open.
 */
export function Padlock({ openRef, color = C.orange, ...props }) {
  const shackle = useRef();
  // Satin, only half metallic: full chrome mirrors the empty backdrop and reads as black.
  const steel = <meshPhysicalMaterial color="#F3E9E2" metalness={0.45} roughness={0.28} clearcoat={1} clearcoatRoughness={0.2} />;
  useFrame(() => {
    if (!shackle.current) return;
    const t = openRef?.current ?? 0;
    shackle.current.position.y = 0.55 + t * 0.32;
    shackle.current.rotation.y = t * 0.9;
  });
  return (
    <group {...props}>
      {/* shackle — pivots around its left leg */}
      <group ref={shackle} position={[-0.36, 0.55, 0]}>
        <group position={[0.36, 0, 0]}>
          <mesh position={[0, 0.32, 0]} castShadow>
            <torusGeometry args={[0.36, 0.1, 24, 48, Math.PI]} />
            {steel}
          </mesh>
          <mesh position={[-0.36, 0.06, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.52, 24]} />
            {steel}
          </mesh>
          <mesh position={[0.36, 0.06, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.52, 24]} />
            {steel}
          </mesh>
        </group>
      </group>
      {/* body */}
      <RoundedBox args={[1.3, 1.1, 0.55]} radius={0.18} smoothness={8} castShadow>
        {glossy(color)}
      </RoundedBox>
      {/* keyhole */}
      <mesh position={[0, 0.08, 0.278]}>
        <circleGeometry args={[0.13, 32]} />
        <meshBasicMaterial color={C.brown} />
      </mesh>
      <mesh position={[0, -0.12, 0.278]}>
        <planeGeometry args={[0.1, 0.3]} />
        <meshBasicMaterial color={C.brown} />
      </mesh>
    </group>
  );
}

/** The key your friend holds. */
export function Key({ color = C.blush, ...props }) {
  const mat = <meshPhysicalMaterial color={color} metalness={0.55} roughness={0.22} clearcoat={1} />;
  return (
    <group {...props}>
      <mesh castShadow>
        <torusGeometry args={[0.3, 0.1, 24, 48]} />
        {mat}
      </mesh>
      <mesh position={[0.82, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.075, 0.075, 1.05, 24]} />
        {mat}
      </mesh>
      <mesh position={[1.2, -0.16, 0]}>
        <boxGeometry args={[0.1, 0.26, 0.12]} />
        {mat}
      </mesh>
      <mesh position={[1.0, -0.12, 0]}>
        <boxGeometry args={[0.1, 0.18, 0.12]} />
        {mat}
      </mesh>
    </group>
  );
}

/** A generic app tile with a "blocked" mark. */
export function BlockedTile({ color = "#FFFFFF", mark = C.orange, ...props }) {
  return (
    <group {...props}>
      <RoundedBox args={[0.82, 0.82, 0.2]} radius={0.2} smoothness={6} castShadow>
        {glossy(color)}
      </RoundedBox>
      <mesh position={[0, 0, 0.105]}>
        <torusGeometry args={[0.22, 0.045, 16, 48]} />
        <meshStandardMaterial color={mark} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.105]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.44, 0.07, 0.04]} />
        <meshStandardMaterial color={mark} roughness={0.35} />
      </mesh>
    </group>
  );
}
