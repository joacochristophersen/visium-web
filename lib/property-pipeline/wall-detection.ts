/* ============================================================
   Paso (a): detección de muros a partir del plano 2D.
   STUB DE ARQUITECTURA — no ejecuta visión computacional real
   todavía. Documenta la interfaz y el approach previsto para que
   el paso se pueda implementar/reemplazar sin tocar el resto del
   pipeline. Ver ARCHITECTURE.md § "Detección de muros".

   Approach previsto (no implementado acá):
   1. Normalizar el plano (deskew, escala en base a una cota conocida
      si viene en el paquete de ZonaProp).
   2. Segmentación: binarizar + detección de bordes (Canny) y
      transformada de Hough para líneas rectas largas → candidatos
      a muro; o un modelo entrenado (ej. segmentación semántica estilo
      CubiCasa5k) para mayor precisión en planos con estilos variados.
   3. Vectorizar: agrupar segmentos colineales, resolver esquinas/
      intersecciones, y emitir un grafo de muros con grosor y aberturas
      (puertas/ventanas) como polígonos en un sistema de coordenadas
      métrico.
   Esta etapa es candidata a correr como microservicio Python (OpenCV +
   un modelo de segmentación) en vez de en el proceso de Next.js — el
   contrato de tipos de abajo es el mismo se implemente donde se
   implemente.
   ============================================================ */

export type Point2D = { x: number; y: number };

export type DetectedWall = {
  start: Point2D;
  end: Point2D;
  thicknessM: number;
};

export type WallDetectionResult = {
  scaleMetersPerPixel: number;
  walls: DetectedWall[];
  openings: { type: "door" | "window"; wallIndex: number; positionRatio: number }[];
};

export async function detectWallsFromFloorplan(
  floorplanImageUrl: string
): Promise<WallDetectionResult> {
  void floorplanImageUrl;
  throw new Error(
    "detectWallsFromFloorplan: no implementado — stub de arquitectura, ver ARCHITECTURE.md"
  );
}
