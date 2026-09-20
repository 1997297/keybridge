import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  UserCheck,
  FileText,
  CreditCard,
  ShieldCheck,
  Banknote,
  Key,
} from "lucide-react";

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  accent?: "bronze" | "olive";
}

const steps: StepItem[] = [
  {
    number: "01",
    title: "Connect With Agent",
    description: "Connect with your assigned Keybridge agent and view eligible properties that match your budget.",
    icon: UserCheck,
  },
  {
    number: "02",
    title: "Submit Application",
    description: "Fill out the quick online form below with your current details and preferred move-in date.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Pay $75 Fee",
    description: "Pay the standard $75 fee so our underwriting team can begin processing your file.",
    icon: CreditCard,
    accent: "bronze",
  },
  {
    number: "04",
    title: "Application Review",
    description: "We verify your income and rental history against standard property management criteria.",
    icon: ShieldCheck,
  },
  {
    number: "05",
    title: "Pay Rent",
    description: "Once approved, pay rent for your chosen months ahead before documents and keys are released.",
    icon: Banknote,
    accent: "bronze",
  },
  {
    number: "06",
    title: "Receive Documents & Keys",
    description: "Sign your finalized lease agreement and receive your documents and keys.",
    icon: Key,
    accent: "olive",
  },
];

export function HowItWorks() {
  return (
    <section
      id="processes"
      className="py-12 md:py-16 bg-white border-b border-sand-300/80 relative overflow-hidden"
    >
      {/* Anchor for backward-compatible links */}
      <span id="how-it-works" className="absolute -top-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="bronze">Rental Process</Badge>
            <span className="text-xs font-sans tracking-architectural uppercase text-taupe-500 font-medium">
              Processes
            </span>
          </div>

          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-charcoal-900 leading-tight">
            Our 6-Step Process
          </h2>

          <p className="font-sans text-sm sm:text-base text-taupe-600 leading-relaxed">
            From viewing eligible properties to picking up your keys, here is how each step works.
          </p>
        </div>

        {/* Compact 6-Step Cards Grid (3 columns on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isBronze = step.accent === "bronze";
            const isOlive = step.accent === "olive";

            return (
              <div
                key={idx}
                className={`bg-ivory-100/70 border rounded-2xl p-5 transition-all duration-200 hover:shadow-card hover:-translate-y-0.5 group ${
                  isBronze
                    ? "border-bronze-300 bg-white shadow-subtle ring-1 ring-bronze-400/20"
                    : isOlive
                    ? "border-olive-300 bg-white shadow-subtle ring-1 ring-olive-400/20"
                    : "border-sand-300 bg-white hover:border-sand-400"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xl font-bold text-taupe-400 group-hover:text-charcoal-900 transition-colors">
                    {step.number}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isBronze
                        ? "bg-bronze-50 text-bronze-700 border border-bronze-200"
                        : isOlive
                        ? "bg-olive-50 text-olive-700 border border-olive-200"
                        : "bg-sand-100 text-charcoal-800 border border-sand-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-headline text-base font-semibold text-charcoal-900 mb-1.5">
                  {step.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-taupe-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
