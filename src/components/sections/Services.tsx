
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Smartphone, Globe, Rocket, Zap, Heart, Target, Layout, MousePointer2, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "The Solo-Founder App",
    subtitle: "Launch Fast, Scale Smoothly",
    description: "You have a vision; we have the tools. We build high-performance mobile apps that turn your concept into a market-ready product. We focus on getting your first 1,000 users without the technical overhead.",
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    benefits: [
      { icon: <Zap className="w-4 h-4" />, text: "Quick to Market" },
      { icon: <Heart className="w-4 h-4" />, text: "User-First Design" },
      { icon: <Target className="w-4 h-4" />, text: "Founder-Centric" }
    ],
    features: ["MVP Development", "Cross-Platform (Flutter)", "Easy App Store Launch", "Scalable for Growth"],
    animation: "animate-slide-in-left"
  },
  {
    title: "High-Conversion Web",
    subtitle: "Your Digital Storefront & Office",
    description: "Stop losing customers to generic templates. We craft professional web platforms that turn visitors into loyal users. Optimized for performance, search engines, and your specific business goals.",
    icon: <Globe className="w-10 h-10 text-secondary" />,
    benefits: [
      { icon: <MousePointer2 className="w-4 h-4" />, text: "Built to Sell" },
      { icon: <Layout className="w-4 h-4" />, text: "Super Fast" },
      { icon: <Rocket className="w-4 h-4" />, text: "SEO Ready" }
    ],
    features: ["SEO Optimized Performance", "Custom SaaS Dashboards", "Secure Stripe Integration", "Robust Analytics"],
    animation: "animate-slide-in-right"
  }
];

export const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const CALENDLY_URL = "https://calendly.com/sofolitltd/30min";

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
    <section id="services" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <div className={cn(
          "max-w-3xl mb-16 space-y-6 text-center lg:text-left opacity-0",
          isVisible && "animate-fade-in-up"
        )}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20">
            Expert App & Web Development
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
            We Build for Those Who <br />
            <span className="text-gradient">Dream Big and Start Small.</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Enterprise-grade technical excellence designed for solo founders. We build the foundation while you build the business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <Card 
              key={idx} 
              className={cn(
                "group relative bg-card/60 dark:bg-card/40 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden transition-all duration-500 hover:border-primary/40 hover:translate-y-[-4px] opacity-0",
                isVisible && service.animation
              )}
              style={{ animationDelay: `${0.2 + idx * 0.2}s` }}
            >
              <CardContent className="p-8 md:p-12 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="p-4 rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors">
                    {service.icon}
                  </div>
                  <div className="flex gap-4">
                    {service.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex flex-col items-center gap-1">
                        <div className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center text-primary">
                          {benefit.icon}
                        </div>
                        <span className="text-[10px] font-bold uppercase text-muted-foreground text-center">
                          {benefit.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-primary font-bold uppercase tracking-widest text-xs">{service.subtitle}</p>
                  <h3 className="text-3xl font-black tracking-tight">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-border/50">
                  <a 
                    href={CALENDLY_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-foreground font-bold flex items-center gap-2 group/btn hover:text-primary transition-colors"
                  >
                    Get Started
                    <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
