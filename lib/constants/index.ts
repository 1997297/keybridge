/**
 * Keybridge Residential - Business Constants & Configuration Placeholders
 * To be populated with property portfolio, floor plans, resident application criteria, and architectural metadata.
 */

export const BRAND_CONFIG = {
  name: "Keybridge Residential",
  tagline: "Architectural Living & Curated Residences",
  description:
    "A dedicated application and resident portal for premier metropolitan residential communities.",
  region: "United States",
  contact: {
    conciergeEmail: "concierge@keybridgeresidential.com",
    leasingOfficePhone: "+1 (800) 555-0194",
  },
} as const;

export const DESIGN_TOKENS_META = {
  version: "1.0.0",
  aesthetic: "Architectural Earth-Tone Minimalist",
  primaryCanvas: "#FAF8F2",
  primaryText: "#231F1C",
  accentBronze: "#845729",
} as const;
