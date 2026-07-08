/* ============================================================
   Paso (b): extracción de keyframes del video de recorrido.
   STUB DE ARQUITECTURA — no procesa video real todavía. Documenta
   la interfaz y el approach previsto. Ver ARCHITECTURE.md §
   "Extracción de keyframes".

   Approach previsto (no implementado acá):
   1. Descargar/streamear el video de walkthroughVideoUrl.
   2. Detección de cambio de escena (frame-diff / histograma) para
      priorizar frames que muestran un ambiente nuevo, en vez de
      muestreo a intervalo fijo — reduce keyframes redundantes en
      tramos de cámara quieta.
   3. Filtrar frames borrosos (varianza del Laplaciano por debajo de
      un umbral) antes de emitirlos como candidatos a textura.
   4. Extraer los frames elegidos como imágenes (ffmpeg) junto con su
      timestamp, para poder correlacionarlos después con las fotos
      sueltas del paquete de ZonaProp.
   ffmpeg es la herramienta natural para los pasos 1 y 4 (vía un
   binario o un microservicio, no vía una librería pura de Node) —
   por eso este paso, igual que la detección de muros, es candidato a
   vivir fuera del proceso de Next.js.
   ============================================================ */

export type Keyframe = {
  timestampSec: number;
  imageUrl: string;
  sharpnessScore: number;
};

export type KeyframeExtractionResult = {
  keyframes: Keyframe[];
  sourceDurationSec: number;
};

export async function extractKeyframesFromVideo(
  walkthroughVideoUrl: string,
  options?: { maxKeyframes?: number }
): Promise<KeyframeExtractionResult> {
  void walkthroughVideoUrl;
  void options;
  throw new Error(
    "extractKeyframesFromVideo: no implementado — stub de arquitectura, ver ARCHITECTURE.md"
  );
}
