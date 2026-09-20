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
    <section id="services" className="py-12 md:py-16 bg-ivory-100 border-b border-sand-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="bronze">Rental Options</Badge>
            <span className="text-xs font-sans tracking-architectural uppercase text-taupe-500 font-medium">
              Services
            </span>
          </div>

          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-charcoal-900 leading-tight">
            Two Simple Rental Pathways
          </h2>

          <p className="font-sans text-sm sm:text-base text-taupe-600 leading-relaxed">
            Choose the term that fits your plans. Every application includes personal agent support, verified property agreements, and fast processing.
          </p>
        </div>

        {/* Compact Side-by-Side Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Service 1: Long-Term Rentals */}
          <div className="bg-white border border-sand-300 rounded-2xl p-6 sm:p-8 shadow-subtle flex flex-col justify-between hover:shadow-card transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-bronze-600" />

            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge variant="olive">12+ Months</Badge>
                  <span className="text-xs font-mono text-taupe-400 font-medium">Option 01</span>
                </div>
                <h3 className="font-headline text-xl sm:text-2xl font-semibold text-charcoal-900">
                  Long-Term Rentals
                </h3>
                <p className="text-xs sm:text-sm text-taupe-600">
                  Ideal for tenants looking for a permanent primary residence.
                </p>
              </div>

              {/* Compact Specs Row */}
              <div className="grid grid-cols-3 gap-2 p-3.5 bg-sand-50 border border-sand-200 rounded-xl text-center">
                <div>
                  <span className="block text-[10px] font-mono uppercase text-taupe-500">Term</span>
                  <span className="text-xs font-semibold text-charcoal-900">1 to 3 Years</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-taupe-500">Furnishing</span>
                  <span className="text-xs font-semibold text-charcoal-900">Unfurnished</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-taupe-500">Timeline</span>
                  <span className="text-xs font-semibold text-charcoal-900">3 to 5 Days</span>
                </div>
              </div>

              {/* Inclusions */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-800">
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded bg-sand-100 flex items-center justify-center mt-0.5 flex-shrink-0 text-bronze-600">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>Assigned agent presents options and walks you through the lease</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded bg-sand-100 flex items-center justify-center mt-0.5 flex-shrink-0 text-bronze-600">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>Direct income and rental history verification</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded bg-sand-100 flex items-center justify-center mt-0.5 flex-shrink-0 text-bronze-600">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>Official lease signed directly with building management</span>
                </li>
              </ul>
            </div>

            {/* Action Footer */}
            <div className="pt-6 mt-6 border-t border-sand-200 flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-taupe-500">Standard Placement</span>
              <a
                href="#application"
                onClick={(e) => handleServiceClick("long-term", e)}
              >
                <Button variant="primary" size="sm" className="gap-2">
                  <span>Apply for Long-Term</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Service 2: Shortlets */}
          <div className="bg-white border border-sand-300 rounded-2xl p-6 sm:p-8 shadow-subtle flex flex-col justify-between hover:shadow-card transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-olive-600" />

            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge variant="bronze">Flexible Stay</Badge>
                  <span className="text-xs font-mono text-taupe-400 font-medium">Option 02</span>
                </div>
                <h3 className="font-headline text-xl sm:text-2xl font-semibold text-charcoal-900">
                  Short-Term Rentals
                </h3>
                <p className="text-xs sm:text-sm text-taupe-600">
                  Turnkey furnished suites for corporate stays and relocations.
                </p>
              </div>

              {/* Compact Specs Row */}
              <div className="grid grid-cols-3 gap-2 p-3.5 bg-sand-50 border border-sand-200 rounded-xl text-center">
                <div>
                  <span className="block text-[10px] font-mono uppercase text-taupe-500">Term</span>
                  <span className="text-xs font-semibold text-charcoal-900">1 to 11 Months</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-taupe-500">Furnishing</span>
                  <span className="text-xs font-semibold text-charcoal-900">Fully Furnished</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-taupe-500">Timeline</span>
                  <span className="text-xs font-semibold text-charcoal-900">24 to 48 Hours</span>
                </div>
              </div>

              {/* Inclusions */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-800">
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded bg-sand-100 flex items-center justify-center mt-0.5 flex-shrink-0 text-olive-700">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>Furnished suites with all utilities, high-speed WiFi, and amenities</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded bg-sand-100 flex items-center justify-center mt-0.5 flex-shrink-0 text-olive-700">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>Fast verification with options to renew or extend monthly</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded bg-sand-100 flex items-center justify-center mt-0.5 flex-shrink-0 text-olive-700">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>Coordinated key handoff and immediate move-in readiness</span>
                </li>
              </ul>
            </div>

            {/* Action Footer */}
            <div className="pt-6 mt-6 border-t border-sand-200 flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-taupe-500">Fast Turnaround</span>
              <a
                href="#application"
                onClick={(e) => handleServiceClick("shortlet", e)}
              >
                <Button variant="secondary" size="sm" className="gap-2">
                  <span>Inquire for Shortlet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
