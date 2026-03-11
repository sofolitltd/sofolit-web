
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { ArrowRight, Calendar } from "lucide-react";
import { projectsData } from "@/lib/projects-data";
import { Badge } from "@/components/ui/badge";

export default function ProjectsPage() {
  const CALENDLY_URL = "https://calendly.com/sofolitltd/30min";

  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container px-4 mx-auto text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          Our <span className="text-gradient">Legacy</span> of Success
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
          Discover how we've helped solo founders and startups transform ideas into market-leading digital products.
        </p>
      </div>

      <section className="container px-4 mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projectsData.map((item, idx) => (
            <Link 
              key={idx} 
              href={`/projects/${item.slug}`} 
              className="group flex flex-col bg-card/30 backdrop-blur-md rounded-[2.5rem] border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted/20">
                <Image 
                  src={item.imageUrl} 
                  alt={item.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  data-ai-hint={item.imageHint}
                />
                <div className="absolute top-6 left-6">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-md border-border/50 text-[10px] font-black uppercase tracking-widest px-4 py-1.5">
                    {item.category === 'app' ? 'Mobile App' : 'Web Platform'}
                  </Badge>
                </div>
              </div>
              
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.slice(0, 4).map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-primary/70 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-4 mb-8">
                  <h2 className="text-3xl font-black tracking-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="mt-auto pt-8 border-t border-border/30 flex items-center justify-between">
                  <span className="text-sm font-bold flex items-center gap-2 text-primary group-hover:gap-4 transition-all">
                    Project Details <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Your project could be next.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href={CALENDLY_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-12 py-5 rounded-full bg-white text-primary font-black text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2 mx-auto sm:mx-0"
            >
              <Calendar className="w-6 h-6" /> Book a Call
            </a>
            <Link href="/services" className="px-12 py-5 rounded-full border border-white/30 bg-transparent font-black text-lg hover:bg-white/10 transition-all flex items-center justify-center">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
