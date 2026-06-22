"use client";

import { MeshReflectorMaterial } from "@react-three/drei";

/**
 * A polished, slightly rough reflective floor that mirrors the digital twin
 * and the green glow — the single biggest jump in perceived production value.
 */
export function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.25, 0]}>
      <planeGeometry args={[60, 60]} />
      <MeshReflectorMaterial
        resolution={1024}
        mirror={0.55}
        mixBlur={8}
        mixStrength={1.4}
        blur={[400, 120]}
        roughness={0.85}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#05080a"
        metalness={0.7}
        reflectorOffset={0.02}
      />
    </mesh>
  );
}
