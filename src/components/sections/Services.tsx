
"use client";

import React from "react";
import { Smartphone, Globe, Rocket, Zap, Heart, Target, Layout, MousePointer2, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "The Solo-Founder App",
    subtitle: "Launch Fast, Scale Smoothly",
    description: "You have a vision; we have the tools. We build high-quality iOS and Android apps that don't just look pretty—they work perfectly. We focus on getting your first 1,000 users without the technical headaches.",
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    benefits: [
      { icon: <Zap className="w-4 h-4" />, text: "Quick to Market" },
      { icon: <Heart className="w-4 h-4" />, text: "User-First Design" },
      { icon: <Target className="w-4 h-4" />, text: "Founder-Centric" }
    ],
    features: ["MVP Development", "Cross-Platform (iOS & Android)", "Easy App Store Launch", "Scalable for Growth"]
  },
  {
    title: "High-Conversion Web",
    subtitle: "Your Digital Storefront & Office",
    description: "Stop losing customers to slow, generic templates. We craft professional web platforms that turn visitors into loyal fans. Built for speed, search engines, and most importantly—your business goals.",
    icon: <Globe className="w-10 h-10 text-secondary" />,
    benefits: [
      { icon: <MousePointer2 className="w-4 h-4" />, text: "Built to Sell" },
      { icon: <Layout className="w-4 h-4" />, text: "Super Fast" },
      { icon: <Rocket className="w-4 h-4" />, text: "SEO Ready" }
    ],
    features: ["Professional Landing Pages", "Custom SaaS Dashboards", "E-commerce & Payments", "Simple Analytics"]
  }
];

export const Services = () => {
  const CALENDLY_URL = "https://calendly.com/sofolitltd/30min";

  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mb-16 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20">
            Founder-First Solutions
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
            We Build for Those Who <br />
            <span className="text-gradient">Dream Big and Start Small.</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            We take care of the tech so you can focus on your business. From your first MVP 
            to a market-ready product, we're your partner in growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <Card 
              key={idx} 
              className="group relative bg-card/80 dark:bg-card/40 border-border/50 shadow-xl overflow-hidden transition-all duration-500 hover:border-primary/40 hover:translate-y-[-4px]"
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
                    Learn How We Start
                    <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Strategic CTA Block */}
        <div className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-muted/30 border border-border relative overflow-hidden group">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-3 max-w-xl">
              <h4 className="text-2xl md:text-3xl font-black tracking-tight">Ready to bring your idea to life?</h4>
              <p className="text-muted-foreground">
                Don't get stuck in technical debt. Start with a foundation built by experts 
                who understand the solopreneur journey.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <a 
                href={CALENDLY_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-lg transition-all text-center flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" /> Book a Call
              </a>
              <a href="/work" className="px-8 py-4 rounded-xl border border-border bg-background hover:bg-muted transition-all font-bold text-center">
                See Our Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
