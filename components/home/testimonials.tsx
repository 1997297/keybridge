import React from "react";
import { Badge } from "@/components/ui/badge";
import { Quote, CheckCircle2, MapPin, Building, ArrowRight } from "lucide-react";

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  propertyType: string;
  tenancyType: "Long-Term Rental" | "Shortlet";
  quote: string;
  timeline: string;
  agentRef: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "testimonial-01",
    name: "Marcus T.",
    location: "Chicago, IL",
    propertyType: "2-Bedroom High-Rise Apartment",
    tenancyType: "Long-Term Rental",
    quote:
      "The application process was direct and transparent. My Keybridge agent was available throughout the showing and walked me through the paperwork before the fee was processed. No surprises.",
    timeline: "Placed in 4 business days",
    agentRef: "Assisted by Midwest Division",
  },
  {
    id: "testimonial-02",
    name: "Elena R.",
    location: "Seattle, WA",
    propertyType: "Furnished Executive Studio",
    tenancyType: "Shortlet",
    quote:
      "Relocating on short notice was stressful, but having a designated representative manage the apartment release and verification made the transition smooth. Clear, professional communication from day one.",
    timeline: "3-Month Corporate Placement",
    agentRef: "Assisted by Pacific Northwest Team",
  },
  {
    id: "testimonial-03",
    name: "David & Sarah K.",
    location: "Austin, TX",
    propertyType: "Modern Downtown Condominium",
    tenancyType: "Long-Term Rental",
    quote:
      "Straightforward process with realistic timelines. Once the viewing and fee were completed, Keybridge kept us informed until our lease agreement was ready to sign.",
    timeline: "Placed in 5 business days",
    agentRef: "Assisted by Texas Leasing Group",
  },
  {
    id: "testimonial-04",
    name: "Julian M.",
    location: "Brooklyn, NY",
    propertyType: "Historic Brownstone Townhouse",
    tenancyType: "Long-Term Rental",
    quote:
      "It is refreshing to work through an actual guided process rather than submitting blind inquiries online. Keybridge coordinated directly with the property owner and handled the tenancy release efficiently.",
    timeline: "Placed in 6 business days",
    agentRef: "Assisted by New York Division",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-12 md:py-16 bg-ivory-100 border-b border-sand-300/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="bronze">Tenant Reviews</Badge>
            <span className="text-xs font-sans tracking-architectural uppercase text-taupe-500 font-medium">
              Verified Feedback
            </span>
          </div>

          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-charcoal-900 leading-tight">
            What Renters Say
          </h2>

          <p className="font-sans text-sm sm:text-base text-taupe-600 leading-relaxed">
            Direct feedback from tenants placed into apartments and shortlets by Keybridge agents.
          </p>
        </div>

        {/* Compact 4-Column Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-sand-300 rounded-2xl p-5 shadow-subtle hover:shadow-card transition-all duration-200 flex flex-col justify-between hover:-translate-y-0.5 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge
                    variant={item.tenancyType === "Shortlet" ? "bronze" : "olive"}
                    className="text-[9px] px-2 py-0.5"
                  >
                    {item.tenancyType}
                  </Badge>
                  <Quote className="w-3.5 h-3.5 text-taupe-400" />
                </div>

                <p className="font-sans text-xs sm:text-sm text-charcoal-800 leading-relaxed italic">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-sand-200 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-charcoal-900">{item.name}</span>
                  <span className="font-mono text-[11px] text-taupe-500">{item.location}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-taupe-500 font-mono">
                  <span>{item.timeline}</span>
                  <span className="text-olive-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-olive-600" />
                    Verified
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
