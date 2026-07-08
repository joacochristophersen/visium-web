import { NextResponse, after } from "next/server";
import {
  PIPELINE_STEPS,
  type PropertyPackage,
  type ProcessingJob,
} from "@/lib/property-pipeline/types";
import { detectWallsFromFloorplan } from "@/lib/property-pipeline/wall-detection";
import { extractKeyframesFromVideo } from "@/lib/property-pipeline/keyframe-extraction";

/* ============================================================
   Endpoint de prueba — simula la recepción de un paquete de
   datos estilo ZonaProp (plano 2D + fotos + video de recorrido),
   crea un job y responde 202 de inmediato. El procesamiento (hoy:
   detección de muros simulada + planificación de keyframes, ver
   lib/property-pipeline/) corre DESPUÉS de responder, vía after()
   de Next.js — así el request no queda bloqueado esperando el
   fetch de la imagen/video. GET ?jobId= permite pollear el
   resultado a medida que cada paso termina.
   El store en memoria es efímero — se pierde en cada reinicio /
   redeploy, es solo para probar el ciclo create → poll → resultado.
   ============================================================ */

const URL_RE = /^https?:\/\/\S+$/i;

const jobs = new Map<string, ProcessingJob>();

async function runPipeline(job: ProcessingJob) {
  job.status = "processing";

  const wallStep = job.steps.find((s) => s.id === "wall-detection")!;
  const keyframeStep = job.steps.find((s) => s.id === "keyframe-extraction")!;

  wallStep.status = "running";
  try {
    const walls = await detectWallsFromFloorplan(job.input.floorplanImageUrl);
    job.result = { ...job.result, walls };
    wallStep.status = "done";
  } catch (err) {
    wallStep.status = "failed";
    console.error(`[property-processor] ${job.jobId} wall-detection falló:`, err);
  }

  keyframeStep.status = "running";
  try {
    const keyframes = await extractKeyframesFromVideo(job.input.walkthroughVideoUrl);
    job.result = { ...job.result, keyframes };
    keyframeStep.status = "done";
  } catch (err) {
    keyframeStep.status = "failed";
    console.error(`[property-processor] ${job.jobId} keyframe-extraction falló:`, err);
  }

  // cloud-reconstruction queda fuera de este pivot — ver ARCHITECTURE.md.
  const anyFailed = wallStep.status === "failed" || keyframeStep.status === "failed";
  job.status = anyFailed ? "failed" : "done";
}

function validatePackage(body: unknown): { data?: PropertyPackage; error?: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Body debe ser un objeto JSON" };
  }
  const b = body as Record<string, unknown>;

  if (typeof b.floorplanImageUrl !== "string" || !URL_RE.test(b.floorplanImageUrl)) {
    return { error: "floorplanImageUrl debe ser una URL http(s) válida" };
  }
  if (
    !Array.isArray(b.photoUrls) ||
    b.photoUrls.length === 0 ||
    !b.photoUrls.every((u) => typeof u === "string" && URL_RE.test(u))
  ) {
    return { error: "photoUrls debe ser un array no vacío de URLs http(s)" };
  }
  if (typeof b.walkthroughVideoUrl !== "string" || !URL_RE.test(b.walkthroughVideoUrl)) {
    return { error: "walkthroughVideoUrl debe ser una URL http(s) válida" };
  }

  return {
    data: {
      sourcePropertyId: typeof b.sourcePropertyId === "string" ? b.sourcePropertyId : undefined,
      floorplanImageUrl: b.floorplanImageUrl,
      photoUrls: b.photoUrls,
      walkthroughVideoUrl: b.walkthroughVideoUrl,
    },
  };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { data, error } = validatePackage(body);
  if (!data) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const jobId = `job_${Math.random().toString(36).slice(2, 10)}`;
  const job: ProcessingJob = {
    jobId,
    status: "queued",
    input: data,
    steps: PIPELINE_STEPS.map((step) => ({ ...step, status: "pending" })),
    createdAt: new Date().toISOString(),
  };
  jobs.set(jobId, job);

  after(() => runPipeline(job));

  return NextResponse.json(job, { status: 202 });
}

export async function GET(req: Request) {
  const jobId = new URL(req.url).searchParams.get("jobId");
  if (!jobId) {
    return NextResponse.json({ error: "Falta el query param jobId" }, { status: 400 });
  }
  const job = jobs.get(jobId);
  if (!job) {
    return NextResponse.json({ error: "Job no encontrado (store en memoria, no persiste redeploys)" }, { status: 404 });
  }
  return NextResponse.json(job);
}
