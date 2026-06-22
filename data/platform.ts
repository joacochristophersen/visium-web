export interface SolutionPillar {
  title: string;
  description: string;
}

export const SOLUTION_PILLARS: SolutionPillar[] = [
  {
    title: "Capture",
    description:
      "A single walkthrough with any modern camera reconstructs the entire space as a photorealistic radiance field.",
  },
  {
    title: "Reconstruct",
    description:
      "Our pipeline turns frames into a measurable digital twin — geometry, light and material fused into one model.",
  },
  {
    title: "Explore",
    description:
      "Share a link. Anyone, anywhere, walks the property in real time — no app, no plugin, no headset required.",
  },
];

export interface SplatStep {
  index: string;
  title: string;
  body: string;
}

export const SPLAT_STEPS: SplatStep[] = [
  {
    index: "01",
    title: "Light, not polygons",
    body: "Millions of 3D Gaussians store color, opacity and orientation — reconstructing exactly how light leaves every surface.",
  },
  {
    index: "02",
    title: "Soft, true materials",
    body: "Glass, marble, velvet and chrome render with real reflections and soft shadows — none of the plastic look of legacy 3D.",
  },
  {
    index: "03",
    title: "Streamed in real time",
    body: "A level-of-detail engine streams only what's in view, holding a cinematic 60fps on phones, laptops and headsets alike.",
  },
];

export interface SplatStat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const SPLAT_STATS: SplatStat[] = [
  { value: 12, suffix: "M", label: "Gaussians / room" },
  { value: 2, prefix: "±", suffix: "cm", label: "Spatial accuracy" },
  { value: 60, suffix: "fps", label: "Real-time render" },
  { value: 4, suffix: "K", label: "Per-eye resolution" },
];

export interface TwinFeature {
  title: string;
  description: string;
  span: "wide" | "tall" | "normal";
  metric?: string;
  metricLabel?: string;
}

export const TWIN_FEATURES: TwinFeature[] = [
  {
    title: "Measure anything",
    description:
      "Tap two points for instant, survey-grade dimensions. Floor area, ceiling height, doorway widths — all true to ±2cm.",
    span: "wide",
    metric: "±2cm",
    metricLabel: "accuracy",
  },
  {
    title: "AI staging",
    description:
      "Restyle, furnish and re-light a space on demand — empty rooms become aspirational homes in seconds.",
    span: "tall",
  },
  {
    title: "Spatial search",
    description: "Query by light, view, layout or vibe — not just price and postcode.",
    span: "normal",
  },
  {
    title: "Embed anywhere",
    description:
      "A single line of code drops a live twin into any listing, portal or pitch deck.",
    span: "normal",
  },
  {
    title: "Live collaboration",
    description:
      "Walk the space together with clients across the world, cursors and voice in sync.",
    span: "wide",
  },
];
