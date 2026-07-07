import type { Metadata } from "next";
import { V2Nav } from "@/components/v2/V2Nav";
import { RequestAccessButton, ACCESS_DIALOG_ID } from "@/components/v2/RequestAccessButton";
import { requestAccess } from "@/app/v2/actions";
import { MeasureDemo } from "@/components/v2/MeasureDemo";
import { TwinLauncher } from "@/components/v2/TwinLauncher";
import { DashboardShowcase } from "@/components/v2/DashboardShowcase";
import { PROBLEM_CARDS, FLOW_STEPS, SCORE_SIGNALS, PLATFORM_MODULES } from "@/data/content";
import { SITE } from "@/utils/constants";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
};

/* ============================================================
   Fusión: estructura /v2 (server-first, <2kB JS) + identidad
   dorada de producción. Canvas #000, charcoal #202020,
   oro #D4AF37 como único acento cromático de marca.
   ============================================================ */
const EASE = "[transition-timing-function:cubic-bezier(0.625,0.05,0,1)]";

/* Rim-lit glass con temperatura de marca — aro dorado en hover.
   Literal estático: Tailwind no compila clases construidas dinámicamente. */
const RIM_GOLD =
  "hover:shadow-[inset_0_1px_0_rgba(240,203,101,0.32),inset_0_0_0_1px_rgba(212,175,55,0.28)]";

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`text-[11px] font-medium uppercase tracking-[0.05em] text-[#D4AF37] ${className}`}
    >
      {children}
    </p>
  );
}

/** El flourish tipográfico del sistema, en oro: serif itálica para la palabra emocional. */
function Serif({ children }: { children: React.ReactNode }) {
  return (
    <em className="bg-gradient-to-r from-[#F0CB65] to-[#D4AF37] bg-clip-text font-display font-medium italic text-transparent">
      {children}
    </em>
  );
}

function GlassBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[rgba(212,175,55,0.35)] bg-[rgba(212,175,55,0.08)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.05em] text-[#F0CB65] shadow-[rgba(0,0,0,0.35)_0px_10px_30px_0px,rgba(240,203,101,0.15)_0px_1px_0px_0px_inset] backdrop-blur-[20px] backdrop-saturate-[1.4]">
      {children}
    </span>
  );
}

function MediaCard({
  src,
  badge,
  title,
}: {
  src: string;
  badge: string;
  title: string;
}) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-[10px] after:pointer-events-none after:absolute after:inset-0 after:rounded-[10px] after:opacity-0 after:shadow-[inset_0_1px_0_rgba(240,203,101,0.32),inset_0_0_0_1px_rgba(212,175,55,0.28)] after:transition-opacity after:duration-300 hover:after:opacity-100 ${EASE}`}
    >
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className={`aspect-[4/5] w-full object-cover transition-transform duration-700 ${EASE} group-hover:scale-[1.03] sm:aspect-[16/11]`}
      />
      {/* Scrim de legibilidad */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" />
      <span className="absolute right-4 top-4">
        <GlassBadge>{badge}</GlassBadge>
      </span>
      <figcaption className="absolute bottom-5 left-5 right-5 text-[21px] font-medium leading-[1.2] text-white">
        {title}
      </figcaption>
    </figure>
  );
}

const METRICS = [
  { value: "2.4M", label: "Gaussian splats por segundo de captura" },
  { value: "±2 cm", label: "Precisión del sistema de medición" },
  { value: "25%", label: "Tasa de cierre con leads priorizados" },
  { value: "40%", label: "Visitas presenciales evitadas" },
];

export default function V2Page() {
  return (
    <main id="top" className="min-h-screen bg-black text-white">
      <V2Nav />

      {/* ===== Hero — el video es el pliegue ===== */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <video
          src="/videos/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1200px] flex-col items-start justify-end gap-8 px-5 pb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Label className="mb-6">Walk Through Reality · Spatial Intelligence Platform</Label>
            <h1 className="max-w-4xl text-[clamp(3rem,8vw,8rem)] font-medium leading-[1.0] tracking-[-0.05em] text-white">
              Vendemos <Serif>decisiones</Serif>.
            </h1>
            <p className="mt-8 max-w-xl text-[20px] leading-[1.5] text-[#999999]">
              {SITE.subhead}
            </p>
          </div>

          <a
            href="#demo"
            aria-label="Ir a la demo interactiva del simulador"
            className={`flex shrink-0 flex-col items-center gap-3 transition-opacity duration-300 ${EASE} hover:opacity-70`}
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-[#D4AF37] bg-[rgba(212,175,55,0.08)]">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden>
                <path d="M1 1.5v13l12-6.5-12-6.5z" fill="#F0CB65" />
              </svg>
            </span>
            <span className="text-[13px] font-normal uppercase tracking-[0.03em] text-[#F0CB65]">
              Ver la simulación
            </span>
          </a>
        </div>
      </section>

      {/* ===== El problema — por qué existe Visium ===== */}
      <section className="mx-auto max-w-[1200px] px-5 py-28">
        <Label className="mb-10">El problema</Label>
        <h2 className="max-w-4xl text-[clamp(2rem,4.5vw,3.375rem)] font-light leading-[1.2] text-white">
          Buscar propiedades sigue <Serif>roto</Serif>.
        </h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {PROBLEM_CARDS.map((c) => (
            <div
              key={c.title}
              className={`rounded-[10px] bg-[#202020] p-8 transition-shadow duration-300 ${EASE} ${RIM_GOLD}`}
            >
              <h3 className="text-[21px] font-medium leading-[1.2] text-white">{c.title}</h3>
              <p className="mt-4 border-t border-[#333333] pt-4 text-[16px] leading-[1.5] text-[#999999]">
                {c.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Twins — gemelos digitales ===== */}
      <section id="twins" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 pb-28">
        <Label className="mb-10">Twins · Gaussian Splatting</Label>
        <h2 className="max-w-4xl text-[clamp(2rem,4.5vw,3.375rem)] font-light leading-[1.2] text-white">
          We don&rsquo;t model reality. We capture its <Serif>light</Serif>.
        </h2>
        <p className="mt-8 max-w-2xl text-[20px] leading-[1.5] text-[#999999]">
          Not a tour. A living property OS. Cada recorrido reconstruye la
          propiedad como un gemelo digital fotorrealista y medible — luz real,
          materiales reales, proporciones verificables desde cualquier
          dispositivo.
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          <MediaCard
            src="/videos/living.mp4"
            badge="Digital Twin"
            title="Gemelo digital fotorrealista — capturado a 2.4M de puntos por segundo."
          />
          <MediaCard
            src="/videos/cocina.mp4"
            badge="Roadmap · Simulación Solar"
            title="Asoleamiento predictivo — el próximo capítulo del gemelo digital."
          />
        </div>

        {/* De un video a una decisión de compra — el flujo completo */}
        <div className="mt-20">
          <h3 className="max-w-3xl text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-[1.2] text-white">
            De un video a una <Serif>decisión</Serif> de compra.
          </h3>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FLOW_STEPS.map((s) => (
              <div
                key={s.index}
                className={`rounded-[10px] bg-[#202020] p-8 transition-shadow duration-300 ${EASE} hover:shadow-[inset_0_1px_0_rgba(240,203,101,0.32),inset_0_0_0_1px_rgba(212,175,55,0.28)]`}
              >
                <p className="font-mono text-[13px] tracking-[0.05em] text-[#D4AF37]">{s.index}</p>
                <h4 className="mt-4 text-[21px] font-medium leading-[1.2] text-white">{s.title}</h4>
                <p className="mt-3 text-[16px] leading-[1.5] text-[#999999]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Demo — Motor de Análisis Comercial ===== */}
      <section id="demo" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 pb-28">
        <Label className="mb-10">Demo interactiva · Motor de Análisis Comercial</Label>
        <h2 className="max-w-4xl text-[clamp(2rem,4.5vw,3.375rem)] font-light leading-[1.2] text-white">
          Cada interacción del comprador, una <Serif>señal</Serif> de cierre.
        </h2>
        <p className="mt-8 max-w-2xl text-[20px] leading-[1.5] text-[#999999]">
          <span className="text-[#F0CB65]">VISIUM AI</span> lee cada movimiento
          del comprador dentro del gemelo digital — mediciones, distancias,
          validación de espacios — y convierte sus acciones en{" "}
          <span className="text-[#F0CB65]">Probabilidad de Cierre™</span> para
          tu equipo. Del primer clic al contrato firmado.
        </p>
        <div className="mt-14">
          <MeasureDemo />
        </div>
      </section>

      {/* ===== Recorrido — el gemelo real, en primera persona ===== */}
      <section id="recorrido" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 pb-28">
        <Label className="mb-10">Recorrido virtual · Gemelo real</Label>
        <h2 className="max-w-4xl text-[clamp(2rem,4.5vw,3.375rem)] font-light leading-[1.2] text-white">
          Caminá un escaneo <Serif>real</Serif>.
        </h2>
        <p className="mt-8 max-w-2xl text-[20px] leading-[1.5] text-[#999999]">
          Esto no es un render: es un departamento real capturado con un
          iPhone y procesado por el pipeline espacial de VISIUM — malla
          comprimida con Draco y texturas optimizadas,{" "}
          <span className="text-[#F0CB65]">de 29.7 MB a 1.3 MB</span>. Entrá y
          recorrelo como en un videojuego.
        </p>
        <div className="mt-14">
          <TwinLauncher />
        </div>
      </section>

      {/* ===== Intelligence — VISIUM SCORE™ ===== */}
      <section id="intelligence" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 pb-28">
        <Label className="mb-10">Intelligence · VISIUM SCORE™</Label>
        <h2 className="max-w-4xl text-[clamp(2rem,4.5vw,3.375rem)] font-light leading-[1.2] text-white">
          No analizamos clics. Analizamos <Serif>intención</Serif>.
        </h2>
        <p className="mt-8 max-w-2xl text-[20px] leading-[1.5] text-[#999999]">
          Cada propiedad recorrida genera señales de comportamiento. VISIUM
          SCORE™ las convierte en una predicción de intención de compra — el
          activo más valioso de tu inmobiliaria.
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SCORE_SIGNALS.map((s) => (
            <div
              key={s.label}
              className={`flex items-center justify-between gap-4 rounded-[10px] bg-[#202020] px-6 py-5 transition-shadow duration-300 ${EASE} hover:shadow-[inset_0_1px_0_rgba(240,203,101,0.32),inset_0_0_0_1px_rgba(212,175,55,0.28)]`}
            >
              <span className="text-[16px] leading-[1.4] text-white">{s.label}</span>
              <span className="shrink-0 font-mono text-[16px] font-medium text-[#F0CB65]">
                {s.weight}
              </span>
            </div>
          ))}
        </div>

        {/* Métricas — medido, no prometido */}
        <div className="mt-20">
          <Label className="mb-10">Medido, no prometido</Label>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className={`rounded-[10px] bg-[#202020] p-8 transition-shadow duration-300 ${EASE} hover:shadow-[inset_0_1px_0_rgba(240,203,101,0.32),inset_0_0_0_1px_rgba(212,175,55,0.28)]`}
              >
                <p className="text-[clamp(2.5rem,4vw,3.5625rem)] font-light leading-none tracking-[-0.05em] text-[#F0CB65]">
                  {m.value}
                </p>
                <p className="mt-5 border-t border-[#333333] pt-5 text-[13px] font-medium uppercase leading-[1.5] tracking-[0.03em] text-[#999999]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Insights — la plataforma completa ===== */}
      <section id="insights" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 pb-28">
        <div id="plataforma" className="scroll-mt-24">
          <Label className="mb-10">Insights · Plataforma</Label>
          <h2 className="max-w-4xl text-[clamp(2rem,4.5vw,3.375rem)] font-light leading-[1.2] text-white">
            No solo mostramos propiedades. Mostramos{" "}
            <Serif>quién</Serif> va a comprarlas.
          </h2>
          <p className="mt-8 max-w-2xl text-[20px] leading-[1.5] text-[#999999]">
            Seis módulos que trabajan como un solo sistema operativo de
            conversión para tu inmobiliaria.
          </p>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PLATFORM_MODULES.map((m) => (
              <div
                key={m.name}
                className={`rounded-[10px] bg-[#202020] p-8 transition-shadow duration-300 ${EASE} ${RIM_GOLD}`}
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#D4AF37]">
                  {m.tag}
                </p>
                <h3 className="mt-3 text-[21px] font-medium leading-[1.2] text-white">{m.name}</h3>
                <p className="mt-4 border-t border-[#333333] pt-4 text-[16px] leading-[1.5] text-[#999999]">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* El entregable — dashboard real del desarrollador */}
        <div id="dashboard" className="mt-24 scroll-mt-24">
          <h3 className="max-w-3xl text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-[1.2] text-white">
            Tu pipeline, ordenado por <Serif>intención</Serif> de compra.
          </h3>
          <p className="mt-8 max-w-2xl text-[20px] leading-[1.5] text-[#999999]">
            Cada propiedad se convierte en una fuente de datos. Tu equipo
            prioriza los llamados con VISIUM SCORE™ — como HubSpot y
            Salesforce, pero con inteligencia inmobiliaria real.{" "}
            <span className="text-[#F0CB65]">
              Medí con datos, no con suerte
            </span>
            : cada interacción verificada aumenta la probabilidad de compra.
          </p>
          <div className="mt-14">
            <DashboardShowcase />
          </div>
        </div>
      </section>

      {/* ===== Access — la primera visita que importa ===== */}
      <section id="access" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 py-28">
        <Label className="mb-10">Acceso corporativo</Label>
        <h2 className="max-w-4xl text-[clamp(2.25rem,5vw,3.5625rem)] font-medium leading-[1.1] tracking-[-0.05em] text-white">
          La primera visita debería ser <Serif>la que importa</Serif>.
        </h2>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <RequestAccessButton className="h-11" />
          <a
            href="mailto:hello@visium.la"
            className={`inline-flex h-11 items-center rounded-full border border-[rgba(212,175,55,0.45)] px-5 text-[16px] font-medium text-[#F0CB65] transition-colors duration-200 ${EASE} hover:bg-[rgba(212,175,55,0.08)]`}
          >
            Hablar con nosotros
          </a>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-[#333333]">
        <div className="mx-auto max-w-[1200px] px-5 py-24">
          <p className="text-[clamp(3rem,9vw,8rem)] font-medium leading-[1.0] tracking-[-0.05em] text-white">
            Vendemos <Serif>decisiones</Serif>, no tours.
          </p>
          <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-6">
              {["Twins", "Intelligence", "Insights"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className={`text-[15px] font-medium text-white transition-colors duration-200 ${EASE} hover:text-[#F0CB65]`}
                >
                  {l}
                </a>
              ))}
            </div>
            <p className="text-[13px] uppercase tracking-[0.03em] text-[#999999]">
              © 2026 VISIUM 5.0 — Buenos Aires
            </p>
          </div>
        </div>
      </footer>

      {/* ===== Modal de acceso corporativo — <dialog> nativo, piel dorada ===== */}
      <dialog
        id={ACCESS_DIALOG_ID}
        className="m-auto w-[min(92vw,460px)] rounded-[10px] border border-[rgba(212,175,55,0.25)] bg-[#202020] p-0 text-white [&::backdrop]:bg-black/80 [&::backdrop]:backdrop-blur-[2px]"
      >
        <div className="p-10">
          <div className="mb-10 flex items-start justify-between">
            <Label>Acceso corporativo</Label>
            <form method="dialog">
              <button
                aria-label="Cerrar"
                className={`-mr-2 -mt-2 flex h-8 w-8 items-center justify-center rounded-full text-[#999999] transition-colors duration-200 ${EASE} hover:text-[#F0CB65]`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </form>
          </div>

          <h2 className="mb-10 text-[30px] font-light leading-[1.2] tracking-[-0.025em] text-white">
            Contanos qué estás <Serif>construyendo</Serif>.
          </h2>

          <form action={requestAccess} className="flex flex-col gap-8">
            <div>
              <label
                htmlFor="v2-name"
                className="mb-2 block text-[11px] font-medium uppercase tracking-[0.08em] text-[#D4AF37]"
              >
                Nombre completo
              </label>
              <input
                id="v2-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Delfina Ortiz"
                className={`block w-full rounded-none border-0 border-b border-[#333333] bg-transparent px-0 py-3 text-[16px] text-white placeholder:text-[#999999]/50 transition-colors duration-200 ${EASE} focus:border-[#D4AF37] focus:outline-none`}
              />
            </div>

            <div>
              <label
                htmlFor="v2-company"
                className="mb-2 block text-[11px] font-medium uppercase tracking-[0.08em] text-[#D4AF37]"
              >
                Empresa / Desarrolladora
              </label>
              <input
                id="v2-company"
                name="company"
                type="text"
                required
                autoComplete="organization"
                placeholder="Consultatio"
                className={`block w-full rounded-none border-0 border-b border-[#333333] bg-transparent px-0 py-3 text-[16px] text-white placeholder:text-[#999999]/50 transition-colors duration-200 ${EASE} focus:border-[#D4AF37] focus:outline-none`}
              />
            </div>

            <div>
              <label
                htmlFor="v2-address"
                className="mb-2 block text-[11px] font-medium uppercase tracking-[0.08em] text-[#D4AF37]"
              >
                Dirección del desarrollo
              </label>
              <input
                id="v2-address"
                name="address"
                type="text"
                required
                placeholder="Av. del Libertador 2400"
                className={`block w-full rounded-none border-0 border-b border-[#333333] bg-transparent px-0 py-3 text-[16px] text-white placeholder:text-[#999999]/50 transition-colors duration-200 ${EASE} focus:border-[#D4AF37] focus:outline-none`}
              />
            </div>

            <div>
              <label
                htmlFor="v2-email"
                className="mb-2 block text-[11px] font-medium uppercase tracking-[0.08em] text-[#D4AF37]"
              >
                Email corporativo
              </label>
              <input
                id="v2-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="delfina@consultatio.com"
                className={`block w-full rounded-none border-0 border-b border-[#333333] bg-transparent px-0 py-3 text-[16px] text-white placeholder:text-[#999999]/50 transition-colors duration-200 ${EASE} focus:border-[#D4AF37] focus:outline-none`}
              />
            </div>

            <button
              type="submit"
              className={`mt-2 inline-flex h-11 items-center justify-center self-start rounded-full bg-gradient-to-b from-[#F0CB65] to-[#D4AF37] px-6 text-[16px] font-medium text-black shadow-[0_0_40px_-8px_rgba(212,175,55,0.5)] transition-opacity duration-200 ${EASE} hover:opacity-90`}
            >
              Iniciar Escaneo Espacial
            </button>
          </form>
        </div>
      </dialog>
    </main>
  );
}
