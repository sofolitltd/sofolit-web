"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Apex Fintech",
    category: "Web Application",
    image: "https://picsum.photos/seed/sofol2/800/600",
    hint: "dashboard ui",
  },
  {
    title: "Nova Mobile",
    category: "Mobile App",
    image: "https://picsum.photos/seed/sofol3/800/600",
    hint: "mobile app",
  },
  {
    title: "Nexus SaaS",
    category: "Desktop Platform",
    image: "https://picsum.photos/seed/sofol4/800/600",
    hint: "saas web",
  },
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-[#050505]">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Recent Work</h2>
            <p className="text-muted-foreground max-w-lg">
              Showcasing our ability to deliver high-fidelity products across various industries.
            </p>
          </div>
          <button className="text-primary font-semibold flex items-center gap-2 group">
            View All Projects <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] glass-card"
            >
              <Image 
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                data-ai-hint={project.hint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <p className="text-sm font-medium text-primary mb-2">{project.category}</p>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <button className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm font-semibold border border-white/20 hover:bg-white/20 transition-colors">
                  Case Study
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};