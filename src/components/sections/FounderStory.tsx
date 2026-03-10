
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
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

  const founderImg = PlaceHolderImages.find(img => img.id === "founder-portrait");

  return (
    <section id="story" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={cn(
              "relative group opacity-0",
              isVisible && "animate-slide-in-left"
            )}>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
              <div className="relative rounded-3xl overflow-hidden aspect-[3/4] glass-card border-white/10">
                {founderImg && (
                  <Image
                    src={founderImg.imageUrl}
                    alt="Founder of Sofol IT"
                    fill
                    className="object-cover"
                    data-ai-hint={founderImg.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h4 className="text-2xl font-bold">Md Asifuzzaman Reyad</h4>
                  <p className="text-primary font-medium">Founder</p>
                </div>
              </div>
            </div>

            <div className={cn(
              "space-y-8 opacity-0",
              isVisible && "animate-slide-in-right"
            )}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-bold uppercase tracking-widest text-primary border-primary/20">
                Our Story
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                Built on a <br />
                <span className="text-gradient">Passion for Quality.</span>
              </h2>
              
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Sofol IT started with a simple observation: too many great ideas were dying in the gap between a slide deck and a working product.
                </p>
                <p>
                  I founded this agency to be the bridge. We don't just write code; we partner with founders to refine their vision, build with technical excellence, and scale their brands in a digital-first world.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-muted/30 border border-white/5 relative italic">
                <Quote className="absolute -top-4 -left-4 w-10 h-10 text-primary opacity-20" />
                <p className="text-xl font-medium text-foreground">
                  "Our mission is to empower the next generation of brands by making high-fidelity product development accessible and efficient."
                </p>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className={cn("opacity-0", isVisible && "animate-fade-in")} style={{ animationDelay: '0.8s' }}>
                  <p className="text-3xl font-black text-primary">15+</p>
                  <p className="text-sm font-bold uppercase text-muted-foreground">Projects Launched</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className={cn("opacity-0", isVisible && "animate-fade-in")} style={{ animationDelay: '1s' }}>
                  <p className="text-3xl font-black text-secondary">3+</p>
                  <p className="text-sm font-bold uppercase text-muted-foreground">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
