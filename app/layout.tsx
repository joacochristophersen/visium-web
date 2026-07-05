import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { SITE } from "@/utils/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Institutional serif for headlines — private-banking / luxury real estate feel.
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "VISIUM",
    "inteligencia de conversión inmobiliaria",
    "VISIUM SCORE",
    "intención de compra",
    "real estate",
    "inmobiliaria",
    "PropTech LATAM",
    "leads calificados",
    "analítica de comportamiento",
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "es_LA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
