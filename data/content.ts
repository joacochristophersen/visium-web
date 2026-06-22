/* ============================================================
   VISIUM — Contenido (es-LA). Inteligencia de Conversión Inmobiliaria.
   ============================================================ */

export interface ProblemCard {
  title: string;
  detail: string;
}

export const PROBLEM_CARDS: ProblemCard[] = [
  {
    title: "Las fotos engañan",
    detail:
      "El gran angular agranda ambientes, calienta la luz y esconde los defectos. El comprador llega con expectativas que la propiedad no puede cumplir.",
  },
  {
    title: "Las visitas se desperdician",
    detail:
      "Tu equipo invierte horas mostrando propiedades a personas que nunca tuvieron intención real de comprar. Tiempo, combustible y energía que no vuelven.",
  },
  {
    title: "Las inmobiliarias operan a ciegas",
    detail:
      "No sabés quién está listo para comprar y quién solo mira. Sin datos de comportamiento, cada llamado es una apuesta.",
  },
];

export interface Step {
  index: string;
  title: string;
  body: string;
}

export const FLOW_STEPS: Step[] = [
  {
    index: "01",
    title: "Video desde el celular",
    body: "El agente recorre la propiedad una vez con su teléfono. Sin equipos, sin técnicos, sin fricción.",
  },
  {
    index: "02",
    title: "La IA procesa",
    body: "VISIUM reconstruye un gemelo digital fotorrealista y medible en minutos, listo para explorar.",
  },
  {
    index: "03",
    title: "El cliente explora",
    body: "El comprador recorre la propiedad desde un link. Mide, simula la luz y verifica cada ambiente.",
  },
  {
    index: "04",
    title: "VISIUM SCORE™",
    body: "Cada acción genera señales de intención. La plataforma calcula un score y te dice a quién llamar primero.",
  },
];

export interface ScoreSignal {
  label: string;
  weight: string;
}

export const SCORE_SIGNALS: ScoreSignal[] = [
  { label: "Midió la cocina 3 veces", weight: "+18" },
  { label: "Volvió 4 días seguidos", weight: "+22" },
  { label: "Simuló la luz natural", weight: "+14" },
  { label: "Verificó espacio para cama king", weight: "+16" },
  { label: "Compartió la propiedad", weight: "+12" },
  { label: "Contactó al agente", weight: "+24" },
];

export interface PlatformModule {
  name: string;
  description: string;
  tag: string;
}

export const PLATFORM_MODULES: PlatformModule[] = [
  {
    name: "Centro de Leads",
    tag: "Lead Center",
    description:
      "Todos tus interesados, ordenados por intención de compra. Tu equipo sabe a quién llamar antes de levantar el teléfono.",
  },
  {
    name: "Panel de Scoring",
    tag: "Scoring Dashboard",
    description:
      "VISIUM SCORE™ en tiempo real para cada lead y cada propiedad. Priorizá con datos, no con intuición.",
  },
  {
    name: "Simulador Solar",
    tag: "Solar Simulator",
    description:
      "El comprador ve exactamente cómo entra el sol a cada hora del día. Una señal de intención poderosa.",
  },
  {
    name: "Sistema de Medición",
    tag: "Measurement System",
    description:
      "Mediciones con precisión de ±2 cm. Cuando alguien mide, está proyectando su vida en ese espacio.",
  },
  {
    name: "Analítica de Comportamiento",
    tag: "Behavior Analytics",
    description:
      "Qué ambientes recorre, cuánto se queda, qué revisita. El mapa de calor de la intención de compra.",
  },
  {
    name: "Inteligencia de Propiedad",
    tag: "Property Intelligence",
    description:
      "Cada propiedad se vuelve una fuente de datos: qué la hace deseable y para qué tipo de comprador.",
  },
];

export type LeadTier = "hot" | "warm" | "mild" | "cold";

export interface Lead {
  name: string;
  property: string;
  score: number;
  tier: LeadTier;
  signal: string;
}

export const TIER_META: Record<
  LeadTier,
  { label: string; color: string; range: string }
> = {
  hot: { label: "HOT", color: "var(--lead-hot)", range: "85–100" },
  warm: { label: "WARM", color: "var(--lead-warm)", range: "65–84" },
  mild: { label: "MILD", color: "var(--lead-mild)", range: "45–64" },
  cold: { label: "COLD", color: "var(--lead-cold)", range: "0–44" },
};

export const LEADS: Lead[] = [
  { name: "Martina Acosta", property: "Penthouse · Palermo", score: 94, tier: "hot", signal: "Volvió 4 días seguidos" },
  { name: "Joaquín Ferreyra", property: "Casa · Nordelta", score: 88, tier: "hot", signal: "Contactó al agente" },
  { name: "Lucía Romero", property: "Depto 3 amb · Recoleta", score: 76, tier: "warm", signal: "Simuló luz natural" },
  { name: "Diego Sosa", property: "Oficina · Puerto Madero", score: 69, tier: "warm", signal: "Midió 2 ambientes" },
  { name: "Valentina Pérez", property: "Loft · Villa Crespo", score: 58, tier: "mild", signal: "Exploró 6 minutos" },
  { name: "Tomás Giménez", property: "Quinta · Pilar", score: 31, tier: "cold", signal: "Una visita rápida" },
];

export interface ComparisonRow {
  feature: string;
  matterport: boolean | string;
  xplora: boolean | string;
  visium: boolean | string;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: "Recorrido inmersivo de la propiedad", matterport: true, xplora: true, visium: true },
  { feature: "Captura desde un celular", matterport: false, xplora: "Limitado", visium: true },
  { feature: "Analítica de comportamiento", matterport: false, xplora: false, visium: true },
  { feature: "Scoring de intención de compra", matterport: false, xplora: false, visium: "VISIUM SCORE™" },
  { feature: "Priorización de leads para el equipo", matterport: false, xplora: false, visium: true },
  { feature: "Alertas de lead caliente en tiempo real", matterport: false, xplora: false, visium: true },
  { feature: "Predicción de cierre", matterport: false, xplora: false, visium: true },
];

export interface RoadmapItem {
  phase: string;
  title: string;
  body: string;
  status: "live" | "next" | "future";
}

export const ROADMAP: RoadmapItem[] = [
  {
    phase: "Disponible",
    title: "Navegación inmersiva",
    body: "Gemelos digitales fotorrealistas y recorribles desde cualquier dispositivo.",
    status: "live",
  },
  {
    phase: "Disponible",
    title: "Sistema de medición con IA",
    body: "Mediciones precisas y verificación de espacios dentro del recorrido.",
    status: "live",
  },
  {
    phase: "Próximo",
    title: "Asistente IA",
    body: "Un copiloto que responde preguntas del comprador y califica su intención en vivo.",
    status: "next",
  },
  {
    phase: "Próximo",
    title: "Marketplace",
    body: "Una red de propiedades inteligentes donde la intención de compra es moneda corriente.",
    status: "next",
  },
  {
    phase: "Visión",
    title: "Diseño generativo",
    body: "Reamueblado y reestilizado del espacio con IA para maximizar el deseo de compra.",
    status: "future",
  },
];
