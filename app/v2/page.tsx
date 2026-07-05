import type { Metadata } from "next";
import { V2Nav } from "@/components/v2/V2Nav";
import { RequestAccessButton, ACCESS_DIALOG_ID } from "@/components/v2/RequestAccessButton";
import { requestAccess } from "@/app/v2/actions";

export const metadata: Metadata = {
  title: "Visium 5.0 — Spatial intelligence for ultra-luxury development",
  description:
    "Digital twins, solar simulation and spatial intelligence for the developments that define skylines.",
};

/* ============================================================
   Sequel design system — achromatic tokens.
   Every color on this page comes from these six values.
   ============================================================ */
const EASE = "[transition-timing-function:cubic-bezier(0.625,0.05,0,1)]";

/* Cinematic film treatment: the footage carries the warmth,
   the UI chrome stays at 0% colorfulness. */
const FILM = { filter: "grayscale(1) contrast(1.06) brightness(0.92)" };

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`text-[11px] font-medium uppercase tracking-[0.05em] text-[#999999] ${className}`}
    >
      {children}
    </p>
  );
}

/** The single typographic flourish: hairline sans + one italic serif payoff word. */
function Serif({ children }: { children: React.ReactNode }) {
  return (
    <em className="font-display font-medium italic text-white">{children}</em>
  );
}

function GlassBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[rgba(200,200,200,0.1)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.05em] text-white shadow-[rgba(0,0,0,0.35)_0px_10px_30px_0px,rgba(255,255,255,0.08)_0px_1px_0px_0px_inset] backdrop-blur-[20px] backdrop-saturate-[1.4]">
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
      className={`group relative overflow-hidden rounded-[10px] after:pointer-events-none after:absolute after:inset-0 after:rounded-[10px] after:opacity-0 after:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_0_0_1px_rgba(255,255,255,0.08)] after:transition-opacity after:duration-300 hover:after:opacity-100 ${EASE}`}
    >
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className={`aspect-[4/5] w-full object-cover transition-transform duration-700 ${EASE} group-hover:scale-[1.03] sm:aspect-[16/11]`}
        style={FILM}
      />
      {/* Readability scrim — the only gradient in the system */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/40 to-transparent" />
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
  { value: "2.4M", label: "Gaussian splats per second of capture" },
  { value: "0.2°", label: "Solar trajectory accuracy, year-round" },
  { value: "94", label: "Median VISIUM SCORE across active twins" },
  { value: "48h", label: "From first scan to interactive twin" },
];

export default function V2Page() {
  return (
    <main id="top" className="min-h-screen bg-black text-white">
      <V2Nav />

      {/* ===== Hero — the photograph is the fold ===== */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <video
          src="/videos/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={FILM}
        />
        {/* Bottom-40% readability scrim */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1200px] flex-col items-start justify-end gap-8 px-5 pb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Label className="mb-6">Spatial intelligence · Digital twins</Label>
            <h1 className="max-w-4xl text-[clamp(3rem,8vw,8rem)] font-medium leading-[1.0] tracking-[-0.05em] text-white">
              Every ray of light, <Serif>foreseen</Serif>.
            </h1>
          </div>

          {/* Circular video play button */}
          <a
            href="#twins"
            className={`flex shrink-0 flex-col items-center gap-3 transition-opacity duration-300 ${EASE} hover:opacity-70`}
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white bg-[rgba(255,255,255,0.08)]">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden>
                <path d="M1 1.5v13l12-6.5-12-6.5z" fill="#ffffff" />
              </svg>
            </span>
            <span className="text-[13px] font-normal uppercase tracking-[0.03em] text-white">
              Watch the simulation
            </span>
          </a>
        </div>
      </section>

      {/* ===== Statement — narrative headline, whisper weight ===== */}
      <section id="intelligence" className="mx-auto max-w-[1200px] px-5 py-28">
        <Label className="mb-10">The practice</Label>
        <h2 className="max-w-4xl text-[clamp(2rem,4.5vw,3.375rem)] font-light leading-[1.2] text-white">
          We scan, simulate and stage developments before a single foundation
          is poured. Not a render — a <Serif>memory</Serif> of what comes next.
        </h2>
        <p className="mt-10 max-w-xl text-[20px] leading-[1.5] text-[#999999]">
          Visium builds interactive digital twins for the developments that
          define skylines. Light, shadow and intent — measured, not imagined.
        </p>
      </section>

      {/* ===== Cinematic media grid ===== */}
      <section id="twins" className="mx-auto max-w-[1200px] px-5 pb-28">
        <div className="grid gap-4 sm:grid-cols-2">
          <MediaCard
            src="/videos/living.mp4"
            badge="Digital Twin"
            title="Palacio Libertador — captured at 2.4M points per second."
          />
          <MediaCard
            src="/videos/cocina.mp4"
            badge="Solar Simulation"
            title="Winter light, computed for the next hundred years."
          />
        </div>
      </section>

      {/* ===== Metrics — elevation through tone, never shadow ===== */}
      <section id="insights" className="mx-auto max-w-[1200px] px-5 pb-28">
        <Label className="mb-10">Measured, not promised</Label>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className={`rounded-[10px] bg-[#202020] p-8 transition-shadow duration-300 ${EASE} hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_0_0_1px_rgba(255,255,255,0.08)]`}
            >
              <p className="text-[clamp(2.5rem,4vw,3.5625rem)] font-light leading-none tracking-[-0.05em] text-white">
                {m.value}
              </p>
              <p className="mt-5 border-t border-[#333333] pt-5 text-[13px] font-medium uppercase leading-[1.5] tracking-[0.03em] text-[#999999]">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Access — the lamp in the dark room ===== */}
      <section id="access" className="mx-auto max-w-[1200px] px-5 py-28">
        <Label className="mb-10">Access</Label>
        <h2 className="max-w-4xl text-[clamp(2.25rem,5vw,3.5625rem)] font-medium leading-[1.1] tracking-[-0.05em] text-white">
          The spatial intelligence studio behind tomorrow&rsquo;s{" "}
          <Serif>landmarks</Serif>.
        </h2>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <RequestAccessButton className="h-11" />
          <a
            href="mailto:hello@visium.app"
            className={`inline-flex h-11 items-center rounded-full border border-white px-5 text-[16px] font-medium text-white transition-colors duration-200 ${EASE} hover:bg-white/10`}
          >
            Speak with us
          </a>
        </div>
      </section>

      {/* ===== Footer — the closing frame ===== */}
      <footer className="border-t border-[#333333]">
        <div className="mx-auto max-w-[1200px] px-5 py-24">
          <p className="text-[clamp(3rem,9vw,8rem)] font-medium leading-[1.0] tracking-[-0.05em] text-white">
            Built on <Serif>light</Serif>.
          </p>
          <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-6">
              {["Twins", "Intelligence", "Insights"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className={`text-[15px] font-medium text-white transition-opacity duration-200 ${EASE} hover:opacity-60`}
                >
                  {l}
                </a>
              ))}
            </div>
            <p className="text-[13px] uppercase tracking-[0.03em] text-[#999999]">
              © 2026 Visium 5.0 — Buenos Aires
            </p>
          </div>
        </div>
      </footer>

      {/* ===== Corporate access dialog — native <dialog>, zero modal libraries ===== */}
      <dialog
        id={ACCESS_DIALOG_ID}
        className="m-auto w-[min(92vw,440px)] rounded-[10px] border-0 bg-[#202020] p-0 text-white [&::backdrop]:bg-black/80 [&::backdrop]:backdrop-blur-[2px]"
      >
        <div className="p-10">
          <div className="mb-10 flex items-start justify-between">
            <Label>Corporate access</Label>
            {/* method="dialog" closes natively — no JS involved */}
            <form method="dialog">
              <button
                aria-label="Close"
                className={`-mr-2 -mt-2 flex h-8 w-8 items-center justify-center rounded-full text-[#999999] transition-colors duration-200 ${EASE} hover:text-white`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </form>
          </div>

          <h2 className="mb-10 text-[30px] font-light leading-[1.2] tracking-[-0.025em] text-white">
            Tell us what you&rsquo;re <Serif>building</Serif>.
          </h2>

          <form action={requestAccess} className="flex flex-col gap-8">
            <div>
              <label
                htmlFor="v2-name"
                className="mb-2 block text-[11px] font-medium uppercase tracking-[0.08em] text-[#999999]"
              >
                Full name
              </label>
              <input
                id="v2-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Delfina Ortiz"
                className={`block w-full rounded-none border-0 border-b border-[#333333] bg-transparent px-0 py-3 text-[16px] text-white placeholder:text-[#999999]/50 transition-colors duration-200 ${EASE} focus:border-white focus:outline-none`}
              />
            </div>

            <div>
              <label
                htmlFor="v2-company"
                className="mb-2 block text-[11px] font-medium uppercase tracking-[0.08em] text-[#999999]"
              >
                Company / Development
              </label>
              <input
                id="v2-company"
                name="company"
                type="text"
                required
                autoComplete="organization"
                placeholder="Consultatio — Oceana Puerto Madero"
                className={`block w-full rounded-none border-0 border-b border-[#333333] bg-transparent px-0 py-3 text-[16px] text-white placeholder:text-[#999999]/50 transition-colors duration-200 ${EASE} focus:border-white focus:outline-none`}
              />
            </div>

            <div>
              <label
                htmlFor="v2-email"
                className="mb-2 block text-[11px] font-medium uppercase tracking-[0.08em] text-[#999999]"
              >
                Corporate email
              </label>
              <input
                id="v2-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="delfina@consultatio.com"
                className={`block w-full rounded-none border-0 border-b border-[#333333] bg-transparent px-0 py-3 text-[16px] text-white placeholder:text-[#999999]/50 transition-colors duration-200 ${EASE} focus:border-white focus:outline-none`}
              />
            </div>

            <button
              type="submit"
              className={`mt-2 inline-flex h-11 items-center justify-center self-start rounded-full bg-[#f5f5f0] px-6 text-[16px] font-medium text-black shadow-[rgba(0,0,0,0.15)_0px_4px_20px_0px] transition-opacity duration-200 ${EASE} hover:opacity-85`}
            >
              Request Access
            </button>
          </form>
        </div>
      </dialog>
    </main>
  );
}
