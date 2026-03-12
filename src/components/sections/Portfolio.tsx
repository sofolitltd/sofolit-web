"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { projectsData } from "@/lib/projects-data";
import { Badge } from "@/components/ui/badge";

export const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const homeProjects = projectsData.slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 bg-secondary/[0.03] border-y border-border/50 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className={cn(
          "flex flex-col md:flex-row justify-between items-end mb-20 gap-8 opacity-0",
          isVisible && "animate-fade-in-up"
        )}>
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20">
              Selected Works
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Products we've shipped. <br />
              <span className="text-muted-foreground/30">Real results.</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              We don't just build apps; we architect digital solutions that drive real-world business value for solo founders.
            </p>
          </div>
          <Link href="/projects" className="group flex items-center gap-3 text-lg font-bold text-primary hover:text-primary/80 transition-all">
            Explore All Projects 
            <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ExternalLink className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {homeProjects.map((project, idx) => (
            <Link 
              key={idx}
              href={`/projects/${project.slug}`}
              className={cn(
                "group relative bg-card/40 backdrop-blur-xl rounded-2xl border border-border/50 p-4 pb-8 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] hover:translate-y-[-4px] opacity-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
            >
              {/* Framed Image */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-muted/20 mb-8 mt-1 mx-1">
                <Image 
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  data-ai-hint={project.imageHint}
                />
              </div>
              
              {/* Content Section */}
              <div className="px-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black tracking-tight group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-4">
                      {project.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary group-hover:gap-4 transition-all">
                  VIEW CASE STUDY <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
