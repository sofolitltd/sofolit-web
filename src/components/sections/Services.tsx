"use client";

import React, { useEffect, useRef, useState } from "react";
import { Smartphone, Globe, Layers, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Cross-platform Flutter apps for iOS and Android. From MVP to App Store — built for your first 1,000 users with performance and polish.",
    tags: ["Flutter", "Firebase", "App Store", "Play Store"],
    accent: "hsl(var(--primary))",
  },
  {
    icon: Globe,
    title: "Web App & SaaS Development",
    desc: "High-performance Next.js web apps, SaaS dashboards, and landing pages that convert visitors into paying customers.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Vercel"],
    accent: "hsl(var(--secondary))",
  },
  {
    icon: Layers,
    title: "Product Design & Strategy",
    desc: "End-to-end Figma design, UX strategy, and technical architecture — every decision made before a single line of code is written.",
    tags: ["Figma", "UX Research", "System Design", "Prototyping"],
    accent: "hsl(var(--primary))",
  },
];

import { BackgroundOrbs } from "@/components/ui/BackgroundOrbs";

export const Services = () => {
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
    <section id="services" ref={sectionRef} className="py-20 bg-transparent relative overflow-hidden">
      <BackgroundOrbs className="opacity-30" />
      <div className="container px-4 mx-auto">
        <div
          className={cn(
            "mb-16 transition-all duration-700 opacity-0",
            isVisible && "animate-fade-in-up"
          )}
        >
          <p className="text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-4">
            What We Build
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Full-stack expertise,
            <br />
            <span className="text-muted-foreground/30">startup speed.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={cn(
                  "group relative p-8 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl hover:bg-card/60 hover:border-primary/20 transition-all duration-500 cursor-default opacity-0",
                  isVisible && "animate-fade-in-up"
                )}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(400px at 50% 0%, ${s.accent}10, transparent 70%)`,
                  }}
                />

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-border/50 bg-background shadow-xl shadow-primary/5 group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500"
                >
                  <Icon size={24} className="text-primary" />
                </div>

                <h3 className="text-foreground font-black text-2xl mb-4 leading-tight group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  {s.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-border/50 text-muted-foreground/60 bg-muted/30 group-hover:border-primary/10 group-hover:text-primary/70 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowUpRight size={20} className="text-primary" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
