"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Infinite-feeling spatial floor grid that scrolls toward the camera —
 * the "ground plane" of the digital twin environment.
 */
export function SpatialGrid() {
  const grid = useRef<THREE.GridHelper>(null);

  useFrame((_, delta) => {
    if (!grid.current) return;
    grid.current.position.z = (grid.current.position.z + delta * 0.6) % 4;
  });

  return (
    <group rotation={[0, 0, 0]} position={[0, -2.4, 0]}>
      <gridHelper
        ref={grid}
        args={[80, 80, "#D4B36A", "#2a2417"]}
        position={[0, 0, 0]}
      />
      {/* Soft outer fade so distant grid lines dissolve into the void
          (kept translucent so the reflective floor below stays visible). */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[14, 40, 64]} />
        <meshBasicMaterial color="#050505" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}
