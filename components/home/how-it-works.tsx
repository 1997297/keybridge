import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  UserCheck,
  FileText,
  CreditCard,
  ShieldCheck,
  Banknote,
  Key,
  AlertCircle,
  CheckCircle2,
  Clock,
  Lock,
} from "lucide-react";

interface StepItem {
  number: string;
  shortLabel: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  badge: {
    label: string;
    variant: "bronze" | "olive" | "default" | "charcoal" | "outline";
  };
  highlight: string;
  statusNote: {
    text: string;
    type: "info" | "warning" | "success" | "accent";
  };
}

const steps: StepItem[] = [
  {
    number: "01",
    shortLabel: "Consultation",
    title: "Connect With Your Agent",
    tagline: "Consultation & Viewing",
    description:
      "The prospect has already communicated with an assigned Keybridge representative and been shown a suitable apartment or residential property matching their specific criteria.",
    icon: UserCheck,
    badge: {
      label: "Preliminary Phase",
      variant: "default",
    },
    highlight: "Agent-guided property walkthrough completed",
    statusNote: {
      text: "Dedicated representative assigned to your inquiry.",
      type: "info",
    },
  },
  {
    number: "02",
    shortLabel: "Application",
    title: "Submit Your Application",
    tagline: "Official Placement Filing",
    description:
      "Complete the official Keybridge apartment application using the accurate information and specific unit identifier associated with your prospective rental.",
    icon: FileText,
    badge: {
      label: "Application Filing",
      variant: "bronze",
    },
    highlight: "Accurate applicant profile & property reference",
    statusNote: {
      text: "Verified personal credentials and rental history.",
      type: "info",
    },
  },
  {
    number: "03",
    shortLabel: "Fee Payment",
    title: "Pay the $75 Application Fee",
    tagline: "Required Underwriting Processing",
    description:
      "After submission, the required $75 application fee must be completed. Applications are only reviewed and acted upon after the fee is received.",
    icon: CreditCard,
    badge: {
      label: "Mandatory $75 Fee",
      variant: "bronze",
    },
    highlight: "Initial fee required prior to application processing",
    statusNote: {
      text: "First payment step; review begins upon fee receipt.",
      type: "warning",
    },
  },
  {
    number: "04",
    shortLabel: "Underwriting",
    title: "Application Review",
    tagline: "Objective Agency Underwriting",
    description:
      "Once payment is confirmed, Keybridge conducts a formal review of the application. Applications are evaluated against agency standards and may be approved or rejected according to the process.",
    icon: ShieldCheck,
    badge: {
      label: "Agency Review",
      variant: "default",
    },
    highlight: "Evaluated under formal tenancy underwriting criteria",
    statusNote: {
      text: "Approval is not automatic or guaranteed; subject to criteria.",
      type: "info",
    },
  },
  {
    number: "05",
    shortLabel: "Rent Payment",
    title: "Pay Rent",
    tagline: "Post-Approval Settlement",
    description:
      "Once your application is approved, the next step is payment of your rent. This must be completed before final documentation and apartment release can proceed.",
    icon: Banknote,
    badge: {
      label: "Post-Approval Step",
      variant: "bronze",
    },
    highlight: "Rent payment required prior to documentation release",
    statusNote: {
      text: "Follows approval; required before lease & key handoff.",
      type: "accent",
    },
  },
  {
    number: "06",
    shortLabel: "Key Handover",
    title: "Apartment Release / Next Steps",
    tagline: "Tenancy Finalization",
    description:
      "With rent paid, Keybridge finalizes documentation and coordinates key handoff / move-in.",
    icon: Key,
    badge: {
      label: "Final Placement",
      variant: "olive",
    },
    highlight: "Final lease execution & physical key handover",
    statusNote: {
      text: "Documentation and keys released following confirmed rent.",
      type: "success",
    },
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 bg-white border-b border-sand-300/80 relative overflow-hidden"
    >
      {/* Subtle architectural background detail */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#0F1013_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="bronze">How It Works</Badge>
              <span className="text-xs font-sans tracking-architectural uppercase text-taupe-500">
                Placement Protocol
              </span>
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-charcoal-900 leading-tight">
              A Structured, Transparent Six-Step Tenancy Process.
            </h2>

            <p className="font-sans text-base sm:text-lg text-taupe-600 leading-relaxed">
              Every Keybridge residential placement follows a clear, agent-assisted workflow. From your initial property walkthrough through rent settlement to key collection, our structured protocol protects both prospective tenants and property owners.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs text-taupe-500 font-mono border border-sand-200 bg-sand-50/80 px-4 py-3 rounded-2xl">
            <Clock className="w-4 h-4 text-bronze-600 flex-shrink-0" />
            <span>Standard review timeline: 3–5 business days post-fee</span>
          </div>
        </div>

        {/* Desktop Progress Sequence Bar (6 Steps) */}
        <div className="hidden xl:block relative">
          <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-sand-200 -translate-y-1/2 z-0" />
          <div className="grid grid-cols-6 gap-2 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white border-2 border-bronze-600 text-bronze-600 font-mono text-xs font-bold flex items-center justify-center shadow-subtle flex-shrink-0">
                  {step.number}
                </div>
                <span className="text-[11px] font-sans uppercase tracking-architectural text-taupe-600 font-medium truncate">
                  {step.shortLabel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6-Step Cards Grid with Rounded-3xl Corners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-stretch">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isFeeStep = step.number === "03";
            const isReviewStep = step.number === "04";
            const isRentStep = step.number === "05";
            const isFinalStep = step.number === "06";

            return (
              <div
                key={idx}
                className={`relative flex flex-col justify-between bg-ivory-100/70 border rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:shadow-card hover:-translate-y-1 group ${
                  isFeeStep
                    ? "border-bronze-300/90 bg-white ring-1 ring-bronze-400/25 shadow-subtle"
                    : isRentStep
                    ? "border-bronze-300/90 bg-white ring-1 ring-bronze-400/25 shadow-subtle"
                    : isReviewStep
                    ? "border-sand-300 bg-white/90"
                    : isFinalStep
                    ? "border-olive-200/80 bg-white"
                    : "border-sand-300 bg-white/60"
                }`}
              >
                {/* Accent Ribbon for Highlights */}
                {isFeeStep && (
                  <div className="absolute top-0 left-5 right-5 h-1.5 bg-bronze-600 rounded-b-full" />
                )}
                {isRentStep && (
                  <div className="absolute top-0 left-5 right-5 h-1.5 bg-bronze-600 rounded-b-full" />
                )}
                {isFinalStep && (
                  <div className="absolute top-0 left-5 right-5 h-1.5 bg-olive-600 rounded-b-full" />
                )}

                <div className="space-y-5">
                  {/* Step Number + Icon Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-light tracking-tight text-charcoal-900 group-hover:text-bronze-600 transition-colors duration-200">
                      {step.number}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isFeeStep || isRentStep
                          ? "bg-bronze-50 border border-bronze-300 text-bronze-700 shadow-inner-subtle"
                          : isFinalStep
                          ? "bg-olive-50 border border-olive-200 text-olive-700"
                          : "bg-sand-100 border border-sand-200 text-charcoal-800"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title and Tagline */}
                  <div className="space-y-1">
                    <Badge variant={step.badge.variant} className="text-[9px] px-2 py-0.5 mb-1">
                      {step.badge.label}
                    </Badge>
                    <h3 className="font-headline text-base sm:text-lg font-medium text-charcoal-900 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-taupe-500">
                      {step.tagline}
                    </p>
                  </div>

                  {/* Core Description */}
                  <p className="font-sans text-xs text-taupe-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Card Bottom: Highlight & Status Note */}
                <div className="pt-5 mt-5 border-t border-sand-200/80 space-y-2.5">
                  <div className="flex items-start gap-1.5 text-[11px] text-charcoal-800 font-medium leading-snug">
                    <CheckCircle2 className="w-3.5 h-3.5 text-bronze-600 mt-0.5 flex-shrink-0" />
                    <span>{step.highlight}</span>
                  </div>

                  {/* Contextual Status Note */}
                  <div
                    className={`p-2.5 rounded-2xl text-[10px] leading-relaxed flex items-start gap-2 ${
                      step.statusNote.type === "warning"
                        ? "bg-amber-50/90 border border-amber-200 text-amber-950 font-medium"
                        : step.statusNote.type === "accent"
                        ? "bg-[#FAF0E6] border border-bronze-200 text-bronze-900 font-medium"
                        : step.statusNote.type === "success"
                        ? "bg-olive-50/90 border border-olive-200 text-olive-900"
                        : "bg-sand-100/80 border border-sand-200/90 text-charcoal-800"
                    }`}
                  >
                    {step.statusNote.type === "warning" ? (
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-700" />
                    ) : step.statusNote.type === "accent" ? (
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-bronze-700" />
                    ) : step.statusNote.type === "success" ? (
                      <Lock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-olive-600" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-taupe-400 mt-1 flex-shrink-0" />
                    )}
                    <span>{step.statusNote.text}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
