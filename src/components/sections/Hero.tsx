"use client";

import React, { useEffect, useState, useRef } from "react";
import { Sparkles, Rocket, ChevronRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Hero = () => {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern"
    >
      {/* Luminous Beams */}
      <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      <div className="absolute top-0 right-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
      
      {/* Atmospheric Mesh Gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-20" />

      <div className="container relative z-10 px-4 mx-auto text-center space-y-8">
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary border-primary/20 mb-4 opacity-0",
          isVisible && "animate-slide-in-left"
        )} style={{ animationDelay: '0.1s' }}>
          <Sparkles className="w-4 h-4" />
          <span>Transforming Vision into Value</span>
        </div>
        
        <h1 className={cn(
          "text-6xl md:text-[7.5rem] font-black tracking-tight leading-[0.9] opacity-0",
          isVisible && "animate-fade-in-up"
        )} style={{ animationDelay: '0.3s' }}>
          <span className="block text-muted-foreground/30 mb-2">From Concept to</span>
          <span className="block text-gradient">Market Reality</span>
        </h1>
        
        <p className={cn(
          "max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground opacity-0",
          isVisible && "animate-fade-in-up"
        )} style={{ animationDelay: '0.5s' }}>
          Elite software engineering for founders who demand excellence. We bridge the gap between imagination and reality with premium software craftsmanship.
        </p>

        <div className={cn(
          "flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 opacity-0",
          isVisible && "animate-fade-in-up"
        )} style={{ animationDelay: '0.7s' }}>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            <MagneticButton className="text-lg px-10 h-14">
              Start Your Journey <Rocket className="w-5 h-5 ml-2" />
            </MagneticButton>
          </a>
          <Link href="#portfolio" scroll={true}>
            <button className="px-10 h-14 rounded-full font-bold border border-input hover:bg-muted transition-all flex items-center gap-2 group">
              View Case Studies <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>

      {/* Radial Gradient Mask */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent to-background" 
           style={{ background: 'radial-gradient(circle at center, transparent 0%, hsl(var(--background)) 100%)' }} />
    </section>
  );
};
