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
      "Straightforward underwriting with realistic timelines. Once the initial showing and fee were completed, Keybridge kept us informed until our lease agreement was ready to sign.",
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
      className="py-20 md:py-28 bg-ivory-100 border-b border-sand-300/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="bronze">Tenant Experiences</Badge>
              <span className="text-xs font-sans tracking-architectural uppercase text-taupe-500">
                Verified Feedback
              </span>
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-charcoal-900 leading-tight">
              Real Experiences from Prospective Renters.
            </h2>

            <p className="font-sans text-base sm:text-lg text-taupe-600 leading-relaxed">
              Every tenancy at Keybridge is an agent-guided transition. Here is what applicants and residents share regarding our communication, timeline clarity, and underwriting assistance.
            </p>
          </div>


        </div>

        {/* 4-Column Clean Responsive Card Grid with Rounded-3xl Corners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-sand-300 rounded-3xl p-6 sm:p-7 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative group"
            >
              <div className="space-y-6">
                {/* Card Top: Tenancy Badge & Quote Icon */}
                <div className="flex items-center justify-between">
                  <Badge
                    variant={item.tenancyType === "Shortlet" ? "bronze" : "olive"}
                    className="text-[10px] px-2.5 py-0.5"
                  >
                    {item.tenancyType}
                  </Badge>

                  <div className="w-8 h-8 rounded-full bg-sand-100 flex items-center justify-center text-bronze-600 group-hover:bg-bronze-50 transition-colors">
                    <Quote className="w-4 h-4" />
                  </div>
                </div>

                {/* Restrained Quote Copy */}
                <p className="font-sans text-sm text-charcoal-800 leading-relaxed italic">
                  “{item.quote}”
                </p>
              </div>

              {/* Card Bottom: Author, Location & Property Details */}
              <div className="pt-6 mt-6 border-t border-sand-200/80 space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-headline text-base font-semibold text-charcoal-900">
                      {item.name}
                    </span>
                    <span className="text-[11px] font-mono text-taupe-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-taupe-400" />
                      {item.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-taupe-600">
                    <Building className="w-3.5 h-3.5 text-bronze-600 flex-shrink-0" />
                    <span className="truncate">{item.propertyType}</span>
                  </div>
                </div>

                {/* Verification Badge Container */}
                <div className="p-2.5 rounded-2xl bg-sand-50 border border-sand-200 text-[11px] font-mono text-taupe-600 flex items-center justify-between">
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

        {/* Bottom Editorial Callout */}
        <div className="text-center pt-4">
          <p className="font-mono text-xs text-taupe-500 tracking-wide">
            Testimonials presented reflect standard representative client outcomes. Feedback records are archived under Keybridge customer care compliance.
          </p>
        </div>
      </div>
    </section>
  );
}
