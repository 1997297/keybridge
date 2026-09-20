import React from "react";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, MapPin, Calendar, CheckCircle2 } from "lucide-react";

interface CredibilityStat {
  value: string;
  label: string;
  sublabel: string;
  description: string;
}

const STATS: CredibilityStat[] = [
  {
    value: "3+ Years",
    label: "Dedicated Renter Guidance",
    sublabel: "Active Market Experience",
    description:
      "Advising prospective tenants through guided showings, verified listings, and structured lease transitions.",
  },
  {
    value: "850+",
    label: "Placements Handled",
    sublabel: "Applications Facilitated",
    description:
      "Coordinated applications across primary long-term residences and move-in-ready shortlet properties.",
  },
  {
    value: "Nationwide",
    label: "Domestic Coverage",
    sublabel: "Coast-to-Coast Reach",
    description:
      "Collaborating with property managers and prospective renters across major U.S. metropolitan regions.",
  },
];

export function TrustCredibility() {
  return (
    <section className="py-12 md:py-16 bg-charcoal-900 text-ivory-100 relative overflow-hidden border-y border-charcoal-800">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-charcoal-800">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bronze-500 animate-pulse" />
              <span className="text-xs font-sans tracking-architectural uppercase text-bronze-400 font-semibold">
                Track Record
              </span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Experience You Can Count On
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-taupe-400 max-w-md leading-relaxed">
            Keybridge provides personal, agent-guided rental placement. We focus on clear leasing terms, verified listings, and responsive communication.
          </p>
        </div>

        {/* Refined 3-Stat Credibility Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-charcoal-800">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between space-y-4 ${
                idx === 0
                  ? "md:pr-10"
                  : idx === 1
                  ? "md:px-10"
                  : "md:pl-10"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-bronze-400">
                    {stat.value}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-base sm:text-lg font-headline font-medium text-white">
                    {stat.label}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-taupe-400">
                    {stat.sublabel}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-taupe-400 font-sans leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quiet Footnote & Trust Markers */}
        <div className="pt-6 border-t border-charcoal-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-taupe-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-bronze-500 flex-shrink-0" />
            <span className="font-mono text-[11px]">
              Independent Tenant Representation • Equal Housing Opportunity
            </span>
          </div>

          <div className="text-[11px] font-mono text-taupe-500 text-center sm:text-right">
            Figures reflect cumulative operational data.
          </div>
        </div>
      </div>
    </section>
  );
}
