import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Request received — Visium 5.0",
  robots: { index: false },
};

/** Post-submit confirmation — a quiet room after the door closes. */
export default function ThanksPage() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center bg-black px-5 text-white">
      <div className="mx-auto w-full max-w-[1200px]">
        <p className="mb-10 text-[11px] font-medium uppercase tracking-[0.05em] text-[#999999]">
          Corporate access · Request received
        </p>
        <h1 className="max-w-4xl text-[clamp(3rem,8vw,8rem)] font-medium leading-[1.0] tracking-[-0.05em] text-white">
          Consider it{" "}
          <em className="font-display font-medium italic">seen</em>.
        </h1>
        <p className="mt-10 max-w-xl text-[20px] leading-[1.5] text-[#999999]">
          Your request is with our team. We reply personally, within one
          business day.
        </p>
        <Link
          href="/v2"
          className="mt-12 inline-flex h-11 items-center rounded-full border border-white px-5 text-[16px] font-medium text-white transition-colors duration-200 [transition-timing-function:cubic-bezier(0.625,0.05,0,1)] hover:bg-white/10"
        >
          Back to Visium
        </Link>
      </div>
    </main>
  );
}
