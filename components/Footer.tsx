import { SITE } from "@/utils/constants";
import { GradientText } from "@/components/ui/GradientText";
import { VisiumLogo } from "@/components/ui/VisiumLogo";

const COLUMNS = [
  {
    title: "Plataforma",
    links: ["VISIUM SCORE™", "Centro de Leads", "Analítica de comportamiento", "Simulador solar", "Integraciones"],
  },
  {
    title: "Soluciones",
    links: ["Inmobiliarias", "Desarrolladores", "Brokers", "Portales", "Equipos de venta"],
  },
  {
    title: "Empresa",
    links: ["Nosotros", "Clientes", "Prensa", "Inversores", "Contacto"],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      <div className="container-tight relative z-10 grid gap-12 py-24 md:grid-cols-[1.3fr_1fr] md:items-end">
        <div>
          <p className="eyebrow mb-5">Pedí acceso anticipado</p>
          <h3 className="fluid-h2 max-w-xl text-balance text-white">
            Vendé con datos, <GradientText>no con suerte.</GradientText>
          </h3>
        </div>
        <form className="flex w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur">
          <input
            type="email"
            placeholder="tu@inmobiliaria.com"
            aria-label="Correo electrónico"
            className="min-w-0 flex-1 bg-transparent px-5 py-2.5 text-sm text-white outline-none placeholder:text-[color:var(--text-faint)]"
          />
          <button
            type="button"
            className="btn-gold shrink-0 rounded-full px-5 py-2.5 text-sm font-medium"
          >
            Solicitar Demo
          </button>
        </form>
      </div>

      <div className="container-tight relative z-10">
        <div className="hairline" />
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <VisiumLogo size={24} />
              <span className="text-lg font-semibold tracking-[0.14em]">VISIUM</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-muted)]">
              {SITE.description}
            </p>
            <p className="mt-6 eyebrow">Vendemos decisiones.</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-medium text-white">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-[color:var(--text-muted)] transition-colors hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-8 text-xs text-[color:var(--text-faint)] sm:flex-row">
          <p>© {new Date().getFullYear()} VISIUM · Inteligencia de Conversión Inmobiliaria.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Términos</a>
            <a href="#" className="hover:text-white">Seguridad</a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative select-none">
        <h2 className="text-center font-display text-[22vw] font-medium leading-[0.8] tracking-tightest text-white/[0.025]">
          VISIUM
        </h2>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void to-transparent" />
      </div>
    </footer>
  );
}
