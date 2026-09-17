"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Clock, Home } from "lucide-react";

export function Services() {
  const handleServiceClick = (
    serviceType: "long-term" | "shortlet",
    e: React.MouseEvent
  ) => {
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `#application?service=${serviceType}`);
      window.dispatchEvent(
        new CustomEvent("keybridge:service-select", {
          detail: { service: serviceType },
        })
      );
      const target = document.getElementById("application");
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <section id="services" className="py-20 md:py-28 bg-ivory-100 border-b border-sand-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="bronze">Our Services</Badge>
            <span className="text-xs font-sans tracking-architectural uppercase text-taupe-500">
              Tenancy Pathways
            </span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-charcoal-900 leading-tight">
            Two Distinct Residential Offerings.
          </h2>

          <p className="font-sans text-base sm:text-lg text-taupe-600 leading-relaxed">
            Keybridge structures two clear pathways to accommodate your tenancy timeline—both backed by dedicated agent support, verified property agreements, and seamless application processing.
          </p>
        </div>

        {/* Side-by-Side Service Panels with Obvious Rounded-3xl Corners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Service 1: Long-Term Rentals */}
          <div className="bg-white border border-sand-300 rounded-3xl p-8 sm:p-10 shadow-subtle flex flex-col justify-between hover:shadow-card transition-all duration-300 relative group overflow-hidden">
            {/* Top Accent Ribbon */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-bronze-600" />

            <div className="space-y-8">
              {/* Header Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="olive">12+ Months</Badge>
                  <span className="text-xs font-mono text-taupe-400 font-medium">Option 01</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-headline text-2xl sm:text-3xl font-medium text-charcoal-900">
                    Long-Term Rentals
                  </h3>
                  <p className="text-sm font-sans text-taupe-600">
                    For applicants securing longer-term primary residential accommodation.
                  </p>
                </div>
              </div>

              {/* Architectural Spec Container with Rounded-2xl */}
              <div className="p-6 bg-sand-50/80 border border-sand-200 rounded-2xl space-y-3.5">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="block uppercase tracking-wider text-taupe-500 text-[10px] font-mono">
                      Typical Lease
                    </span>
                    <span className="font-medium text-charcoal-900 text-sm">1 to 3 Years</span>
                  </div>
                  <div>
                    <span className="block uppercase tracking-wider text-taupe-500 text-[10px] font-mono">
                      Property Type
                    </span>
                    <span className="font-medium text-charcoal-900 text-sm">Unfurnished / Semi</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-sand-200 text-xs text-taupe-600 flex items-center gap-2">
                  <Home className="w-4 h-4 text-bronze-600 flex-shrink-0" />
                  <span>Curated multi-family residences, condominiums & brownstones</span>
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-3">
                <div className="text-xs font-sans tracking-architectural uppercase text-taupe-500 font-medium">
                  Service Inclusions
                </div>

                <ul className="space-y-3 text-sm text-charcoal-800">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-lg bg-sand-100 flex items-center justify-center mt-0.5 flex-shrink-0 text-bronze-600">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Dedicated leasing agent representing your tenant application</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-lg bg-sand-100 flex items-center justify-center mt-0.5 flex-shrink-0 text-bronze-600">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Direct property coordination and private showing arrangements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-lg bg-sand-100 flex items-center justify-center mt-0.5 flex-shrink-0 text-bronze-600">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Structured credit, employment, and background verification package</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-lg bg-sand-100 flex items-center justify-center mt-0.5 flex-shrink-0 text-bronze-600">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Direct landlord lease execution with transparent terms</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-8 mt-8 border-t border-sand-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-taupe-500 text-center sm:text-left">
                Standard 3–5 business day turnaround
              </div>
              <a
                href="#application"
                onClick={(e) => handleServiceClick("long-term", e)}
                className="w-full sm:w-auto"
              >
                <Button variant="primary" className="w-full sm:w-auto gap-2">
                  <span>Start Long-Term Application</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Service 2: Shortlets */}
          <div className="bg-white border border-sand-300 rounded-3xl p-8 sm:p-10 shadow-subtle flex flex-col justify-between hover:shadow-card transition-all duration-300 relative group overflow-hidden">
            {/* Top Accent Ribbon */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-taupe-500" />

            <div className="space-y-8">
              {/* Header Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="bronze">Flexible Duration</Badge>
                  <span className="text-xs font-mono text-taupe-400 font-medium">Option 02</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-headline text-2xl sm:text-3xl font-medium text-charcoal-900">
                    Shortlets
                  </h3>
                  <p className="text-sm font-sans text-taupe-600">
                    For applicants requiring temporary or shorter-duration accommodation.
                  </p>
                </div>
              </div>

              {/* Architectural Spec Container with Rounded-2xl */}
              <div className="p-6 bg-sand-50/80 border border-sand-200 rounded-2xl space-y-3.5">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="block uppercase tracking-wider text-taupe-500 text-[10px] font-mono">
                      Duration Window
                    </span>
                    <span className="font-medium text-charcoal-900 text-sm">30 Days to 11 Months</span>
                  </div>
                  <div>
                    <span className="block uppercase tracking-wider text-taupe-500 text-[10px] font-mono">
                      Move-In Ready
                    </span>
                    <span className="font-medium text-charcoal-900 text-sm">Fully Furnished & Equipped</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-sand-200 text-xs text-taupe-600 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-bronze-600 flex-shrink-0" />
                  <span>Ideal for corporate relocations, temporary projects & transitions</span>
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-3">
                <div className="text-xs font-sans tracking-architectural uppercase text-taupe-500 font-medium">
                  Service Inclusions
                </div>

                <ul className="space-y-3 text-sm text-charcoal-800">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-lg bg-sand-100 flex items-center justify-center mt-0.5 flex-shrink-0 text-bronze-600">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Designer furnished suites with complete housewares and linen sets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-lg bg-sand-100 flex items-center justify-center mt-0.5 flex-shrink-0 text-bronze-600">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>All-inclusive high-speed WiFi, utilities, and building amenity access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-lg bg-sand-100 flex items-center justify-center mt-0.5 flex-shrink-0 text-bronze-600">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Expedited verification process with flexible extension terms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-lg bg-sand-100 flex items-center justify-center mt-0.5 flex-shrink-0 text-bronze-600">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Dedicated concierge contact for keys and arrival handover</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-8 mt-8 border-t border-sand-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-taupe-500 text-center sm:text-left">
                Expedited 24–48 hour turnaround
              </div>
              <a
                href="#application"
                onClick={(e) => handleServiceClick("shortlet", e)}
                className="w-full sm:w-auto"
              >
                <Button variant="secondary" className="w-full sm:w-auto gap-2">
                  <span>Inquire for Shortlet</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
