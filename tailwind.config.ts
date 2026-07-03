import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./three/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        ink: "#0D0D12",
        panel: "#121218",
        gold: {
          DEFAULT: "#D4B36A",
          bright: "#E6C98A",
          deep: "#9A7B3A",
        },
        primary: {
          // Mapped to gold so existing utility classes inherit the new identity.
          DEFAULT: "#D4B36A",
          glow: "#E6C98A",
        },
        highlight: "#E6C98A",
        accent: "#F5F5F5",
        lead: {
          hot: "#FF4D4D",
          warm: "#FF8A00",
          mild: "#FACC15",
          cold: "#3B82F6",
          success: "#2ECC71",
        },
        surface: {
          DEFAULT: "#121218",
          raised: "#1A1A22",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        "11xl": ["13rem", { lineHeight: "0.86", letterSpacing: "-0.035em" }],
      },
      letterSpacing: {
        tightest: "-0.04em",
        ultrawide: "0.42em",
      },
      spacing: {
        section: "13rem",
        "section-sm": "8rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
        "6xl": "3.5rem",
      },
      boxShadow: {
        glass:
          "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 30px 90px -30px rgba(0,0,0,0.85)",
        glow: "0 0 90px -10px rgba(212,179,106,0.45)",
        "glow-soft": "0 0 140px -20px rgba(230,201,138,0.35)",
        gold: "0 0 0 1px rgba(212,179,106,0.25), 0 24px 70px -30px rgba(212,179,106,0.4)",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,179,106,0.16), transparent 70%)",
        mesh:
          "radial-gradient(at 18% 8%, rgba(212,179,106,0.12) 0px, transparent 50%), radial-gradient(at 82% 0%, rgba(230,201,138,0.08) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(18,18,24,0.7) 0px, transparent 60%)",
      },
      transitionTimingFunction: {
        spatial: "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "ping-soft": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "75%, 100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        float: "float 7s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        marquee: "marquee 40s linear infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        "ping-soft": "ping-soft 2.4s cubic-bezier(0,0,0.2,1) infinite",
        // Radar pausado para las simulaciones — tempo cinematográfico
        "ping-radar": "ping-soft 3.2s cubic-bezier(0.25,1,0.5,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
