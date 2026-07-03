/* ============================================================
   VISIUM — Conversion Intelligence: motor de señales, herramientas, embudo.
   ============================================================ */

export interface EngineSignal {
  action: string;
  points: number;
  icon: "measure" | "furniture" | "bookmark" | "return" | "compare" | "share" | "contact";
}

/** Cada acción dentro del gemelo digital suma puntos al VISIUM SCORE. */
export const ENGINE_SIGNALS: EngineSignal[] = [
  { action: "Medición de espacios", points: 8, icon: "measure" },
  { action: "Simulación de muebles", points: 12, icon: "furniture" },
  { action: "Guardó en favoritos", points: 15, icon: "bookmark" },
  { action: "Visita recurrente", points: 15, icon: "return" },
  { action: "Comparación de unidades", points: 10, icon: "compare" },
  { action: "Compartir propiedad", points: 18, icon: "share" },
  { action: "Contactar agente", points: 25, icon: "contact" },
];

export interface TwinTool {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  message: string;
  icon: "booking" | "measure" | "furniture" | "navigate";
}

export const TWIN_TOOLS: TwinTool[] = [
  {
    id: "smart-booking",
    name: "SMART BOOKING™",
    tagline: "Agendado inteligente",
    features: ["Agenda desde el visor", "Score pre-calculado", "Notificación al agente", "Filtro de inversores"],
    message: "El comprador agenda una visita sin salir del recorrido. El agente recibe el lead ya calificado.",
    icon: "booking",
  },
  {
    id: "smart-measure",
    name: "SMART MEASURE™",
    tagline: "Medición bidireccional",
    features: ["Medir paredes", "Ajuste de muebles", "Análisis de circulación", "Altura de techos"],
    message: "Si un comprador mide, ya se está imaginando viviendo ahí.",
    icon: "measure",
  },
  {
    id: "furniture-fit",
    name: "FURNITURE FIT™",
    tagline: "Simulación de objetos",
    features: ["Cama king", "Sofá", "Mesa de comedor", "Heladera", "Escritorio"],
    message: "La señal de compra más fuerte es imaginar la pertenencia.",
    icon: "furniture",
  },
  {
    id: "twin-navigation",
    name: "NAVEGACIÓN DEL GEMELO",
    tagline: "Recorrido natural",
    features: ["Living", "Cocina", "Dormitorios", "Terraza", "Amenities"],
    message: "Cada ambiente recorrido es una señal de interés real.",
    icon: "navigate",
  },
];

export interface FunnelStage {
  value: number;
  label: string;
  highlight?: boolean;
}

export const FUNNEL_STAGES: FunnelStage[] = [
  { value: 10000, label: "Visitantes" },
  { value: 1200, label: "Exploraron la propiedad" },
  { value: 540, label: "Midieron espacios" },
  { value: 320, label: "Simularon muebles" },
  { value: 190, label: "Regresaron" },
  { value: 74, label: "Contactaron al agente", highlight: true },
  { value: 31, label: "Compraron" },
];
