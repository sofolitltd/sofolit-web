
"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { projectsData } from "@/lib/projects-data";

export const SocialProof = () => {
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

  const projectNames = projectsData.map(p => p.title);

  return (
    <section className="py-24 bg-background overflow-hidden">
      {/* Project Names Marquee (Social Proof Strip) */}
      <div className="border-y border-border/50 py-10 mb-24 bg-muted/20 relative">
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="marquee-content flex gap-12 items-center">
          {[...projectNames, ...projectNames, ...projectNames].map((name, idx) => (
            <span 
              key={idx} 
              className="text-2xl md:text-4xl font-black text-muted-foreground/30 whitespace-nowrap uppercase tracking-widest hover:text-primary transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="container px-4 mx-auto mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 mb-6">
          Client Success
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Trusted by Innovators</h2>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
          Real feedback from partners we've helped launch and scale.
        </p>
      </div>
      
      {/* Testimonials Marquee */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="marquee-content-reverse flex gap-8 py-10" style={{ animationDuration: '80s' }}>
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div 
              key={idx}
              className="w-[400px] md:w-[500px] flex-shrink-0 relative p-10 rounded-[2.5rem] glass-card animate-border-trace bg-card group hover:bg-card/60 transition-colors shadow-2xl"
            >
              <div className="flex gap-1 mb-8">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <Quote className="w-20 h-20 text-primary/5 absolute top-10 right-10 group-hover:text-primary/10 transition-colors" />
              <p className="text-xl font-medium mb-10 leading-relaxed italic relative z-10 text-foreground/90">
                "{t.content}"
              </p>
              <div className="pt-8 border-t border-border/50">
                <h4 className="font-black text-xl text-foreground">{t.name}</h4>
                <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
