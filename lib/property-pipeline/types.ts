/* ============================================================
   Contratos compartidos del pipeline de procesamiento estructurado
   (plano 2D + fotos + video → gemelo digital navegable). Ver
   ARCHITECTURE.md para el diseño completo del flujo.
   ============================================================ */

export type PropertyPackage = {
  sourcePropertyId?: string;
  floorplanImageUrl: string;
  photoUrls: string[];
  walkthroughVideoUrl: string;
};

export type PipelineStepId = "wall-detection" | "keyframe-extraction" | "cloud-reconstruction";

export type StepStatus = "pending" | "running" | "done" | "failed";

export type PipelineStep = {
  id: PipelineStepId;
  label: string;
  description: string;
  status: StepStatus;
};

export type JobStatus = "queued" | "processing" | "done" | "failed";

export type ProcessingJob = {
  jobId: string;
  status: JobStatus;
  input: PropertyPackage;
  steps: PipelineStep[];
  createdAt: string;
};

/* Orden y metadata de los pasos del pipeline — el estado real de cada
   uno lo completan los módulos en wall-detection.ts / keyframe-extraction.ts
   (hoy stubs; ver ARCHITECTURE.md para el reemplazo por servicios reales). */
export const PIPELINE_STEPS: Omit<PipelineStep, "status">[] = [
  {
    id: "wall-detection",
    label: "Detección de muros (plano 2D)",
    description:
      "Segmenta el plano 2D para extraer muros, aberturas y ambientes como geometría estructurada.",
  },
  {
    id: "keyframe-extraction",
    label: "Extracción de keyframes (video)",
    description:
      "Selecciona frames representativos del recorrido para usar como textura/referencia visual.",
  },
  {
    id: "cloud-reconstruction",
    label: "Reconstrucción en la nube",
    description:
      "Envía planos + keyframes + fotos a un servicio de reconstrucción 3D y recibe el asset navegable.",
  },
];
