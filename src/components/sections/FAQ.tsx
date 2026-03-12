"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How long does it take to build an MVP?",
    a: "Most MVPs are delivered in 6–8 weeks. Simpler projects like landing pages and validation builds take 10–14 days. We give you a precise timeline in your free discovery call.",
  },
  {
    q: "What is your pricing model?",
    a: "We charge fixed prices per project — no hourly billing, no surprise invoices. You receive a full written scope and fixed cost before we start. What we quote is what you pay.",
  },
  {
    q: "How do we communicate during the project?",
    a: "Async-first via Slack or WhatsApp. Weekly video demo calls where you see real working progress. You also get a Loom update every Friday. You'll never be left wondering what's happening.",
  },
  {
    q: "Do you work with non-technical founders?",
    a: "Yes — most of our clients are non-technical. We guide you through every technical decision in plain English and make sure you understand what's being built and why.",
  },
  {
    q: "How do we handle payments internationally?",
    a: "We accept Wise, PayPal, and bank transfer — all standard for international clients. We work on a 50% upfront, 50% on delivery structure for project work.",
  },
  {
    q: "What happens after launch?",
    a: "All projects include 30 days of free post-launch support to fix any bugs or issues. After that, you can move to our Scale Partner retainer for ongoing development.",
  },
];

import { BackgroundOrbs } from "@/components/ui/BackgroundOrbs";

export const FAQ = () => {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 px-6 bg-transparent relative overflow-hidden" ref={ref}>
      <BackgroundOrbs className="opacity-20" />
      <div className="max-w-3xl mx-auto">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-4">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Common questions.
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <div
              key={f.q}
              className={cn(
                "rounded-2xl border transition-all duration-500 overflow-hidden",
                open === i
                  ? "border-primary/20 bg-primary/5 shadow-xl shadow-primary/5"
                  : "border-border/50 bg-card/30 hover:border-border/50 hover:bg-card/50",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className={cn(
                    "font-bold text-lg transition-colors leading-snug",
                    open === i ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {f.q}
                </span>
                <span
                  className={cn(
                    "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                    open === i
                      ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  open === i ? "max-h-96 pb-8" : "max-h-0"
                )}
              >
                <div className="px-6 border-t border-border/10 pt-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
