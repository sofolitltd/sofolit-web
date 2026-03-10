"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { projectsData } from "@/lib/projects-data";

export const SocialProof = () => {
  // Use actual project titles for the marquee
  const projectTitles = projectsData.map(p => p.title);

  const testimonials = [
    {
      name: "Afjal Hossain Hrody",
      role: "Wellbeing Clinic",
      content: "The mental health and wellbeing platform transformed how we manage clinic psychology support. The cross-platform accessibility is outstanding.",
      stars: 5,
    },
    {
      name: "Abdullah Al Mamun",
      role: "Blood Finder App",
      content: "A life-saving application that connects donors with those in need instantly. The real-time notification system is perfectly implemented.",
      stars: 5,
    },
    {
      name: "Abdullah Omer Himel",
      role: "The Forge",
      content: "Our new portfolio site is stunning. The performance and CMS integration make updating our work a breeze. Highly professional result.",
      stars: 5,
    },
    {
      name: "Ashikur Rahman Ashik",
      role: "Petelements BD",
      content: "The e-commerce experience is seamless. Our pet supply business saw immediate growth after launching the custom web shop.",
      stars: 5,
    },
    {
      name: "Arif Rahman",
      role: "Abrar Shop",
      content: "Robust single-vendor e-commerce with flawless bKash integration. The state management and performance are top-tier.",
      stars: 5,
    },
    {
      name: "Shahriar Rahman",
      role: "Priyo Banskhali",
      content: "The community app has brought residents together. Local news, events, and business directories are all managed perfectly.",
      stars: 5,
    },
  ];

  return (
    <section className="py-24 bg-background overflow-hidden">
      {/* Slow Horizontal Marquee */}
      <div className="mb-24 border-y border-border py-12 bg-muted/10 relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="marquee-content-reverse flex whitespace-nowrap">
          {/* Duplicate content for seamless loop */}
          {[...projectTitles, ...projectTitles, ...projectTitles, ...projectTitles].map((title, idx) => (
            <span 
              key={idx}
              className="text-2xl md:text-5xl font-black mx-12 text-muted-foreground/30 hover:text-primary transition-all duration-500 cursor-default select-none tracking-tighter uppercase"
            >
              {title}
            </span>
          ))}
        </div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Trusted by Innovators</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real feedback from partners we've helped launch and scale across the globe.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <p className="text-lg font-medium mb-8 leading-relaxed italic relative z-10">
                "{t.content}"
              </p>
              <div>
                <h4 className="font-bold text-lg">{t.name}</h4>
                <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
