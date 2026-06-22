"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Builds gold horizontal floor-lines for a tower's perimeter — the "twin" read. */
function buildFloorLines(w: number, d: number, ys: number[]) {
  const hw = w / 2;
  const hd = d / 2;
  const pts: number[] = [];
  for (const y of ys) {
    const c = [
      [-hw, y, -hd],
      [hw, y, -hd],
      [hw, y, hd],
      [-hw, y, hd],
    ];
    for (let i = 0; i < 4; i++) {
      const a = c[i];
      const b = c[(i + 1) % 4];
      pts.push(a[0], a[1], a[2], b[0], b[1], b[2]);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return g;
}

interface TowerProps {
  position: [number, number, number];
  width: number;
  depth: number;
  floors: number;
  floorH?: number;
  /** Render a vertical scanning plane sweeping the facade. */
  scan?: boolean;
  /** Ground Y (towers are seated on this plane). */
  groundY: number;
}

/** A single luxury tower rendered as a digital-twin: glass massing + gold floors + mullions. */
function Tower({
  position,
  width,
  depth,
  floors,
  floorH = 0.26,
  scan = false,
  groundY,
}: TowerProps) {
  const height = floors * floorH;
  const scanRef = useRef<THREE.Mesh>(null);

  const ys = useMemo(
    () => Array.from({ length: floors + 1 }, (_, i) => -height / 2 + i * floorH),
    [floors, height, floorH]
  );
  const floorGeo = useMemo(() => buildFloorLines(width, depth, ys), [width, depth, ys]);
  const massGeo = useMemo(() => new THREE.BoxGeometry(width, height, depth), [width, height, depth]);
  const edges = useMemo(() => new THREE.EdgesGeometry(massGeo), [massGeo]);

  // Corner mullions
  const mullions = useMemo(() => {
    const hw = width / 2;
    const hd = depth / 2;
    return [
      [-hw, hd],
      [hw, hd],
      [hw, -hd],
      [-hw, -hd],
    ] as [number, number][];
  }, [width, depth]);

  useFrame((state) => {
    if (!scanRef.current) return;
    const t = state.clock.elapsedTime;
    const p = (Math.sin(t * 0.5) * 0.5 + 0.5); // 0..1
    scanRef.current.position.y = -height / 2 + p * height;
    const m = scanRef.current.material as THREE.MeshBasicMaterial;
    m.opacity = 0.18 + Math.sin(t * 2) * 0.06;
  });

  // Seat the tower on the ground.
  const yBase = groundY + height / 2;

  return (
    <group position={[position[0], yBase, position[2]]}>
      {/* Glass massing */}
      <mesh geometry={massGeo}>
        <meshStandardMaterial
          color="#0b0e13"
          metalness={0.85}
          roughness={0.22}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Gold outline */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#D4B36A" transparent opacity={0.9} />
      </lineSegments>

      {/* Floor lines */}
      <lineSegments geometry={floorGeo}>
        <lineBasicMaterial color="#E6C98A" transparent opacity={0.32} />
      </lineSegments>

      {/* Corner mullions */}
      {mullions.map(([x, z], i) => (
        <mesh key={i} position={[x, 0, z]}>
          <boxGeometry args={[0.035, height, 0.035]} />
          <meshStandardMaterial
            color="#E6C98A"
            emissive="#D4B36A"
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Crown */}
      <mesh position={[0, height / 2 + 0.04, 0]}>
        <boxGeometry args={[width * 0.5, 0.06, depth * 0.5]} />
        <meshStandardMaterial color="#E6C98A" emissive="#D4B36A" emissiveIntensity={1.8} toneMapped={false} />
      </mesh>

      {/* Scanning plane (digital-twin capture) */}
      {scan && (
        <mesh ref={scanRef} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width * 1.5, depth * 1.5]} />
          <meshBasicMaterial
            color="#E6C98A"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

/**
 * VISIUM hero subject — a luxury residential development rendered as a digital
 * twin: a hero tower flanked by supporting towers on a reflective site plane.
 * Reads unmistakably as real estate / architecture, in the VISIUM gold language.
 */
export function CityTwin({ groundY = -3.25 }: { groundY?: number }) {
  const cluster = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cluster.current) {
      cluster.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.06) * 0.32;
    }
  });

  return (
    <group ref={cluster}>
      {/* Hero tower */}
      <Tower position={[0, 0, 0]} width={1.7} depth={1.7} floors={26} scan groundY={groundY} />
      {/* Supporting towers */}
      <Tower position={[-2.7, 0, -1.4]} width={1.25} depth={1.25} floors={17} groundY={groundY} />
      <Tower position={[2.6, 0, -1.7]} width={1.4} depth={1.4} floors={20} groundY={groundY} />
      <Tower position={[1.7, 0, 1.9]} width={1.0} depth={1.0} floors={11} groundY={groundY} />
      <Tower position={[-2.0, 0, 1.6]} width={0.95} depth={0.95} floors={9} groundY={groundY} />

      {/* Podium / plaza base under the hero tower */}
      <mesh position={[0, groundY + 0.06, 0]}>
        <boxGeometry args={[5.4, 0.12, 4.4]} />
        <meshStandardMaterial color="#0c0f14" metalness={0.7} roughness={0.4} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
