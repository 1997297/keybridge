import React from "react";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Compass } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-12 md:py-16 bg-ivory-100 border-b border-sand-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="bronze">About Keybridge</Badge>
            <span className="text-xs font-sans tracking-architectural uppercase text-taupe-500 font-medium">
              Company Overview
            </span>
          </div>

          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-charcoal-900 leading-tight">
            Direct, agent-guided rentals across the country.
          </h2>

          <p className="font-sans text-sm sm:text-base text-taupe-700 leading-relaxed max-w-2xl">
            Keybridge connects renters with verified apartments and rental homes nationwide. Instead of unverified listings, you work directly with an assigned leasing specialist who guides you through property showings, paperwork, and lease signing.
          </p>
        </div>

        {/* Three Compact Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-8 mt-8 border-t border-sand-200">
          <div className="bg-white border border-sand-300 rounded-2xl p-5 sm:p-6 shadow-subtle hover:shadow-card transition-all duration-300 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-bronze-50 flex items-center justify-center border border-bronze-200 text-bronze-700 shadow-inner-subtle">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-lg sm:text-xl font-medium text-charcoal-900">
              Nationwide Reach
            </h3>
            <p className="font-sans text-xs sm:text-sm text-taupe-600 leading-relaxed">
              Quality apartments and homes in major metropolitan markets throughout the United States.
            </p>
          </div>

          <div className="bg-white border border-sand-300 rounded-2xl p-5 sm:p-6 shadow-subtle hover:shadow-card transition-all duration-300 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-olive-50 flex items-center justify-center border border-olive-200 text-olive-700 shadow-inner-subtle">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-lg sm:text-xl font-medium text-charcoal-900">
              Assigned Agent
            </h3>
            <p className="font-sans text-xs sm:text-sm text-taupe-600 leading-relaxed">
              Direct personal support for property viewings, application review, and landlord coordination.
            </p>
          </div>

          <div className="bg-white border border-sand-300 rounded-2xl p-5 sm:p-6 shadow-subtle hover:shadow-card transition-all duration-300 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sand-100 flex items-center justify-center border border-sand-200 text-charcoal-900 shadow-inner-subtle">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-lg sm:text-xl font-medium text-charcoal-900">
              Verified Properties
            </h3>
            <p className="font-sans text-xs sm:text-sm text-taupe-600 leading-relaxed">
              Real listings with confirmed rates, clear terms, and direct property management coordination.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
