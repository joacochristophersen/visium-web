import type { TechPillar, Step } from "@/types";

export const TECH_PILLARS: TechPillar[] = [
  {
    id: "gaussian-splatting",
    name: "Gaussian Splatting",
    headline: "Reality, captured as light.",
    description:
      "Millions of volumetric splats reconstruct a space exactly as the eye sees it — every reflection, soft shadow and material, with none of the polygonal coldness of legacy 3D.",
    metric: "12M",
    metricLabel: "splats per room",
  },
  {
    id: "digital-twins",
    name: "Digital Twins",
    headline: "A living replica of every property.",
    description:
      "Each space becomes a persistent, measurable digital object — dimensionally accurate, queryable and ready to plug into valuation, staging and AI workflows.",
    metric: "±2cm",
    metricLabel: "spatial accuracy",
  },
  {
    id: "real-time-rendering",
    name: "Real-Time Rendering",
    headline: "Cinematic frames, instantly.",
    description:
      "A streaming render pipeline delivers console-grade visuals to any browser or headset — no downloads, no plugins, no waiting. Just presence.",
    metric: "60fps",
    metricLabel: "on any device",
  },
];

export const EXPLORE_STEPS: Step[] = [
  {
    index: "01",
    title: "Step inside",
    description:
      "Enter the front door from a link. No app, no headset required — the space loads around you in seconds.",
  },
  {
    index: "02",
    title: "Move freely",
    description:
      "Walk room to room with natural momentum. Lean into a window, look up at the ceiling height, feel the volume.",
  },
  {
    index: "03",
    title: "Understand the space",
    description:
      "Measure, annotate and stage in real time. Light changes with the time of day. Every detail is true to life.",
  },
];
