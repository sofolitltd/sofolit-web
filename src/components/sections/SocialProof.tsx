
"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

const techStack = [
  "Flutter", "Firebase", "AdMob", "Play Console", "FCM Notification", 
  "Riverpod", "Next.js", "Vercel", "Docker", "VPS", "Go", 
  "E-commerce", "Health App", "HRM", "Community App"
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
    <section className="py-24 bg-background overflow-hidden">
      {/* Tech Stack & Expertise Marquee */}
      <div className="mb-24 border-y border-border py-12 bg-muted/10 relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="marquee-content flex whitespace-nowrap">
          {[...techStack, ...techStack, ...techStack].map((tech, idx) => (
            <span 
              key={idx}
              className="text-2xl md:text-5xl font-black mx-12 text-muted-foreground/30 hover:text-primary transition-all duration-500 cursor-default select-none tracking-tighter uppercase"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Trusted by Innovators</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Don't just take our word for it. Here is what our partners have to say about working with Sofol IT.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="relative p-10 rounded-3xl glass-card animate-border-trace bg-card group hover:bg-card/60 transition-colors"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <Quote className="w-16 h-16 text-primary/5 absolute top-8 right-8 group-hover:text-primary/10 transition-colors" />
              <p className="text-xl md:text-2xl font-medium mb-8 leading-relaxed italic relative z-10">
                "{t.content}"
              </p>
              <div>
                <h4 className="font-bold text-lg">{t.name}</h4>
                <p className="text-muted-foreground text-sm font-medium">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
