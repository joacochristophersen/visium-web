"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { AdaptiveDpr, Preload } from "@react-three/drei";
import * as THREE from "three";
import { CityTwin } from "./CityTwin";
import { SpatialGrid } from "./SpatialGrid";
import { Particles } from "./Particles";
import { Rig } from "./Rig";
import { AuroraBackdrop } from "./AuroraBackdrop";
import { ReflectiveFloor } from "./ReflectiveFloor";

/**
 * The full hero 3D scene — a luxury residential development rendered as a
 * VISIUM digital twin on a reflective site plane. Cinematic gold lighting,
 * scanning capture and atmospheric depth. Reads as real estate, not geometry.
 */
export function HeroScene() {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      dpr={[1, 2]}
      camera={{ position: [0, 1.6, 9.5], fov: 42 }}
      onCreated={({ gl }) => gl.setClearColor(0x050505, 0)}
    >
      <Suspense fallback={null}>
        {/* Cinematic lighting */}
        <ambientLight intensity={0.32} />
        <spotLight
          position={[7, 9, 7]}
          angle={0.38}
          penumbra={1}
          intensity={150}
          color="#ffffff"
          distance={44}
        />
        <pointLight position={[-7, -2, -5]} intensity={70} color="#D4B36A" distance={32} />
        <pointLight position={[5, 5, 5]} intensity={45} color="#E6C98A" distance={28} />
        <pointLight position={[0, -3, 2]} intensity={30} color="#D4B36A" distance={20} />

        <fog attach="fog" args={["#050505", 11, 26]} />

        <AuroraBackdrop />

        <Rig>
          <CityTwin />
        </Rig>

        <ReflectiveFloor />
        <SpatialGrid />
        <Particles count={300} />

        {/* Ground contact glow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.18, 0]}>
          <circleGeometry args={[6, 64]} />
          <meshBasicMaterial
            color="#D4B36A"
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <AdaptiveDpr pixelated />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
