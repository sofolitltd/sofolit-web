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
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center gap-12">
            <div className={cn(
              "relative opacity-0",
              isVisible && "animate-fade-in-up"
            )}>
              <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden bg-white border-4 border-white shadow-xl">
                <Image
                  src="/images/md-asifuzzaman-reyad.png"
                  alt="Md Asifuzzaman Reyad - Founder of Sofol IT"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className={cn(
              "space-y-8 opacity-0",
              isVisible && "animate-fade-in-up"
            )} style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20">
                Our Story
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
                Built on a <br />
                <span className="text-gradient">Passion for Quality.</span>
              </h2>
              
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                <p>
                  Sofol IT started with a simple observation: too many great ideas were dying in the gap between a vision and a working product.
                </p>
                <p>
                  I founded this agency to be the bridge. We don't just write code; we partner with founders to refine their vision, build with technical excellence, and scale their brands in a digital-first world.
                </p>
              </div>

              <div className="p-8 md:p-10 rounded-[2.5rem] bg-muted/30 border border-border/50 relative italic max-w-2xl mx-auto">
                <Quote className="absolute -top-4 -left-4 w-10 h-10 text-primary opacity-20" />
                <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                  "Our mission is to empower the next generation of brands by making high-fidelity product development accessible and efficient."
                </p>
                <div className="mt-8 not-italic">
                  <h4 className="text-xl font-black tracking-tight">Md Asifuzzaman Reyad</h4>
                  <p className="text-primary font-bold text-sm uppercase tracking-widest mt-1">Founder, Sofol IT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
