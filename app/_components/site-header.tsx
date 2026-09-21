import React from "react";
import { BRAND_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="w-full sticky top-0 z-50 liquid-glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-bronze-600 rotate-45 flex items-center justify-center transition-transform group-hover:rotate-90 duration-300">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-bronze-600" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-lg sm:text-xl md:text-2xl tracking-tight text-charcoal-900 font-semibold leading-none">
              {BRAND_CONFIG.name}
            </span>
            <span className="hidden sm:block text-[10px] font-sans tracking-architectural uppercase text-taupe-500 mt-1">
              Residential Placement
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-xs font-sans tracking-architectural uppercase text-charcoal-800 font-medium">
          <a href="/#about" className="hover:text-bronze-600 transition-colors duration-200">
            About
          </a>
          <a href="/#services" className="hover:text-bronze-600 transition-colors duration-200">
            Services
          </a>
          <a href="/#processes" className="hover:text-bronze-600 transition-colors duration-200">
            Processes
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a href="/#application">
            <Button variant="primary" size="sm">
              Apply Now
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
