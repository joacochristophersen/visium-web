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
    body: "El comprador recorre la propiedad desde un link. Mide, posiciona muebles y verifica cada ambiente.",
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
  { label: "Interacción con planos de planta", weight: "+15" },
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
    name: "Agendado Inteligente",
    tag: "Smart Booking",
    description:
      "El comprador agenda una visita presencial con un clic, desde dentro del recorrido. El agente recibe el lead pre-calificado con su score.",
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
  { name: "Lucía Romero", property: "Depto 3 amb · Recoleta", score: 76, tier: "warm", signal: "Midió dormitorio principal" },
  { name: "Diego Sosa", property: "Oficina · Puerto Madero", score: 69, tier: "warm", signal: "Midió 2 ambientes" },
  { name: "Valentina Pérez", property: "Loft · Villa Crespo", score: 58, tier: "mild", signal: "Exploró 6 minutos" },
  { name: "Tomás Giménez", property: "Quinta · Pilar", score: 31, tier: "cold", signal: "Una visita rápida" },
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
