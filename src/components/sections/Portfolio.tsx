
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Apex Fintech",
    category: "Web Application",
    image: "https://picsum.photos/seed/sofol2/800/600",
    hint: "dashboard ui",
    slug: "apex-fintech",
  },
  {
    title: "Nova Mobile",
    category: "Mobile App",
    image: "https://picsum.photos/seed/sofol3/800/600",
    hint: "mobile app",
    slug: "nova-health",
  },
  {
    title: "Nexus SaaS",
    category: "Desktop Platform",
    image: "https://picsum.photos/seed/sofol4/800/600",
    hint: "saas web",
    slug: "nexus-saas",
  },
  {
    title: "Community Connect",
    category: "Social Platform",
    image: "https://picsum.photos/seed/sofol5/800/600",
    hint: "community app",
    slug: "community-connect",
  },
];

export const Portfolio = () => {
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
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className={cn(
          "flex flex-col md:flex-row justify-between items-end mb-16 gap-6 opacity-0",
          isVisible && "animate-fade-in-up"
        )}>
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Recent Projects</h2>
            <p className="text-muted-foreground max-w-lg">
              Showcasing our ability to deliver high-fidelity products across various industries.
            </p>
          </div>
          <Link href="/projects" className="text-primary font-bold flex items-center gap-2 group">
            View All Projects <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <Link 
              key={idx}
              href={`/projects/${project.slug}`}
              className={cn(
                "group relative rounded-[2.5rem] overflow-hidden aspect-video glass-card opacity-0 block border border-border/50",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
            >
              <Image 
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                data-ai-hint={project.hint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-100 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 p-10 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <p className="text-sm font-black text-primary uppercase tracking-widest mb-2">{project.category}</p>
                <h3 className="text-3xl font-black">{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
