import React from "react";
import { Badge } from "@/components/ui/badge";

interface TypologyItem {
  id: string;
  plate: string;
  category: "Apartment" | "Studio" | "Condo" | "Townhouse" | "Single-Family Home" | "Duplex";
  title: string;
  subtitle: string;
  attributes: string[];
  materials: string;
  imageSrc: string;
}

const typologies: TypologyItem[] = [
  {
    id: "townhouse",
    plate: "PLATE 01",
    category: "Townhouse",
    title: "The Historic Brownstone",
    subtitle: "Multi-Level Heritage Residence",
    attributes: ["Private Street Entry", "Multiple Levels", "Private Courtyard Garden"],
    materials: "Restored Masonry • Original Parquet • Cast Iron",
    imageSrc: "/images/townhouse.jpg",
  },
  {
    id: "apartment",
    plate: "PLATE 02",
    category: "Apartment",
    title: "The Lateral Flat",
    subtitle: "Classic Metropolitan Proportion",
    attributes: ["Expansive Floorplate", "Generous Ceiling Heights", "Dual-Aspect Light"],
    materials: "Honed Limestone • White Oak • Plaster Molding",
    imageSrc: "/images/apartment.jpg",
  },
  {
    id: "studio",
    plate: "PLATE 03",
    category: "Studio",
    title: "The Urban Atelier",
    subtitle: "Deliberate Single-Volume Living",
    attributes: ["Architectural Zoning", "Bespoke Built-in Joinery", "Optimized Daylight"],
    materials: "Birch Plywood • Fluted Glass • Brushed Steel",
    imageSrc: "/images/studio.jpg",
  },
  {
    id: "condo",
    plate: "PLATE 04",
    category: "Condo",
    title: "The Skyline Tower",
    subtitle: "Contemporary High-Rise Living",
    attributes: ["Floor-to-Ceiling Glazing", "Panoramic Vistas", "Full Concierge Services"],
    materials: "Calacatta Marble • Bronze Accents • Low-Iron Glass",
    imageSrc: "/images/condo.jpg",
  },
  {
    id: "duplex",
    plate: "PLATE 05",
    category: "Duplex",
    title: "The Mezzanine Loft",
    subtitle: "Double-Height Architectural Volume",
    attributes: ["Two-Story Spatial Flow", "Sculptural Staircase", "Upper Level Suite"],
    materials: "Polished Concrete • Warm Cedar • Steel Framing",
    imageSrc: "/images/duplex.jpg",
  },
  {
    id: "single-family-home",
    plate: "PLATE 06",
    category: "Single-Family Home",
    title: "The Mid-Century Pavilion",
    subtitle: "Detached Architectural Sanctuary",
    attributes: ["Seamless Indoor-Outdoor Flow", "Private Grounds", "Dedicated Driveway"],
    materials: "Stack Stone • Teak Millwork • Terrazzo Flooring",
    imageSrc: "/images/single-family.jpg",
  },
];

export function PropertyShowcase() {
  return (
    <section id="showcase" className="py-20 md:py-32 bg-ivory-50/60 border-b border-sand-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-sand-300 pb-8">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="bronze">Representative Typologies</Badge>
              <span className="text-xs font-sans tracking-architectural uppercase text-taupe-500">
                Editorial Showcase
              </span>
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-charcoal-900 leading-tight">
              Curated Residential Typologies.
            </h2>

            <p className="font-sans text-base sm:text-lg text-taupe-700 leading-relaxed">
              A visual monograph of residential archetypes represented across our nationwide placement portfolio. From historic brownstones to light-filled lofts, each residence reflects uncompromised architectural integrity.
            </p>
          </div>

          <div className="text-xs font-sans text-taupe-500 max-w-xs space-y-1 md:text-right border-l-2 md:border-l-0 md:border-r-2 border-bronze-600 pl-3 md:pl-0 md:pr-3">
            <div className="uppercase tracking-architectural font-medium text-charcoal-800 text-[11px]">
              Curatorial Index
            </div>
            <div>Six architectural forms placed across premier U.S. metropolitan regions.</div>
          </div>
        </div>

        {/* Magazine Spread Grid with Obvious Rounded-2xl Corners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {typologies.map((item) => (
            <article
              key={item.id}
              className="group bg-white border border-sand-300 rounded-2xl overflow-hidden shadow-subtle hover:shadow-card transition-all duration-500 flex flex-col"
            >
              {/* Photo Container with rounded top */}
              <div className="relative overflow-hidden bg-sand-100 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={item.imageSrc}
                  alt={`${item.category} - ${item.title}`}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal-950/10 mix-blend-multiply pointer-events-none" />

                {/* Subtle Typology Tag Over Photo */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-white/95 backdrop-blur-md text-charcoal-900 text-[10px] font-sans font-medium tracking-architectural uppercase px-3 py-1 rounded-full border border-sand-300 shadow-subtle">
                    {item.category}
                  </span>
                </div>

                {/* Plate Monogram Over Photo */}
                <div className="absolute top-4 right-4">
                  <span className="inline-block bg-charcoal-900/85 backdrop-blur-md text-white text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full">
                    {item.plate}
                  </span>
                </div>
              </div>

              {/* Monograph Caption Plate */}
              <div className="p-7 flex-1 flex flex-col justify-between space-y-6 bg-white">
                <div className="space-y-2">
                  <div className="text-[11px] font-sans tracking-architectural uppercase text-taupe-500 font-medium">
                    {item.subtitle}
                  </div>
                  <h3 className="font-headline text-2xl font-medium text-charcoal-900 leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Architectural Attributes with rounded-lg */}
                <div className="space-y-3 pt-4 border-t border-sand-200">
                  <div className="flex flex-wrap gap-1.5">
                    {item.attributes.map((attr) => (
                      <span
                        key={attr}
                        className="text-[11px] font-sans text-taupe-700 bg-sand-100 px-3 py-1 rounded-lg border border-sand-200"
                      >
                        {attr}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-taupe-500 pt-1">
                    <span className="uppercase text-taupe-400">Palette: </span>
                    {item.materials}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Editorial Sub-banner / Non-Marketplace Note with rounded-2xl */}
        <div className="p-6 bg-white border border-sand-300 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-taupe-600 shadow-subtle">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-bronze-600 flex-shrink-0" />
            <span>
              <strong className="text-charcoal-900 font-medium">Private Placement Representation: </strong>
              Keybridge facilitates residences across these typologies through direct landlord representation rather than public broker feeds.
            </span>
          </div>
          <span className="text-[11px] font-mono tracking-wider uppercase text-taupe-500 flex-shrink-0">
            Discreet & Agent-Assisted
          </span>
        </div>
      </div>
    </section>
  );
}
