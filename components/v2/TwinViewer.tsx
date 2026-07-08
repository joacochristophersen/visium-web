"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls, useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";

/* ============================================================
   Visor first-person del gemelo digital.
   - GLB con Draco (decoder desde CDN de Google vía drei)
   - WASD camina (x/z) · Flechas rotan la mirada (pitch/yaw)
   - R sube / F baja · Shift corre · mouse mira (PointerLock)
   - Amortiguación exponencial en traslación Y rotación: la
     cámara acelera, panea y frena como una filmación real
   - <Canvas flat>: los escaneos traen la luz horneada en las
     texturas (KHR_materials_unlit) — el tone mapping ACES por
     defecto lavaría los colores reales
   ============================================================ */

const MODEL_URL = "/models/casa1.glb";
const EYE_HEIGHT = 1.6;
const WALK_SPEED = 1.9; // paseo contemplativo premium (antes 2.2)
const RUN_SPEED = 4.2;
const VERTICAL_SPEED = 2.2; // R/F un toque más ágil (antes 1.8)
const DAMPING = 7; // 1/s — mayor = frena antes
const ROT_SPEED = 1.4; // rad/s — paneo suave con flechas
const PITCH_LIMIT = THREE.MathUtils.degToRad(85); // sin vuelta carnero

/* Teclas de movimiento: se bloquea su acción por defecto (scroll) al navegar */
const MOVE_CODES = new Set([
  "KeyW", "KeyA", "KeyS", "KeyD",
  "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
  "KeyR", "KeyF", "ShiftLeft", "ShiftRight",
]);

function Model({ onReady }: { onReady: (box: THREE.Box3) => void }) {
  const { scene } = useGLTF(MODEL_URL, true);
  useEffect(() => {
    /* El pipeline pierde KHR_materials_unlit en el roundtrip por OBJ: el
       material vuelve como PBR que exige luces. Para escaneos la luz ya
       viene horneada en la textura → MeshBasicMaterial es lo correcto.
       DoubleSide blinda contra caras con winding invertido de PyMeshLab. */
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const toUnlit = (m: THREE.Material): THREE.Material => {
        if ((m as THREE.MeshBasicMaterial).isMeshBasicMaterial) {
          m.side = THREE.DoubleSide;
          return m;
        }
        const std = m as THREE.MeshStandardMaterial;
        const basic = new THREE.MeshBasicMaterial({
          map: std.map ?? null,
          side: THREE.DoubleSide,
        });
        if (!std.map) basic.color.set(0x8a8a8a); // parches sin textura: gris neutro
        m.dispose();
        return basic;
      };
      mesh.material = Array.isArray(mesh.material)
        ? mesh.material.map(toUnlit)
        : toUnlit(mesh.material);
    });
    onReady(new THREE.Box3().setFromObject(scene));
  }, [scene, onReady]);
  return <primitive object={scene} />;
}

function FirstPersonRig({ locked }: { locked: boolean }) {
  const { camera } = useThree();
  const keys = useRef<Set<string>>(new Set());
  const vel = useRef(new THREE.Vector3());
  /* Velocidad angular (x = pitch, y = yaw) — misma inercia que la traslación */
  const rotVel = useRef(new THREE.Vector2());
  const euler = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  const lockedRef = useRef(locked);
  lockedRef.current = locked;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!MOVE_CODES.has(e.code)) return;
      if (lockedRef.current) e.preventDefault();
      keys.current.add(e.code);
    };
    const up = (e: KeyboardEvent) => keys.current.delete(e.code);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame((_, dt) => {
    const k = keys.current;
    const speed = k.has("ShiftLeft") || k.has("ShiftRight") ? RUN_SPEED : WALK_SPEED;
    const t = 1 - Math.exp(-DAMPING * dt);

    /* ── Rotación con flechas: paneo cinematográfico amortiguado ── */
    const wishRot = new THREE.Vector2();
    if (lockedRef.current) {
      if (k.has("ArrowUp")) wishRot.x += ROT_SPEED;
      if (k.has("ArrowDown")) wishRot.x -= ROT_SPEED;
      if (k.has("ArrowLeft")) wishRot.y += ROT_SPEED;
      if (k.has("ArrowRight")) wishRot.y -= ROT_SPEED;
    }
    rotVel.current.lerp(wishRot, t);
    if (rotVel.current.lengthSq() > 1e-7) {
      /* YXZ: el mismo orden que usa PointerLockControls — ambos inputs
         escriben sobre el quaternion y conviven sin pisarse */
      const e = euler.current.setFromQuaternion(camera.quaternion);
      e.y += rotVel.current.y * dt;
      e.x = THREE.MathUtils.clamp(e.x + rotVel.current.x * dt, -PITCH_LIMIT, PITCH_LIMIT);
      e.z = 0;
      camera.quaternion.setFromEuler(e);
    }

    /* ── Traslación: WASD en x/z relativo a la mirada, R/F en y ── */
    const fwd = new THREE.Vector3();
    camera.getWorldDirection(fwd);
    fwd.y = 0;
    fwd.normalize();
    const right = new THREE.Vector3().crossVectors(fwd, camera.up).normalize();

    const wish = new THREE.Vector3();
    if (lockedRef.current) {
      if (k.has("KeyW")) wish.add(fwd);
      if (k.has("KeyS")) wish.sub(fwd);
      if (k.has("KeyD")) wish.add(right);
      if (k.has("KeyA")) wish.sub(right);
      if (wish.lengthSq() > 0) wish.normalize().multiplyScalar(speed);
      if (k.has("KeyR")) wish.y += VERTICAL_SPEED;
      if (k.has("KeyF")) wish.y -= VERTICAL_SPEED;
    }

    /* Amortiguación exponencial — independiente del framerate */
    vel.current.lerp(wish, t);
    camera.position.addScaledVector(vel.current, dt);
  });

  return null;
}

/* Overlay de progreso de carga del modelo */
function LoadOverlay() {
  const { progress, active } = useProgress();
  if (!active && progress >= 100) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/70">
      <span className="font-mono text-[13px] tracking-[0.08em] text-[#F0CB65]">
        CARGANDO GEMELO · {Math.round(progress)}%
      </span>
      <div className="h-[3px] w-48 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#F0CB65] to-[#D4AF37]"
          style={{ width: `${progress}%`, transition: "width 300ms ease" }}
        />
      </div>
    </div>
  );
}

export default function TwinViewer() {
  const [locked, setLocked] = useState(false);
  const [alt, setAlt] = useState(EYE_HEIGHT);
  const controlsRef = useRef<React.ElementRef<typeof PointerLockControls>>(null);
  const spawnRef = useRef<THREE.Vector3 | null>(null);

  return (
    <div className="twin-viewer-stage relative h-full w-full">
      <Canvas
        flat
        dpr={[1, 1.75]}
        camera={{ fov: 70, near: 0.05, far: 300, position: [0, EYE_HEIGHT, 0] }}
        onCreated={({ gl }) => {
          gl.setClearColor("#050505");
        }}
      >
        {/* Respaldo por si algún material queda PBR (los basic las ignoran) */}
        <ambientLight intensity={1.6} />
        <directionalLight position={[4, 8, 3]} intensity={1.1} />
        <Suspense fallback={null}>
          <Model
            onReady={(box) => {
              if (spawnRef.current) return;
              const c = box.getCenter(new THREE.Vector3());
              spawnRef.current = new THREE.Vector3(c.x, box.min.y + EYE_HEIGHT, c.z);
            }}
          />
        </Suspense>
        <FirstPersonRig locked={locked} />
        <PointerLockControls
          ref={controlsRef}
          selector=".twin-viewer-stage"
          onLock={() => setLocked(true)}
          onUnlock={() => setLocked(false)}
        />
        <CameraSpawnAndTelemetry spawnRef={spawnRef} onAlt={setAlt} />
      </Canvas>

      <LoadOverlay />

      {/* HUD — nunca obstruye la navegación */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-black/60 px-3 py-1.5 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#D4AF37]" />
        <span className="font-mono text-[10px] tracking-[0.14em] text-[#F0CB65]">
          VISIUM · LIVE
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-4 right-4 z-10 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-[10px] text-[#999999] backdrop-blur-sm">
        ALT <span className="text-[#F0CB65]">{alt.toFixed(1)} m</span>
      </div>

      {/* Crosshair — solo navegando */}
      {locked && (
        <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F0CB65]/80" />
      )}

      {/* Tomar el control */}
      {!locked && (
        <button
          onClick={() => controlsRef.current?.lock()}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-[#D4AF37]/40 bg-black/70 px-5 py-2.5 text-[12px] font-medium text-[#F0CB65] backdrop-blur-md transition-all duration-300 hover:scale-[1.04] hover:bg-[#D4AF37]/10"
        >
          Hacé click para tomar el control
        </button>
      )}
    </div>
  );
}

/* Posiciona la cámara en el spawn cuando el modelo está listo y
   reporta la altitud al HUD (throttle a ~7 Hz). */
function CameraSpawnAndTelemetry({
  spawnRef,
  onAlt,
}: {
  spawnRef: React.MutableRefObject<THREE.Vector3 | null>;
  onAlt: (y: number) => void;
}) {
  const { camera } = useThree();
  const spawned = useRef(false);
  const acc = useRef(0);

  useFrame((_, dt) => {
    if (!spawned.current && spawnRef.current) {
      camera.position.copy(spawnRef.current);
      spawned.current = true;
    }
    acc.current += dt;
    if (acc.current > 0.15) {
      acc.current = 0;
      onAlt(camera.position.y);
    }
  });

  return null;
}

useGLTF.preload(MODEL_URL, true);
