"use client";

import React from "react";
import { Check, Zap, Rocket, ShieldCheck } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Validate",
    price: "$1,500",
    suffix: "starting at",
    desc: "Test your idea before you invest.",
    timeline: "Delivered in 10–14 days",
    features: [
      "Landing page design & build",
      "Waitlist / email capture system",
      "Stripe pre-sell integration",
      "Basic analytics setup",
      "Mobile responsive",
      "1 round of revisions",
    ],
    cta: "Get Started",
    highlight: false,
    icon: Rocket,
  },
  {
    name: "Launch MVP",
    price: "$5,000",
    suffix: "starting at",
    desc: "Build and ship your full product.",
    timeline: "Delivered in 6–8 weeks",
    features: [
      "Full web or mobile app",
      "Auth + database architecture",
      "Core feature set built",
      "Admin panel included",
      "App Store / Play Store publishing",
      "30 days post-launch support",
    ],
    cta: "Book a Call",
    highlight: true,
    badge: "Most Popular",
    icon: Zap,
  },
  {
    name: "Scale Partner",
    price: "$2,500",
    suffix: "per month",
    desc: "Your ongoing dev partner post-launch.",
    timeline: "Cancel anytime",
    features: [
      "Monthly sprint planning",
      "Weekly Loom progress updates",
      "New features & bug fixes",
      "Performance optimization",
      "Priority response time",
      "Dedicated Slack channel",
      "Cloud infra management",
    ],
    cta: "Let's Talk",
    highlight: false,
    icon: ShieldCheck,
  },
];

import { BackgroundOrbs } from "@/components/ui/BackgroundOrbs";

export const Pricing = () => {
  const { ref, inView } = useInView();

  return (
    <section id="pricing" className="py-20 px-6 relative overflow-hidden bg-primary/[0.02]" ref={ref}>
      <BackgroundOrbs className="opacity-40" />
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div
            className={cn(
              "transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <p className="text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-4 text-center">
              Pricing & Plans
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-center">
              Transparent pricing. <br />
              <span className="text-muted-foreground/30">No surprises.</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className={cn(
                  "group relative rounded-2xl p-8 flex flex-col transition-all duration-700",
                  p.highlight
                    ? "bg-primary/[0.03] border-2 border-primary/20 shadow-2xl shadow-primary/5"
                    : "bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/20 transition-colors",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {p.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-primary rounded-full text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary/30">
                    <Zap size={12} fill="white" />
                    {p.badge}
                  </div>
                )}

                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <p className="text-muted-foreground text-[10px] font-black tracking-[0.2em] uppercase mb-1">
                    {p.suffix}
                  </p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-black text-foreground tracking-tighter">
                      {p.price}
                    </span>
                  </div>
                  <h3 className="text-foreground font-black text-2xl mb-1">{p.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed min-h-[40px]">{p.desc}</p>
                </div>

                <div className="flex items-center gap-3 mb-6 py-4 border-y border-border/50">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                    {p.timeline}
                  </span>
                </div>

                <ul className="flex flex-col gap-4 mb-10 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 group/feat">
                      <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover/feat:bg-primary transition-colors duration-300">
                        <Check size={12} className="text-primary group-hover/feat:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-muted-foreground text-sm leading-snug group-hover/feat:text-foreground transition-colors">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://calendly.com/sofolitltd/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] text-center transition-all duration-300 active:scale-[0.98] shadow-lg",
                    p.highlight
                      ? "bg-primary text-white hover:shadow-primary/30 hover:translate-y-[-2px]"
                      : "bg-muted/50 border border-border/50 hover:bg-muted text-foreground hover:border-primary/20"
                  )}
                >
                  {p.cta}
                </a>
              </div>
            );
          })}
        </div>
        
        {/* Bulk note */}
        <div 
          className={cn(
            "mt-12 p-8 rounded-2xl border border-dashed border-border/50 bg-muted/10 text-center transition-all duration-700 delay-500",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-muted-foreground text-sm italic">
            Need something custom? We also do <span className="text-foreground font-bold">fixed-price project quotes</span>. 
            Book a call and we'll give you a written estimate within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
};
