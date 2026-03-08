
"use client";

import React from "react";
import { Sparkles, Calendar } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const Hero = () => {
  const CALENDLY_URL = "https://calendly.com/sofolitltd/30min";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      {/* Luminous Beams */}
      <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      <div className="absolute top-0 right-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
      
      {/* Atmospheric Mesh Gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-20" />

      <div className="container relative z-10 px-4 mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary border-primary/20 mb-4 animate-slide-in-left opacity-0" style={{ animationDelay: '0.1s' }}>
          <Sparkles className="w-4 h-4" />
          <span>Innovating Digital Products</span>
        </div>
        
        <h1 className="text-6xl md:text-[7.5rem] font-black tracking-tight leading-[0.9] animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
          <span className="block text-muted-foreground/40 mb-2">From Concept</span>
          <span className="block text-primary">Idea to Product</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s' }}>
          We bridge the gap between imagination and reality with premium software craftsmanship 
          and AI-driven strategies.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.7s' }}>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            <MagneticButton className="text-lg">
              Book a Call <Calendar className="w-5 h-5 ml-1" />
            </MagneticButton>
          </a>
          <button className="px-8 py-3 rounded-full font-semibold border border-input hover:bg-muted transition-colors">
            View Case Studies
          </button>
        </div>
      </div>

      {/* Radial Gradient Mask */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent to-background" 
           style={{ background: 'radial-gradient(circle at center, transparent 0%, hsl(var(--background)) 100%)' }} />
    </section>
  );
};
