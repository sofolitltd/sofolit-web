"use client";

import React from "react";
import { Smartphone, Globe, Rocket, ShieldCheck, Zap, BarChart3, Layers, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "Mobile App Engineering",
    subtitle: "High-Performance iOS & Android Solutions",
    description: "We don't just build apps; we engineer mobile ecosystems. Our focus is on creating immersive, low-latency experiences that maintain 99.9% crash-free sessions while maximizing user retention.",
    icon: <Smartphone className="w-12 h-12 text-primary" />,
    benefits: [
      { icon: <Zap className="w-4 h-4" />, text: "Zero-latency performance" },
      { icon: <ShieldCheck className="w-4 h-4" />, text: "Enterprise-grade security" },
      { icon: <Layers className="w-4 h-4" />, text: "Scalable microservices architecture" }
    ],
    features: ["Native iOS & Android Development", "Cross-platform (React Native/Flutter)", "Biometric Auth & Secure Payments", "Real-time Data Synchronization"]
  },
  {
    title: "Web Platform Ecosystems",
    subtitle: "SEO-Optimized, Conversion-First Architecture",
    description: "Transform your digital footprint with high-velocity web platforms. Built on Next.js 15, our websites are designed for Core Web Vitals excellence, ensuring top-tier SEO rankings and seamless scalability.",
    icon: <Globe className="w-12 h-12 text-secondary" />,
    benefits: [
      { icon: <Search className="w-4 h-4" />, text: "SEO & Core Web Vitals Ready" },
      { icon: <BarChart3 className="w-4 h-4" />, text: "Conversion rate optimization" },
      { icon: <Rocket className="w-4 h-4" />, text: "Cloud-native deployment" }
    ],
    features: ["Headless CMS Integration", "Custom SaaS & Dashboard UX", "Progressive Web Apps (PWA)", "Advanced Analytics & A/B Testing"]
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-32 bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-bold uppercase tracking-widest text-primary border-primary/20">
            Enterprise Solutions
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            Digital Craftsmanship <br />
            <span className="text-gradient">Engineered for Growth.</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
            We bridge the gap between complex engineering and intuitive user experiences. 
            From startup MVPs to enterprise-scale platforms, we build the technology that 
            powers tomorrow's market leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {services.map((service, idx) => (
            <Card 
              key={idx} 
              className="group relative glass-card border-white/5 bg-card overflow-hidden transition-all duration-700 hover:border-primary/40 hover:shadow-[0_0_50px_rgba(51,150,230,0.15)]"
            >
              {/* Animated Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
              
              <CardContent className="p-12 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="p-5 rounded-3xl bg-muted/50 w-fit group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-xl border border-white/5">
                    {service.icon}
                  </div>
                  <div className="flex gap-4">
                    {service.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {benefit.icon}
                        </div>
                        <span className="text-[10px] font-bold uppercase text-muted-foreground text-center max-w-[60px]">
                          {benefit.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-primary font-bold uppercase tracking-widest text-sm">{service.subtitle}</p>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight">{service.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-sm font-semibold group/item">
                      <div className="w-2 h-2 rounded-full bg-primary group-hover/item:scale-150 transition-transform" />
                      <span className="group-hover/item:text-primary transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-border/50 flex items-center justify-between">
                  <button className="text-foreground font-bold flex items-center gap-2 group/btn">
                    Explore Solution 
                    <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:border-primary group-hover/btn:text-white transition-all">
                      <Rocket className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Strategic CTA Block */}
        <div className="mt-24 p-12 rounded-[3rem] bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-primary/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="space-y-4 max-w-xl">
              <h4 className="text-3xl md:text-4xl font-black tracking-tight">Ready for a Strategic Upgrade?</h4>
              <p className="text-muted-foreground text-lg">
                Stop settling for generic templates. Get a custom-engineered solution that aligns with your business goals and scales indefinitely.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <a 
                href="#contact" 
                className="px-10 py-5 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:shadow-[0_0_40px_rgba(51,150,230,0.5)] transition-all text-center"
              >
                Launch Your Vision
              </a>
              <button className="px-10 py-5 rounded-2xl border border-border bg-background/50 backdrop-blur-md font-bold text-lg hover:bg-muted transition-all">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
