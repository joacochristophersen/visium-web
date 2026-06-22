"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A large curved plane behind the scene running a custom fragment shader —
 * a slow volumetric aurora of VISIUM greens. Pure GLSL, no textures, GPU-cheap.
 */
export function AuroraBackdrop() {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#D4B36A") },
      uColorB: { value: new THREE.Color("#E6C98A") },
      uColorBg: { value: new THREE.Color("#050505") },
    }),
    []
  );

  useFrame((_, delta) => {
    if (mat.current) mat.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh position={[0, 0.5, -9]} scale={[26, 16, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexShader={
          /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `
        }
        fragmentShader={
          /* glsl */ `
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          uniform vec3 uColorBg;

          // Simplex-ish value noise
          float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
          float noise(vec2 p){
            vec2 i = floor(p); vec2 f = fract(p);
            vec2 u = f*f*(3.0-2.0*f);
            return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
                       mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
          }
          float fbm(vec2 p){
            float v = 0.0; float a = 0.5;
            for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
            return v;
          }

          void main(){
            vec2 uv = vUv;
            float t = uTime * 0.06;
            float flow = fbm(uv * 3.0 + vec2(t, t*0.5));
            float band = smoothstep(0.35, 0.85, fbm(uv * vec2(2.0, 4.0) + vec2(-t, flow)));

            // vertical falloff so the glow sits low like a horizon
            float vert = smoothstep(0.0, 0.7, uv.y) * (1.0 - smoothstep(0.6, 1.0, uv.y));

            vec3 col = mix(uColorBg, uColorA, band * vert * 0.9);
            col = mix(col, uColorB, pow(band, 3.0) * vert * 0.6);

            // radial vignette toward edges
            float d = distance(uv, vec2(0.5));
            float vig = smoothstep(0.9, 0.2, d);

            float alpha = (band * vert * 0.55 + 0.04) * vig;
            gl_FragColor = vec4(col, alpha);
          }
        `
        }
      />
    </mesh>
  );
}
