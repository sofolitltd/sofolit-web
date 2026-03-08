
"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      {/* Luminous Beams */}
      <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      <div className="absolute top-0 right-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
      
      {/* Atmospheric Mesh Gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-20" />

      <div className="container relative z-10 px-4 mx-auto text-center space-y-8 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary border-primary/20 mb-4 animate-slide-in-left">
          <Sparkles className="w-4 h-4" />
          <span>Innovating Digital Products</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight animate-fade-in-up">
          <span className="block opacity-70">From Concept</span>
          <span className="text-gradient block">Idea to Product</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground animate-fade-in-up delay-200">
          We bridge the gap between imagination and reality with premium software craftsmanship 
          and AI-driven strategies.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-fade-in-up delay-300">
          <MagneticButton className="text-lg">
            Start Your Project <ArrowRight className="w-5 h-5" />
          </MagneticButton>
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
