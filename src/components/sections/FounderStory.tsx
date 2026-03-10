"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export const FounderStory = () => {
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
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Image Column */}
            <div className={cn(
              "lg:col-span-5 flex justify-center lg:justify-start opacity-0",
              isVisible && "animate-slide-in-left"
            )}>
              <div className="relative group w-full max-w-md">
                <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full opacity-50" />
                <div className="relative aspect-[4/5] w-full rounded-[3rem] overflow-hidden bg-white border-8 border-white shadow-2xl">
                  <Image
                    src="/images/md-asifuzzaman-reyad.png"
                    alt="Md Asifuzzaman Reyad - Founder of Sofol IT"
                    fill
                    className="object-cover"
                  />
                  {/* Premium Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 glass-card bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                    <h4 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Md Asifuzzaman Reyad</h4>
                    <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1">Founder, Sofol IT</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className={cn(
              "lg:col-span-7 space-y-8 text-center lg:text-left opacity-0",
              isVisible && "animate-slide-in-right"
            )} style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20">
                Our Story
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
                Built on a <br />
                <span className="text-gradient">Passion for Quality.</span>
              </h2>
              
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <p>
                  Sofol IT started with a simple observation: too many great ideas were dying in the gap between a vision and a working product.
                </p>
                <p>
                  We don't just write code; we partner with founders to refine their vision, build with technical excellence, and scale their brands in a digital-first world.
                </p>
              </div>

              <div className="p-8 md:p-10 rounded-[2.5rem] bg-muted/30 border border-border/50 relative italic max-w-2xl mx-auto lg:mx-0">
                <Quote className="absolute -top-4 -left-4 w-10 h-10 text-primary opacity-20" />
                <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                  "Our mission is to empower the next generation of brands by making high-fidelity product development accessible and efficient."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
