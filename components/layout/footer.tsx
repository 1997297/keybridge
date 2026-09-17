import React from "react";
import { BRAND_CONFIG } from "@/lib/constants";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-sand-300 bg-sand-100/50 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 text-xs text-taupe-600">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-headline font-semibold text-charcoal-900 text-sm">
              {BRAND_CONFIG.name}
            </span>
            <span className="text-taupe-400">•</span>
            <span>Residential Placement Consultancy</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-taupe-500">
            <ShieldCheck className="w-3.5 h-3.5 text-bronze-600" />
            <span>Equal Housing Opportunity • Agent-Guided Underwriting</span>
          </div>
        </div>

        <div className="pt-4 border-t border-sand-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-taupe-500">
          <div>
            © {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved.
          </div>
          <div className="text-center md:text-right font-mono">
            Process: Initial $75 Underwriting Fee • Agency Review • Post-Approval Rent Settlement • Key Release
          </div>
        </div>
      </div>
    </footer>
  );
}
