/* ============================================================
   Paso (b): extracción de keyframes del video de recorrido.

   Lo que es REAL en este archivo (sin dependencias externas):
   - computeKeyframeTimestamps: la función matemática pura que
     planifica timestamps espaciados dentro de una duración, con
     un tope de cantidad y un gap mínimo entre keyframes.

   Lo que es SIMULADO (documentado explícitamente):
   - La duración del video no se mide con ffprobe (no está
     disponible sin dependencias externas) — se ESTIMA a partir del
     Content-Length de una request HEAD, asumiendo un bitrate
     promedio fijo. Es un placeholder honesto, no una medición real.
   - Los frames en sí no se extraen (eso requiere ffmpeg, ver
     ARCHITECTURE.md § "Extracción de keyframes") — cada Keyframe
     sale con un imageUrl/sharpnessScore de placeholder.
   ============================================================ */

export type Keyframe = {
  timestampSec: number;
  imageUrl: string;
  sharpnessScore: number;
};

export type KeyframeExtractionResult = {
  keyframes: Keyframe[];
  sourceDurationSec: number;
  simulated: true; // hoy siempre true — dejar de serlo es reemplazar este archivo, no este flag
};

/* Función matemática pura: dada una duración, devuelve timestamps
   espaciados uniformemente, respetando un máximo de keyframes y un
   gap mínimo entre ellos (para no saturar de keyframes un video corto). */
export function computeKeyframeTimestamps(
  durationSec: number,
  options?: { targetCount?: number; minGapSec?: number }
): number[] {
  if (!Number.isFinite(durationSec) || durationSec <= 0) return [];

  const minGapSec = options?.minGapSec ?? 1.5;
  const targetCount = options?.targetCount ?? 12;
  const maxByGap = Math.floor(durationSec / minGapSec) + 1;
  const count = Math.max(1, Math.min(targetCount, maxByGap));

  if (count === 1) return [durationSec / 2];

  const step = durationSec / (count - 1);
  return Array.from({ length: count }, (_, i) => Math.min(i * step, durationSec));
}

// ~4 Mbps — bitrate típico de un video de recorrido en resolución media.
const ASSUMED_BITRATE_BYTES_PER_SEC = 4_000_000 / 8;

async function estimateDurationFromContentLength(videoUrl: string): Promise<number> {
  const res = await fetch(videoUrl, { method: "HEAD" });
  if (!res.ok) {
    throw new Error(`No se pudo leer metadata del video (HTTP ${res.status}): ${videoUrl}`);
  }
  const contentLength = Number(res.headers.get("content-length"));
  if (!contentLength || Number.isNaN(contentLength)) {
    throw new Error(
      "El servidor no devolvió Content-Length — no se puede estimar duración sin ffprobe"
    );
  }
  return contentLength / ASSUMED_BITRATE_BYTES_PER_SEC;
}

export async function extractKeyframesFromVideo(
  walkthroughVideoUrl: string,
  options?: { maxKeyframes?: number }
): Promise<KeyframeExtractionResult> {
  const sourceDurationSec = await estimateDurationFromContentLength(walkthroughVideoUrl);
  const timestamps = computeKeyframeTimestamps(sourceDurationSec, {
    targetCount: options?.maxKeyframes ?? 12,
  });

  const keyframes: Keyframe[] = timestamps.map((timestampSec) => ({
    timestampSec,
    imageUrl: "pending-frame-extraction", // requiere ffmpeg, no implementado
    sharpnessScore: 0, // requiere el frame real para poder medirlo
  }));

  return { keyframes, sourceDurationSec, simulated: true };
}
