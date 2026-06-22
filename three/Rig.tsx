"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, type ReactNode } from "react";
import * as THREE from "three";

/**
 * Camera parallax rig — eases the camera toward the pointer for a
 * subtle "looking around the space" feel. Falls back to gentle idle
 * motion when the pointer is centered.
 */
export function Rig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer, camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // Frame the development from a slightly low, heroic angle.
    target.current.set(
      pointer.x * 1.4 + Math.sin(t * 0.12) * 0.4,
      pointer.y * 0.8 + 1.1 + Math.cos(t * 0.1) * 0.2,
      9.4
    );
    camera.position.lerp(target.current, 1 - Math.pow(0.001, delta));
    camera.lookAt(0, 0.4, 0);

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        pointer.x * 0.2,
        1 - Math.pow(0.001, delta)
      );
    }
  });

  return <group ref={group}>{children}</group>;
}
