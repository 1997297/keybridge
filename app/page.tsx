import React from "react";
import { Header } from "@/app/_components/site-header";
import { Footer } from "@/app/_components/site-footer";
import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { Services } from "@/components/home/services";
import { HowItWorks } from "@/components/home/how-it-works";
import { ApplicationIntro } from "@/components/home/application-intro";
import { PropertyShowcase } from "@/components/home/property-showcase";
import { TrustCredibility } from "@/components/home/trust-credibility";
import { Testimonials } from "@/components/home/testimonials";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal-900 flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <HowItWorks />
        <ApplicationIntro />
        <PropertyShowcase />
        <TrustCredibility />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
