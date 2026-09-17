import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Crisp Alabaster Canvas
        ivory: {
          50: "#FAFAFC",
          100: "#F5F6F9", // Luminous, crisp modern canvas
          200: "#ECEEF2",
          300: "#DFE2E8",
          400: "#C9CED7",
        },
        // Cool Stone & Architectural Slate Neutrals
        sand: {
          50: "#F8F9FB",
          100: "#EFF1F5",
          200: "#E3E6EC",
          300: "#D4D8E2", // Modern crisp hairline border
          400: "#B8BDCB",
        },
        stone: {
          100: "#EFEFEF",
          200: "#E2E4E8",
          300: "#CDD1D9",
          400: "#A9AFBC",
          500: "#868D9C",
        },
        taupe: {
          400: "#9298A4",
          500: "#707684", // Muted metadata
          600: "#505663", // Secondary text
          700: "#363B45", // Subheadings
          800: "#22262E",
        },
        // Cool High-End Accent: Radiant Cognac & Burnished Copper
        bronze: {
          300: "#E8B078",
          400: "#DC9953",
          500: "#D18334",
          600: "#B96D21", // Radiant Cognac Primary Accent
          700: "#9C5716",
          800: "#7A410D",
          900: "#562C07",
        },
        "warm-brown": {
          500: "#8C5835",
          600: "#724324",
          700: "#583218",
        },
        // Alpine Emerald (Prestige, Verification & Living Accents)
        olive: {
          50: "#F0FDF4",
          100: "#E2F7EB", // Crisp emerald badge surface
          200: "#C3EDD3",
          400: "#58C285",
          600: "#1C7348", // Emerald status & verified accent
          700: "#155836",
          800: "#0F4027",
        },
        // Midnight Obsidian (High-Contrast, Modern & Authoritative)
        charcoal: {
          700: "#2A2D34",
          800: "#1B1D22",
          900: "#0F1013", // Primary deep text
          950: "#07080A", // Obsidian black
        },
      },
      fontFamily: {
        headline: ["var(--font-headline)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        serif: ["var(--font-headline)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        none: "0px",
        sm: "6px",
        DEFAULT: "16px", // Distinctly noticeable, modern rounded corners
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
      },
      boxShadow: {
        subtle: "0 2px 8px -2px rgba(15, 16, 19, 0.05), 0 1px 3px rgba(15, 16, 19, 0.02)",
        card: "0 10px 30px -10px rgba(15, 16, 19, 0.08), 0 4px 12px -4px rgba(15, 16, 19, 0.04)",
        elevated: "0 20px 40px -15px rgba(15, 16, 19, 0.12), 0 8px 16px -6px rgba(15, 16, 19, 0.06)",
        glow: "0 0 40px -10px rgba(185, 109, 33, 0.25)",
        "emerald-glow": "0 0 35px -8px rgba(28, 115, 72, 0.25)",
        "inner-subtle": "inset 0 1px 2px rgba(15, 16, 19, 0.04)",
      },
      letterSpacing: {
        editorial: "0.06em",
        architectural: "0.12em",
      },
    },
  },
  plugins: [],
};

export default config;
