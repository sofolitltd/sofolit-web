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
            {/* Image Column - Large Portrait */}
            <div className={cn(
              "lg:col-span-5 flex justify-center lg:justify-start opacity-0",
              isVisible && "animate-slide-in-left"
            )}>
              <div className="relative group w-full">
                <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full opacity-50" />
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white border-8 border-white shadow-2xl">
                  <Image
                    src="/images/md-asifuzzaman-reyad.png"
                    alt="Md Asifuzzaman Reyad - Founder of Sofol IT"
                    fill
                    className="object-cover"
                  />
                  {/* Premium Identity Overlay */}
                  <div className="absolute bottom-6 left-6 p-8 glass-card bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl transition-transform duration-500 group-hover:scale-[1.02] max-w-[280px]">
                    <h4 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Md Asifuzzaman Reyad</h4>
                    <p className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] mt-2">Founder, Sofol IT</p>
                  </div>
                </div>
                {/* Floating availability badge */}
                <div className="absolute -bottom-4 -right-4 bg-background border border-border shadow-2xl rounded-2xl px-5 py-3 flex items-center gap-3 z-20">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-foreground text-xs font-bold uppercase tracking-widest">
                    Available for Projects
                  </span>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className={cn(
              "lg:col-span-7 space-y-8 text-center lg:text-left opacity-0",
              isVisible && "animate-slide-in-right"
            )} style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20">
                Founder Story
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-tight">
                Built on a <br />
                <span className="text-gradient">Passion for Quality.</span>
              </h2>
              
              <div className="space-y-6 text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <p>
                  Sofol IT started with a simple observation: too many great ideas were dying in the gap between a vision and a working product.
                </p>
                <p>
                  I don't just write code; I partner with founders to refine their vision, build with technical excellence, and scale their brands in a digital-first world.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 justify-center lg:justify-start">
                <div className="group/video relative aspect-video w-full max-w-[320px] rounded-2xl overflow-hidden border border-border/50 shadow-2xl transition-all hover:scale-[1.05] hover:border-primary/50 cursor-pointer">
                  <Image
                    src="/images/latest-demo-thumbnail.jpg"
                    alt="Latest Product Demo"
                    fill
                    className="object-cover opacity-50 grayscale group-hover/video:grayscale-0 group-hover/video:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover/video:bg-transparent transition-colors">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover/video:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">Watch Recent Demo</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-sm font-bold text-foreground">"Wait, let me show you..."</p>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
                    Quick 1-min video walkthrough of our latest build for a US-based SaaS founder.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
