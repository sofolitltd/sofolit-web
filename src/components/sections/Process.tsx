"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    week: "Week 1",
    icon: Search,
    title: "Discovery",
    desc: "We dissect your idea, define the MVP scope, and build a technical blueprint. No assumptions — just clarity.",
  },
  {
    week: "Week 2",
    icon: PenTool,
    title: "Design",
    desc: "Figma wireframes → high-fidelity UI. You approve every screen before we write a single line of code.",
  },
  {
    week: "Week 3–7",
    icon: Code2,
    title: "Build",
    desc: "Agile sprints. Weekly demo calls. You see real, working progress every 7 days — not a final reveal.",
  },
  {
    week: "Week 8",
    icon: Rocket,
    title: "Launch",
    desc: "Deployment, App Store publishing, handover docs, and 30 days of post-launch support included.",
  },
];

export const Process = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-20 bg-secondary/[0.03] border-y border-border/50 relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className={cn(
          "text-left mb-20 opacity-0",
          isVisible && "animate-fade-in-up"
        )}>
          <p className="text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-4">
            How We Work
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
            Battle-tested process.
            <br />
            <span className="text-muted-foreground/30">Zero guesswork.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-[5.5rem] left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={idx}
                  className={cn(
                    "relative group opacity-0",
                    isVisible && "animate-fade-in-up"
                  )}
                  style={{ animationDelay: `${0.2 + idx * 0.15}s` }}
                >
                  {/* Step number backdrop */}
                  <div className="absolute -top-12 -left-6 text-9xl font-black text-muted-foreground/5 select-none pointer-events-none transition-all duration-700 group-hover:text-primary/10 group-hover:-translate-y-2">
                    {idx + 1}
                  </div>

                  <div className="relative z-10 flex flex-col items-start">
                    <div className="w-16 h-16 rounded-2xl bg-card border border-border/50 flex items-center justify-center mb-6 shadow-xl shadow-primary/5 group-hover:border-primary/30 transition-all duration-500 group-hover:bg-primary/5 group-hover:scale-110">
                      <Icon size={24} className="text-primary" />
                    </div>
                    
                    <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-2 px-3 py-1 bg-primary/10 rounded-full">
                      {step.week}
                    </p>
                    
                    <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
