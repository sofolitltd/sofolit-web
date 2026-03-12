"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Clock, FileText } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const stats = [
  { value: 8, suffix: " Wks", label: "Average MVP Delivery" },
  { value: 15, suffix: "+", label: "Products Shipped" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 4, suffix: "", label: "Countries Served" },
];

const bullets = [
  {
    icon: ShieldCheck,
    title: "Senior-level engineering at 40–60% less",
    desc: "Than US/UK agencies — without compromising on quality, communication, or delivery speed.",
  },
  {
    icon: Clock,
    title: "Async-first workflow",
    desc: "Daily updates, weekly demos. You're never left wondering what's happening with your project.",
  },
  {
    icon: FileText,
    title: "Fixed-price contracts",
    desc: "You know the full cost before we start. No hourly billing. No surprise invoices.",
  },
];

function Counter({
  target,
  suffix,
  run,
}: {
  target: number;
  suffix: string;
  run: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!run) return;
    const duration = 1500;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;
    const t = setInterval(() => {
      step++;
      setCount(Math.round((target * step) / steps));
      if (step >= steps) clearInterval(t);
    }, interval);
    return () => clearInterval(t);
  }, [run, target]);

  return (
    <span className="text-4xl font-black text-foreground">
      {count}
      {suffix}
    </span>
  );
}

import { BackgroundOrbs } from "@/components/ui/BackgroundOrbs";

export const WhyUs = () => {
  const { ref, inView } = useInView();

  return (
    <section id="why-us" className="py-20 px-6 bg-transparent relative overflow-hidden" ref={ref}>
      <BackgroundOrbs className="opacity-20" />
      <div className="max-w-7xl mx-auto">
        <div
          className={cn(
            "mb-16 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-4">
            Why Sofol IT
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            The honest advantage.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — bullets */}
          <div className="flex flex-col gap-8">
            {bullets.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className={cn(
                    "flex gap-6 transition-all duration-700",
                    inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  )}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-primary/5">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-black text-lg mb-2">{b.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              );
            })}

            {/* Honest note */}
            <div
              className={cn(
                "mt-4 p-8 rounded-2xl border border-border/50 bg-muted/30 transition-all duration-700 delay-500",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              <p className="text-muted-foreground text-sm leading-relaxed">
                <span className="text-foreground font-bold italic">
                  Yes, we're based in Dhaka, Bangladesh.
                </span>{" "}
                That means you get world-class engineering at a fraction of
                Western agency rates — with zero compromise on quality or
                communication. We work async-first so timezone is never a problem.
              </p>
            </div>
          </div>

          {/* Right — stats grid */}
          <div
            className={cn(
              "grid grid-cols-2 gap-6 transition-all duration-700 delay-200",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="p-10 rounded-2xl bg-card border border-border/50 flex flex-col gap-3 shadow-2xl shadow-primary/5 hover:border-primary/20 transition-colors group"
              >
                <Counter target={s.value} suffix={s.suffix} run={inView} />
                <p className="text-muted-foreground text-xs font-black uppercase tracking-widest group-hover:text-primary transition-colors">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
