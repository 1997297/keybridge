import React from "react";
import { BRAND_CONFIG } from "@/lib/constants";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-sand-300 bg-sand-100/60 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-taupe-600">
        <div className="flex items-center gap-2">
          <span className="font-headline font-semibold text-charcoal-900">
            {BRAND_CONFIG.name}
          </span>
          <span className="text-taupe-400">•</span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-taupe-500">
          <ShieldCheck className="w-3.5 h-3.5 text-bronze-600" />
          <span>Equal Housing Opportunity • Direct Agent Placement</span>
        </div>
      </div>
    </footer>
  );
}
