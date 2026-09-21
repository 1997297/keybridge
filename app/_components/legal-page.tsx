import React, { ReactNode } from "react";
import { ArrowLeft, FileCheck2 } from "lucide-react";
import { Header } from "@/app/_components/site-header";
import { Footer } from "@/app/_components/site-footer";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  summary: string;
  children: ReactNode;
}

export function LegalPage({ eyebrow, title, summary, children }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-16">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-architectural text-taupe-600 hover:text-bronze-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </a>

          <article className="mt-7 bg-white border border-sand-300 rounded-3xl shadow-card px-6 py-8 sm:px-10 sm:py-11 lg:px-12">
            <header className="pb-8 border-b border-sand-200">
              <p className="text-xs font-mono uppercase tracking-architectural text-bronze-700 font-semibold">
                {eyebrow}
              </p>
              <h1 className="mt-3 font-headline text-4xl sm:text-5xl font-semibold tracking-tight text-charcoal-900">
                {title}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-taupe-600 leading-7">
                {summary}
              </p>

              <div
                role="note"
                className="mt-6 flex items-start gap-3 rounded-xl border border-bronze-200 bg-bronze-50/70 px-4 py-3.5 text-sm text-charcoal-800"
              >
                <FileCheck2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-bronze-700" />
                <p className="leading-6">
                  <strong className="font-semibold">Draft for legal review.</strong>{" "}
                  This content must be reviewed and confirmed by Keybridge&apos;s legal counsel before launch.
                </p>
              </div>
            </header>

            <div className="pt-8 space-y-9 text-sm sm:text-[15px] text-taupe-700 leading-7">
              {children}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-charcoal-900">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export const legalListClasses = "list-disc space-y-2 pl-5 marker:text-bronze-600";
