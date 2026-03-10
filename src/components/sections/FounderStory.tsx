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
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className={cn(
              "relative flex-shrink-0 opacity-0",
              isVisible && "animate-slide-in-left"
            )}>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full" />
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden bg-white border-[8px] border-background shadow-2xl">
                <Image
                  src="/images/md-asifuzzaman-reyad.png"
                  alt="Md Asifuzzaman Reyad - Founder of Sofol IT"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className={cn(
              "flex-1 space-y-8 text-center lg:text-left opacity-0",
              isVisible && "animate-slide-in-right"
            )}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-bold uppercase tracking-widest text-primary border-primary/20">
                Our Story
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
                Built on a <br />
                <span className="text-gradient">Passion for Quality.</span>
              </h2>
              
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed max-w-2xl">
                <p>
                  Sofol IT started with a simple observation: too many great ideas were dying in the gap between a slide deck and a working product.
                </p>
                <p>
                  I founded this agency to be the bridge. We don't just write code; we partner with founders to refine their vision, build with technical excellence, and scale their brands in a digital-first world.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-muted/30 border border-white/5 relative italic max-w-2xl mx-auto lg:mx-0">
                <Quote className="absolute -top-4 -left-4 w-10 h-10 text-primary opacity-20" />
                <p className="text-xl font-medium text-foreground">
                  "Our mission is to empower the next generation of brands by making high-fidelity product development accessible and efficient."
                </p>
                <div className="mt-6 not-italic">
                  <h4 className="text-lg font-bold">Md Asifuzzaman Reyad</h4>
                  <p className="text-primary font-medium text-sm">Founder, Sofol IT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
