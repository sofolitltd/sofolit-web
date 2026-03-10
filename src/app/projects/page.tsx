"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { ExternalLink, ArrowRight, Star, Calendar } from "lucide-react";
import { projectsData } from "@/lib/projects-data";

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
            <Link key={idx} href={`/projects/${item.slug}`} className="group space-y-6 block outline-none">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-card border-white/5 shadow-2xl">
                <Image 
                  src={item.imageUrl} 
                  alt={item.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  data-ai-hint={item.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <div className="flex items-center gap-2 text-white font-bold bg-primary px-6 py-3 rounded-full hover:bg-primary/90 transition-colors">
                    View Project Details <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 px-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-primary font-bold uppercase tracking-widest text-xs mb-1">{item.category}</p>
                    <h2 className="text-3xl font-black tracking-tight group-hover:text-primary transition-colors">{item.title}</h2>
                  </div>
                  <div className="flex gap-2">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-muted text-[10px] font-bold uppercase border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
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
