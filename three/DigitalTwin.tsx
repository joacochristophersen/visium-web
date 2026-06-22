"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/** A single floating floor-plate of the digital twin tower. */
function Plate({
  y,
  size,
  delay,
}: {
  y: number;
  size: [number, number, number];
  delay: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(...size)),
    [size]
  );

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime + delay;
    mesh.current.rotation.y = Math.sin(t * 0.15) * 0.05;
  });

  return (
    <group position={[0, y, 0]}>
      <mesh ref={mesh}>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color="#0d1217"
          metalness={0.9}
          roughness={0.22}
          transparent
          opacity={0.6}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#D4B36A" transparent opacity={0.85} />
      </lineSegments>
    </group>
  );
}

/**
 * The floating "digital twin" — a stack of architectural floor-plates wrapped
 * by a rotating wireframe scan-field, a glowing core, an orbiting ring and a
 * vertical scanning beam. The spatial signature of a VISIUM capture.
 */
export function DigitalTwin() {
  const ring = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const field = useRef<THREE.LineSegments>(null);
  const beam = useRef<THREE.Mesh>(null);

  const plates = useMemo(
    () => [
      { y: -1.6, size: [3.4, 0.5, 3.4] as [number, number, number], delay: 0 },
      { y: -0.7, size: [2.8, 0.46, 2.8] as [number, number, number], delay: 1 },
      { y: 0.15, size: [2.25, 0.42, 2.25] as [number, number, number], delay: 2 },
      { y: 0.95, size: [1.65, 0.38, 1.65] as [number, number, number], delay: 3 },
      { y: 1.6, size: [1.05, 0.32, 1.05] as [number, number, number], delay: 4 },
      { y: 2.1, size: [0.55, 0.26, 0.55] as [number, number, number], delay: 5 },
    ],
    []
  );

  const fieldGeo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(3.4, 1)),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring.current) {
      ring.current.rotation.z = t * 0.5;
      ring.current.position.y = Math.sin(t * 0.55) * 2;
    }
    if (core.current) {
      core.current.scale.setScalar(1 + Math.sin(t * 1.6) * 0.07);
      core.current.rotation.y = t * 0.4;
    }
    if (field.current) {
      field.current.rotation.y = t * 0.08;
      field.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (beam.current) {
      const b = beam.current.material as THREE.MeshBasicMaterial;
      b.opacity = 0.12 + (Math.sin(t * 2) * 0.5 + 0.5) * 0.18;
    }
  });

  return (
    <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.55}>
      <group>
        {/* Outer scan field */}
        <lineSegments ref={field} geometry={fieldGeo}>
          <lineBasicMaterial color="#E6C98A" transparent opacity={0.16} />
        </lineSegments>

        {plates.map((p, i) => (
          <Plate key={i} {...p} />
        ))}

        {/* Vertical scanning beam */}
        <mesh ref={beam} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 6, 12]} />
          <meshBasicMaterial
            color="#E6C98A"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Luminous core */}
        <mesh ref={core}>
          <icosahedronGeometry args={[0.46, 1]} />
          <meshStandardMaterial
            color="#E6C98A"
            emissive="#D4B36A"
            emissiveIntensity={2.6}
            toneMapped={false}
          />
        </mesh>

        {/* Orbiting scan ring */}
        <mesh ref={ring} rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[2.9, 0.012, 16, 140]} />
          <meshStandardMaterial
            color="#E6C98A"
            emissive="#E6C98A"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      </group>
    </Float>
  );
}
