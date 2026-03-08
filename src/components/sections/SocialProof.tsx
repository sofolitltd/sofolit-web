"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

const techStack = [
  "Next.js", "TypeScript", "React Native", "Go", "Python", "PostgreSQL", 
  "AWS", "GCP", "Docker", "Kubernetes", "Redis", "Figma", "Node.js", "Unity"
];

const testimonials = [
  {
    name: "James Chen",
    role: "CTO @ Nexus",
    content: "Sofol IT transformed our vision into a scalable reality. Their attention to detail in UI/UX and backend performance is unmatched.",
    stars: 5,
  },
  {
    name: "Sarah Miller",
    role: "Founder @ NovaHealth",
    content: "Working with them was the best decision for our startup. The process was transparent, and the results exceeded expectations.",
    stars: 5,
  },
];

export const SocialProof = () => {
  return (
    <section className="py-24 bg-background">
      {/* Tech Stack Marquee */}
      <div className="mb-24 overflow-hidden border-y border-white/5 py-10 bg-white/2">
        <div className="marquee-content">
          {[...techStack, ...techStack].map((tech, idx) => (
            <span 
              key={idx}
              className="text-2xl md:text-4xl font-black mx-12 text-white/10 hover:text-primary/50 transition-colors cursor-default whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="relative p-10 rounded-3xl glass-card animate-border-trace bg-white/5"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <Quote className="w-12 h-12 text-primary/20 absolute top-8 right-8" />
              <p className="text-xl md:text-2xl font-medium mb-8 leading-relaxed italic">
                "{t.content}"
              </p>
              <div>
                <h4 className="font-bold text-lg">{t.name}</h4>
                <p className="text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};