/* ============================================================
   Paso (a): detección de muros a partir del plano 2D.

   Lo que es REAL en este archivo (sin dependencias externas):
   - Descarga de la imagen (fetch nativo).
   - Sniff de formato + lectura de dimensiones reales: PNG vía el
     chunk IHDR, JPEG vía el segmento SOFn — ambos son parseo de
     bytes puro, no requieren decodificar la imagen completa.

   Lo que es SIMULADO (documentado explícitamente, no es visión
   computacional real):
   - La geometría de los muros. No hay segmentación ni transformada
     de Hough corriendo acá — eso sigue pendiente de un modelo real
     o servicio externo (ver ARCHITECTURE.md § "Detección de muros").
     Para poder probar el resto del pipeline de punta a punta, se
     genera una geometría plausible con un PRNG determinístico
     sembrado con un hash de los bytes de la imagen: la misma imagen
     siempre produce el mismo resultado simulado.
   ============================================================ */

import { createHash } from "node:crypto";

export type Point2D = { x: number; y: number };

export type DetectedWall = {
  start: Point2D;
  end: Point2D;
  thicknessM: number;
};

export type WallDetectionResult = {
  scaleMetersPerPixel: number;
  simulated: true; // hoy siempre true — dejar de serlo es reemplazar este archivo, no este flag
  imageFormat: "png" | "jpeg" | "unknown";
  imageDimensionsPx: { width: number; height: number };
  walls: DetectedWall[];
  openings: { type: "door" | "window"; wallIndex: number; positionRatio: number }[];
};

/* Paso 1: bajar los bytes crudos de la imagen. */
async function fetchImageBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`No se pudo descargar el plano (HTTP ${res.status}): ${url}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

type ImageMeta = { format: "png" | "jpeg" | "unknown"; widthPx: number; heightPx: number };

const ASSUMED_SIZE_PX = { widthPx: 1024, heightPx: 768 } as const;
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/* Paso 2: sniff de formato + dimensiones reales.
   - PNG: firma de 8 bytes, luego el primer chunk es siempre IHDR
     (ancho/alto como uint32 big-endian en los bytes 16-23).
   - JPEG: escanea los marcadores (0xFF NN) buscando un segmento
     SOFn (Start Of Frame) — ahí vienen alto/ancho como uint16 BE.
   Si el formato no se reconoce, cae a un tamaño asumido para no
   frenar el resto del pipeline (esto SÍ es un placeholder real). */
function readImageMeta(buf: Buffer): ImageMeta {
  if (buf.length >= 24 && buf.subarray(0, 8).equals(PNG_SIGNATURE)) {
    const widthPx = buf.readUInt32BE(16);
    const heightPx = buf.readUInt32BE(20);
    if (widthPx > 0 && heightPx > 0) return { format: "png", widthPx, heightPx };
  }

  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buf.length && buf[offset] === 0xff) {
      const marker = buf[offset + 1];
      const isStandalone = marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7);
      if (isStandalone) {
        offset += 2;
        continue;
      }
      const segmentLength = buf.readUInt16BE(offset + 2);
      const isSOF = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isSOF) {
        const heightPx = buf.readUInt16BE(offset + 5);
        const widthPx = buf.readUInt16BE(offset + 7);
        return { format: "jpeg", widthPx, heightPx };
      }
      offset += 2 + segmentLength;
    }
  }

  return { format: "unknown", ...ASSUMED_SIZE_PX };
}

function seedFromBuffer(buf: Buffer): number {
  return createHash("sha256").update(buf).digest().readUInt32BE(0);
}

/* Mulberry32 — PRNG determinístico chico, suficiente para simular
   (no necesita ser criptográficamente fuerte, solo reproducible). */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 100 px ≈ 1 m — placeholder hasta calibrar con una cota real del plano.
const ASSUMED_SCALE_M_PER_PX = 1 / 100;

function simulateWalls(
  rng: () => number,
  widthPx: number,
  heightPx: number,
  scaleMetersPerPixel: number
): DetectedWall[] {
  const wallCount = 4 + Math.floor(rng() * 4); // entre 4 y 7
  const walls: DetectedWall[] = [];
  for (let i = 0; i < wallCount; i++) {
    const horizontal = rng() > 0.5;
    const start: Point2D = {
      x: rng() * widthPx * scaleMetersPerPixel,
      y: rng() * heightPx * scaleMetersPerPixel,
    };
    const spanPx = horizontal ? widthPx : heightPx;
    const length = (0.15 + rng() * 0.6) * spanPx * scaleMetersPerPixel;
    const end: Point2D = horizontal
      ? { x: start.x + length, y: start.y }
      : { x: start.x, y: start.y + length };
    walls.push({ start, end, thicknessM: 0.1 + rng() * 0.1 });
  }
  return walls;
}

export async function detectWallsFromFloorplan(floorplanImageUrl: string): Promise<WallDetectionResult> {
  const buf = await fetchImageBuffer(floorplanImageUrl);
  const { format, widthPx, heightPx } = readImageMeta(buf);
  const rng = mulberry32(seedFromBuffer(buf));

  const walls = simulateWalls(rng, widthPx, heightPx, ASSUMED_SCALE_M_PER_PX);
  const openings = walls.slice(0, Math.min(2, walls.length)).map((_, i) => ({
    type: (i % 2 === 0 ? "door" : "window") as "door" | "window",
    wallIndex: i,
    positionRatio: 0.3 + rng() * 0.4,
  }));

  return {
    scaleMetersPerPixel: ASSUMED_SCALE_M_PER_PX,
    simulated: true,
    imageFormat: format,
    imageDimensionsPx: { width: widthPx, height: heightPx },
    walls,
    openings,
  };
}
