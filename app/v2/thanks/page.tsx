import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solicitud recibida — Visium 5.0",
  robots: { index: false },
};

/** Confirmación post-envío — la sala en silencio después de que se cierra la puerta. */
export default function ThanksPage() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center bg-black px-5 text-white">
      <div className="mx-auto w-full max-w-[1200px]">
        <p className="mb-10 text-[11px] font-medium uppercase tracking-[0.05em] text-[#D4AF37]">
          Acceso corporativo · Solicitud recibida
        </p>
        <h1 className="max-w-4xl text-[clamp(3rem,8vw,8rem)] font-medium leading-[1.0] tracking-[-0.05em] text-white">
          Consideralo{" "}
          <em className="bg-gradient-to-r from-[#F0CB65] to-[#D4AF37] bg-clip-text font-display font-medium italic text-transparent">
            visto
          </em>
          .
        </h1>
        <p className="mt-10 max-w-xl text-[20px] leading-[1.5] text-[#999999]">
          Tu solicitud ya está con nuestro equipo. Respondemos personalmente,
          dentro de un día hábil, con el acceso a tu simulación espacial.
        </p>
        <Link
          href="/v2"
          className="mt-12 inline-flex h-11 items-center rounded-full border border-[rgba(212,175,55,0.45)] px-5 text-[16px] font-medium text-[#F0CB65] transition-colors duration-200 [transition-timing-function:cubic-bezier(0.625,0.05,0,1)] hover:bg-[rgba(212,175,55,0.08)]"
        >
          Volver a Visium
        </Link>
      </div>
    </main>
  );
}
