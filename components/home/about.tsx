import React from "react";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Compass } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-ivory-100 border-b border-sand-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="outline">About Keybridge</Badge>
            <span className="text-xs font-sans tracking-architectural uppercase text-taupe-500">
              Company Overview
            </span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-charcoal-900 leading-tight">
            A deliberate, agent-assisted approach to securing your next residence.
          </h2>

          <p className="font-sans text-base sm:text-lg text-taupe-700 leading-relaxed">
            Keybridge works with prospective tenants across the United States to facilitate long-term rental and shortlet opportunities through a professional, guided, agent-assisted process.
          </p>

          <p className="font-sans text-sm sm:text-base text-taupe-600 leading-relaxed">
            We eliminate the uncertainty of unverified listings and impersonal platforms. Each applicant is paired with an experienced placement specialist who manages residence selection, compliance documentation, and direct landlord coordination with complete discretion.
          </p>
        </div>

        {/* Three Grounded Architectural Pillars with Obvious Rounded Corners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 mt-12 border-t border-sand-200">
          <div className="bg-white border border-sand-300 rounded-2xl p-7 shadow-subtle hover:shadow-card transition-all duration-300 space-y-4">
            <div className="w-11 h-11 rounded-xl bg-sand-100 flex items-center justify-center border border-sand-200 text-bronze-600 shadow-inner-subtle">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-2xl font-medium text-charcoal-900">
              Nationwide Scope
            </h3>
            <p className="font-sans text-sm text-taupe-600 leading-relaxed">
              Active across major metropolitan centers and established residential markets throughout the United States.
            </p>
          </div>

          <div className="bg-white border border-sand-300 rounded-2xl p-7 shadow-subtle hover:shadow-card transition-all duration-300 space-y-4">
            <div className="w-11 h-11 rounded-xl bg-sand-100 flex items-center justify-center border border-sand-200 text-bronze-600 shadow-inner-subtle">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-2xl font-medium text-charcoal-900">
              Agent-Assisted Process
            </h3>
            <p className="font-sans text-sm text-taupe-600 leading-relaxed">
              Every prospective tenant receives personal, guided support from initial portfolio review to move-in confirmation.
            </p>
          </div>

          <div className="bg-white border border-sand-300 rounded-2xl p-7 shadow-subtle hover:shadow-card transition-all duration-300 space-y-4">
            <div className="w-11 h-11 rounded-xl bg-sand-100 flex items-center justify-center border border-sand-200 text-bronze-600 shadow-inner-subtle">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-2xl font-medium text-charcoal-900">
              Vetted Opportunities
            </h3>
            <p className="font-sans text-sm text-taupe-600 leading-relaxed">
              Direct relationships with building management ensure genuine pricing, legitimate lease terms, and prompt decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
