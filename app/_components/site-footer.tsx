import React from "react";
import { ShieldCheck } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="w-full border-t border-sand-300 bg-sand-100/60 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-6 text-xs text-taupe-600">
        <div className="flex items-center gap-2">
          <span className="font-headline font-semibold text-charcoal-900">
            {BRAND_CONFIG.name}
          </span>
          <span className="text-taupe-400">•</span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>

        <nav aria-label="Legal" className="flex items-center gap-3 text-[11px] font-mono text-taupe-500">
          <a href="/privacy-policy" className="hover:text-bronze-700 transition-colors">
            Privacy Policy
          </a>
          <span className="text-taupe-400" aria-hidden="true">•</span>
          <a href="/application-terms" className="hover:text-bronze-700 transition-colors">
            Application Terms
          </a>
        </nav>

        <div className="flex items-center gap-2 text-[11px] font-mono text-taupe-500">
          <ShieldCheck className="w-3.5 h-3.5 text-bronze-600" />
          <span>Equal Housing Opportunity • Direct Agent Placement</span>
        </div>
      </div>
    </footer>
  );
}
