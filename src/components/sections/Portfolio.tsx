
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, BadgeCheck } from "lucide-react";
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
    <section id="portfolio" ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
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
              Case Studies of <br />
              <span className="text-gradient">Strategic Engineering.</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {homeProjects.map((project, idx) => (
            <Link 
              key={idx}
              href={`/projects/${project.slug}`}
              className={cn(
                "group flex flex-col gap-8 opacity-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${0.2 + idx * 0.15}s` }}
            >
              {/* Image Container */}
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-border/50 shadow-2xl bg-muted/20">
                <Image 
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  data-ai-hint={project.imageHint}
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Category Badge on Image */}
                <div className="absolute top-6 left-6">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-md border-border/50 text-[10px] font-black uppercase tracking-widest px-4 py-1.5">
                    {project.category === 'app' ? 'Mobile App' : 'Web Platform'}
                  </Badge>
                </div>
              </div>

              {/* Content Area */}
              <div className="space-y-6 px-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-1">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-4 transition-all">
                  View Detailed Case Study <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
