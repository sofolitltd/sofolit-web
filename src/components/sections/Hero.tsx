"use client";

import React, { useEffect, useState, useRef } from "react";
import { Sparkles, Rocket, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern pt-32 pb-20"
    >
      <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      <div className="absolute top-0 right-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />

      <div className="absolute inset-0 mesh-gradient opacity-30" />

      {/* Floating Abstract Elements */}
      <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-[100px] floating" />
      <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-secondary/5 rounded-full blur-[100px] floating" style={{ animationDelay: '2s' }} />
      
      <div className="hidden lg:block absolute top-[25%] left-[15%] w-32 h-40 bg-card/20 backdrop-blur-md border border-white/10 rounded-2xl floating opacity-40 -rotate-12" style={{ animationDelay: '1s' }} />
      <div className="hidden lg:block absolute top-[40%] right-[12%] w-48 h-32 bg-card/10 backdrop-blur-md border border-white/5 rounded-2xl floating opacity-30 rotate-6" style={{ animationDelay: '3s' }} />
      <div className="hidden lg:block absolute bottom-[30%] left-[8%] w-40 h-40 bg-primary/10 backdrop-blur-3xl border border-white/10 rounded-full floating opacity-20" style={{ animationDelay: '4s' }} />

      <div className="container relative z-10 px-4 mx-auto text-center space-y-8">
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-[10px] font-black tracking-widest uppercase text-primary border-primary/20 mb-4 opacity-0",
          isVisible && "animate-slide-in-left"
        )} style={{ animationDelay: '0.1s' }}>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Ships in 8 weeks — Accepting Projects</span>
        </div>

        <div className={cn(
          "space-y-2 opacity-0",
          isVisible && "animate-fade-in-up"
        )} style={{ animationDelay: '0.3s' }}>
          <h1 className="text-4xl md:text-6xl lg:text-[7rem] font-black tracking-tight leading-[1.1] pb-4">
            <span className="block text-muted-foreground/30 text-2xl md:text-4xl lg:text-5xl mb-4">We Build</span>
            <span className="inline-block text-gradient py-2">Digital Products</span>
            <span className="block text-2xl md:text-4xl lg:text-5xl mt-4">for Early-Stage Founders</span>
          </h1>
        </div>

        <p className={cn(
          "max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground opacity-0 leading-relaxed",
          isVisible && "animate-fade-in-up"
        )} style={{ animationDelay: '0.5s' }}>
          Flutter apps, Next.js platforms, and SaaS MVPs — delivered in weeks, not months. Enterprise-level technical excellence designed for solo entrepreneurs.
        </p>

        <div className={cn(
          "flex flex-col sm:flex-row items-center justify-center gap-4 pt-12 pb-16 opacity-0",
          isVisible && "animate-fade-in-up"
        )} style={{ animationDelay: '0.7s' }}>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            <MagneticButton className="text-lg px-10 h-14">
              Book a Free Call <Rocket className="w-5 h-5 ml-2" />
            </MagneticButton>
          </a>
          <Link href="/projects" className="px-10 h-14 rounded-full border border-border flex items-center gap-2 font-bold hover:bg-muted transition-all bg-card/50 backdrop-blur-sm">
            See Our Work <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, transparent 0%, hsl(var(--background)) 100%)' }} />
        
      {/* Premium Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="w-[20px] h-[32px] rounded-full border border-foreground/10 flex justify-center p-1.5 bg-background/5 backdrop-blur-sm">
          <div className="w-0.5 h-1.5 bg-primary rounded-full animate-scroll-dot" />
        </div>
        <span className="text-[8px] font-black tracking-[0.4em] uppercase text-muted-foreground/40">SCROLL</span>
      </div>

      <style jsx global>{`
        @keyframes scroll-dot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(6px); opacity: 0; }
        }
        .animate-scroll-dot {
          animation: scroll-dot 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
