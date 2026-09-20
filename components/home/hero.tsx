"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShieldCheck,
  Building,
  CheckCircle2,
  Clock,
  Sparkles,
  Key,
  Home,
  UserCheck,
  FileCheck,
  Award,
} from "lucide-react";

interface CornerCardData {
  status: string;
  name: string;
  note: string;
  dotColor: string;
  icon: React.ElementType;
  iconStyle: string;
}

interface HeroProperty {
  imageSrc: string;
  title: string;
  location: string;
  typeLabel: string;
  price: string;
  cornerCard: CornerCardData;
}

interface BottomRightSnippet {
  tag: string;
  title: string;
  detail: string;
  icon: React.ElementType;
  iconStyle: string;
  dotColor: string;
}

const HERO_PROPERTIES: HeroProperty[] = [
  {
    imageSrc: "/images/hero/hero-01.jpg",
    title: "The Belnord Penthouse",
    location: "Upper West Side • Manhattan, NY",
    typeLabel: "Signature Placement",
    price: "$9,200 / mo",
    cornerCard: {
      status: "Just Placed • Long-Term",
      name: "Pacific Heights 2BD Suite",
      note: "Lease confirmed 3 hours ago",
      dotColor: "bg-olive-600",
      icon: CheckCircle2,
      iconStyle: "bg-olive-100 border-olive-200 text-olive-700",
    },
  },
  {
    imageSrc: "/images/hero/hero-02.jpg",
    title: "The Trousdale Pavilion",
    location: "Trousdale Estates • Beverly Hills, CA",
    typeLabel: "Architectural Estate",
    price: "$11,500 / mo",
    cornerCard: {
      status: "Direct Lease Signed",
      name: "Trousdale Hillside Residence",
      note: "Verified private placement",
      dotColor: "bg-bronze-600",
      icon: FileCheck,
      iconStyle: "bg-bronze-100 border-bronze-200 text-bronze-700",
    },
  },
  {
    imageSrc: "/images/hero/hero-03.jpg",
    title: "The Lincoln Park Flat",
    location: "Lincoln Park • Chicago, IL",
    typeLabel: "Long-Term Residence",
    price: "$4,800 / mo",
    cornerCard: {
      status: "Recently Leased",
      name: "Armitage Ave Brownstone",
      note: "Move-in scheduled for 1st",
      dotColor: "bg-olive-600",
      icon: CheckCircle2,
      iconStyle: "bg-olive-100 border-olive-200 text-olive-700",
    },
  },
  {
    imageSrc: "/images/hero/hero-04.jpg",
    title: "The Red Mountain Lodge",
    location: "Red Mountain • Aspen, CO",
    typeLabel: "Seasonal Chalet",
    price: "$14,000 / mo",
    cornerCard: {
      status: "Now Available",
      name: "Alpine Panorama Suite",
      note: "Private viewing slots open",
      dotColor: "bg-emerald-500",
      icon: Home,
      iconStyle: "bg-emerald-100 border-emerald-200 text-emerald-700",
    },
  },
  {
    imageSrc: "/images/hero/hero-05.jpg",
    title: "The SoHo Cast-Iron Loft",
    location: "SoHo • New York, NY",
    typeLabel: "Double-Height Volume",
    price: "$8,400 / mo",
    cornerCard: {
      status: "Application Pending",
      name: "Greene Street Duplex Loft",
      note: "Application review in progress",
      dotColor: "bg-amber-600",
      icon: Clock,
      iconStyle: "bg-amber-100 border-amber-200 text-amber-700",
    },
  },
  {
    imageSrc: "/images/hero/hero-06.jpg",
    title: "The Commonwealth Manor",
    location: "Back Bay • Boston, MA",
    typeLabel: "Heritage Flat",
    price: "$6,900 / mo",
    cornerCard: {
      status: "Pre-Lease Secured",
      name: "Back Bay Historic Flat",
      note: "Final lease execution ready",
      dotColor: "bg-bronze-600",
      icon: ShieldCheck,
      iconStyle: "bg-bronze-100 border-bronze-200 text-bronze-700",
    },
  },
  {
    imageSrc: "/images/hero/hero-07.jpg",
    title: "The Lady Bird Penthouse",
    location: "Rainey District • Austin, TX",
    typeLabel: "Corner Condominium",
    price: "$5,200 / mo",
    cornerCard: {
      status: "Move-In Confirmed",
      name: "Downtown Lakefront High-Rise",
      note: "Keys released to resident",
      dotColor: "bg-olive-600",
      icon: Key,
      iconStyle: "bg-olive-100 border-olive-200 text-olive-700",
    },
  },
  {
    imageSrc: "/images/hero/hero-08.jpg",
    title: "The Georgetown Rowhouse",
    location: "Georgetown • Washington, D.C.",
    typeLabel: "Historic Residence",
    price: "$7,300 / mo",
    cornerCard: {
      status: "Deposit Received",
      name: "O Street Federal Residence",
      note: "Agent inspection approved",
      dotColor: "bg-emerald-500",
      icon: Award,
      iconStyle: "bg-emerald-100 border-emerald-200 text-emerald-700",
    },
  },
  {
    imageSrc: "/images/hero/hero-09.jpg",
    title: "The Pearl Mezzanine Loft",
    location: "Pearl District • Portland, OR",
    typeLabel: "Industrial Atelier",
    price: "$4,100 / mo",
    cornerCard: {
      status: "Active Tenancy",
      name: "NW 11th Double-Height Unit",
      note: "Long-term resident placed",
      dotColor: "bg-olive-600",
      icon: CheckCircle2,
      iconStyle: "bg-olive-100 border-olive-200 text-olive-700",
    },
  },
  {
    imageSrc: "/images/hero/hero-10.jpg",
    title: "The South Beach Pavilion",
    location: "South of Fifth • Miami, FL",
    typeLabel: "Furnished Shortlet",
    price: "$7,800 / mo",
    cornerCard: {
      status: "Placement Finalized",
      name: "Ocean Drive Executive Suite",
      note: "90-day corporate placement",
      dotColor: "bg-bronze-600",
      icon: UserCheck,
      iconStyle: "bg-bronze-100 border-bronze-200 text-bronze-700",
    },
  },
  {
    imageSrc: "/images/hero/hero-11.jpg",
    title: "The Pacific Heights Lateral",
    location: "Pacific Heights • San Francisco, CA",
    typeLabel: "Full-Floor Flat",
    price: "$9,800 / mo",
    cornerCard: {
      status: "Application Approved",
      name: "Broadway St Panoramic Suite",
      note: "Tenant application verified",
      dotColor: "bg-emerald-500",
      icon: ShieldCheck,
      iconStyle: "bg-emerald-100 border-emerald-200 text-emerald-700",
    },
  },
  {
    imageSrc: "/images/hero/hero-12.jpg",
    title: "The Cherry Creek Atelier",
    location: "Cherry Creek • Denver, CO",
    typeLabel: "Penthouse Terrace",
    price: "$6,100 / mo",
    cornerCard: {
      status: "Just Listed • Exclusive",
      name: "Columbine Sky Atelier",
      note: "Now available for placement",
      dotColor: "bg-bronze-600",
      icon: Sparkles,
      iconStyle: "bg-bronze-100 border-bronze-200 text-bronze-700",
    },
  },
];

const BOTTOM_RIGHT_SNIPPETS: BottomRightSnippet[] = [
  {
    tag: "Turnkey Shortlet",
    title: "Gold Coast Loft • 90 Days",
    detail: "Concierge move-in scheduled",
    icon: Key,
    iconStyle: "bg-bronze-100 border-bronze-200 text-bronze-700",
    dotColor: "bg-bronze-600",
  },
  {
    tag: "Placement Velocity",
    title: "Avg. Move-In: 10 Days",
    detail: "From inquiry to key handoff",
    icon: Clock,
    iconStyle: "bg-sand-100 border-sand-200 text-charcoal-800",
    dotColor: "bg-taupe-600",
  },
  {
    tag: "Placement Trust",
    title: "850+ Vetted Tenancies",
    detail: "Direct landlord representation",
    icon: ShieldCheck,
    iconStyle: "bg-olive-100 border-olive-200 text-olive-700",
    dotColor: "bg-olive-600",
  },
  {
    tag: "Verification Standard",
    title: "24–48h Review Turnaround",
    detail: "Objective applicant evaluation",
    icon: Sparkles,
    iconStyle: "bg-bronze-100 border-bronze-200 text-bronze-700",
    dotColor: "bg-bronze-600",
  },
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);

  // Main Image & Top-Left Corner Card timer (5s interval, synchronous)
  useEffect(() => {
    const mainTimer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_PROPERTIES.length);
    }, 5000);
    return () => clearInterval(mainTimer);
  }, []);

  // Bottom-Right Corner Card timer (9.5s interval, visibly slower & asynchronous)
  useEffect(() => {
    const bottomTimer = setInterval(() => {
      setBottomIndex((prev) => (prev + 1) % BOTTOM_RIGHT_SNIPPETS.length);
    }, 9500);
    return () => clearInterval(bottomTimer);
  }, []);

  const activeProperty = HERO_PROPERTIES[activeIndex];
  const activeTopCorner = activeProperty.cornerCard;
  const TopCornerIcon = activeTopCorner.icon;

  const activeBottomSnippet = BOTTOM_RIGHT_SNIPPETS[bottomIndex];
  const BottomSnippetIcon = activeBottomSnippet.icon;

  return (
    <section className="relative overflow-hidden bg-ivory-100 border-b border-sand-300/80 pt-10 pb-16 md:pt-20 md:pb-28">
      {/* Ambient background glow for warmth and depth */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-bronze-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-[450px] h-[450px] bg-olive-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
        {/* Left Column: Narrative & Live Trust Metrics */}
        <div className="lg:col-span-6 space-y-7 md:space-y-8">
          {/* Live System Beacon */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-sand-300 shadow-subtle backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-sans font-medium text-charcoal-800 tracking-wide">
              Active Placement Network • 24+ Major U.S. Hubs
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-charcoal-900 leading-[1.04]">
              Curated Living Across the United States.
            </h1>

            <p className="font-sans text-base sm:text-lg text-taupe-600 leading-relaxed max-w-xl">
              A private, agent-assisted pathway to premier residential accommodation. We match prospective tenants with vetted long-term leases and luxury shortlets with complete discretion.
            </p>
          </div>

          {/* Action CTAs — Restyled */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
            <a href="#application">
              <Button
                variant="primary"
                size="lg"
                className="gap-2.5 h-12 px-7 sm:px-8 text-sm sm:text-base shadow-card hover:shadow-glow"
              >
                <span>Start Your Application</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="#how-it-works">
              <Button
                variant="secondary"
                size="lg"
                className="h-12 px-7 sm:px-8 text-sm sm:text-base"
              >
                How It Works
              </Button>
            </a>
          </div>

          {/* Live Performance Stats Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-6 border-t border-sand-300/80 max-w-lg">
            <div className="bg-white/80 border border-sand-300/80 rounded-2xl p-3 sm:p-4 shadow-subtle space-y-1">
              <div className="font-headline text-xl sm:text-2xl md:text-3xl font-semibold text-charcoal-900 leading-none">
                $48M+
              </div>
              <div className="text-[9px] sm:text-[11px] font-sans text-taupe-500 uppercase tracking-wider">
                Placements Managed
              </div>
            </div>

            <div className="bg-white/80 border border-sand-300/80 rounded-2xl p-3 sm:p-4 shadow-subtle space-y-1">
              <div className="font-headline text-xl sm:text-2xl md:text-3xl font-semibold text-charcoal-900 leading-none">
                24–48h
              </div>
              <div className="text-[9px] sm:text-[11px] font-sans text-taupe-500 uppercase tracking-wider">
                Tenant Verification
              </div>
            </div>

            <div className="bg-white/80 border border-sand-300/80 rounded-2xl p-3 sm:p-4 shadow-subtle space-y-1">
              <div className="font-headline text-xl sm:text-2xl md:text-3xl font-semibold text-olive-600 leading-none">
                100%
              </div>
              <div className="text-[9px] sm:text-[11px] font-sans text-taupe-500 uppercase tracking-wider">
                Direct Landlord
              </div>
            </div>
          </div>

          {/* Concierge Presence */}
          <div className="flex items-center gap-3 text-xs text-taupe-600">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-sand-200 border-2 border-white flex items-center justify-center font-bold text-[10px] text-charcoal-800">
                JD
              </div>
              <div className="w-8 h-8 rounded-full bg-bronze-300 border-2 border-white flex items-center justify-center font-bold text-[10px] text-bronze-900">
                SC
              </div>
              <div className="w-8 h-8 rounded-full bg-olive-200 border-2 border-white flex items-center justify-center font-bold text-[10px] text-olive-900">
                AL
              </div>
            </div>
            <span>
              <strong className="text-charcoal-900 font-medium">Placement Specialists Online:</strong> Ready to guide your application today.
            </span>
          </div>
        </div>

        {/* Right Column: Rotating Property Showcase with Dynamic Floating Glass Cards */}
        <div className="lg:col-span-6 relative">
          <div className="relative mx-auto max-w-lg">
            {/* Main Property Photo Card — Crossfade Carousel */}
            <div className="group relative overflow-hidden rounded-3xl bg-white border border-sand-300 shadow-elevated">
              <div className="aspect-[4/3] sm:aspect-[14/11] overflow-hidden bg-sand-200 relative">
                {/* Image Stack — crossfade via opacity with 12 fresh photos */}
                {HERO_PROPERTIES.map((property, idx) => (
                  <Image
                    key={`${property.title}-${idx}`}
                    src={property.imageSrc}
                    alt={property.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
                      idx === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                    priority={idx === 0}
                  />
                ))}
                {/* Subtle scrim for reading overlaid text */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent z-10" />
              </div>

              {/* Inset Photo Card Overlay Details — synced with active property */}
              <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between z-20">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-sand-200 transition-all duration-700">
                      {activeProperty.typeLabel}
                    </span>
                  </div>
                  <div className="font-headline text-xl sm:text-2xl font-medium text-white leading-tight transition-all duration-700">
                    {activeProperty.title}
                  </div>
                  <div className="text-[11px] sm:text-xs text-sand-200 font-sans transition-all duration-700">
                    {activeProperty.location}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] sm:text-xs font-mono font-medium border border-white/30 transition-all duration-700">
                    {activeProperty.price}
                  </span>
                </div>
              </div>

              {/* Progress Dots */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                {HERO_PROPERTIES.map((_, idx) => (
                  <span
                    key={idx}
                    className={`block rounded-full transition-all duration-500 ${
                      idx === activeIndex
                        ? "w-4 h-1.5 bg-white/90"
                        : "w-1.5 h-1.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Live Card 1: Dynamic Top-Left Corner Card (Synchronous with Main Image) */}
            <div className="absolute -top-4 -left-3 sm:-top-6 sm:-left-8 liquid-glass-badge rounded-2xl p-3 sm:p-3.5 pr-4 sm:pr-5 shadow-card flex items-center gap-2.5 sm:gap-3 z-30 min-w-[190px] sm:min-w-[240px] max-w-[220px] sm:max-w-[280px]">
              <div
                key={`top-icon-${activeIndex}`}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center flex-shrink-0 animate-smooth-fade ${activeTopCorner.iconStyle}`}
              >
                <TopCornerIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div
                key={`top-content-${activeIndex}`}
                className="space-y-0.5 flex-1 min-w-0 animate-smooth-fade"
              >
                <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-taupe-500 font-semibold flex items-center gap-1 sm:gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeTopCorner.dotColor}`} />
                  <span className="truncate">{activeTopCorner.status}</span>
                </div>
                <div className="text-[11px] sm:text-xs font-sans font-medium text-charcoal-900 truncate">
                  {activeTopCorner.name}
                </div>
                <div className="text-[10px] sm:text-[11px] text-taupe-500 hidden sm:block truncate">
                  {activeTopCorner.note}
                </div>
              </div>
            </div>

            {/* Floating Live Card 2: Dynamic Bottom-Right Corner Card (Asynchronous ~9.5s Slower Cycle) */}
            <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 liquid-glass-badge rounded-2xl p-3 sm:p-3.5 pr-4 sm:pr-5 shadow-card flex items-center gap-2.5 sm:gap-3 z-30 min-w-[190px] sm:min-w-[230px] max-w-[220px] sm:max-w-[270px]">
              <div
                key={`bottom-icon-${bottomIndex}`}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center flex-shrink-0 animate-smooth-fade ${activeBottomSnippet.iconStyle}`}
              >
                <BottomSnippetIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div
                key={`bottom-content-${bottomIndex}`}
                className="space-y-0.5 flex-1 min-w-0 animate-smooth-fade"
              >
                <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-taupe-500 font-semibold flex items-center gap-1 sm:gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeBottomSnippet.dotColor}`} />
                  <span className="truncate">{activeBottomSnippet.tag}</span>
                </div>
                <div className="text-[11px] sm:text-xs font-sans font-medium text-charcoal-900 truncate">
                  {activeBottomSnippet.title}
                </div>
                <div className="text-[10px] sm:text-[11px] text-taupe-500 hidden sm:block truncate">
                  {activeBottomSnippet.detail}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
