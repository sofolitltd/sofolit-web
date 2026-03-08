"use client";

import React from "react";
import { Smartphone, Globe, Rocket, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "Mobile App Development",
    description: "Crafting high-performance iOS and Android applications that engage users and drive brand loyalty from the first tap.",
    icon: <Smartphone className="w-12 h-12 text-primary" />,
    features: ["iOS & Android Native", "Cross-platform (React Native)", "App Store Optimization"]
  },
  {
    title: "Website & Web Platforms",
    description: "Building fast, SEO-optimized, and conversion-focused websites that turn visitors into customers and scale with your growth.",
    icon: <Globe className="w-12 h-12 text-secondary" />,
    features: ["Next.js & React", "E-commerce Solutions", "Custom SaaS Platforms"]
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            Our <span className="text-gradient">Core Services</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We help visionary entrepreneurs grow their brands by taking small ideas to live, 
            market-ready products with speed and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <Card key={idx} className="glass-card border-white/5 group hover:border-primary/30 transition-all duration-500 overflow-hidden bg-card">
              <CardContent className="p-10 space-y-6">
                <div className="p-4 rounded-2xl bg-muted/50 w-fit group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm font-medium">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-primary" />
            </div>
            <p className="font-semibold text-lg">Ready to take your brand from idea to live?</p>
          </div>
          <a href="#contact" className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:shadow-[0_0_20px_rgba(51,150,230,0.4)] transition-all">
            Launch Your Project
          </a>
        </div>
      </div>
    </section>
  );
};