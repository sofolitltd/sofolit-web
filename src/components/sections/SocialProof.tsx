"use client";

import React from "react";
import { Star, Quote, Activity, Users, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Afjal Hossain Hrdy",
    role: "Founder, Wellbeing Clinic",
    content: "Sofol IT transformed our medical mission into a precise digital experience. Their focus on security solved our growth bottleneck.",
    stats: "40% faster onboarding",
    icon: Activity
  },
  {
    name: "Abdullah Al Mamun",
    role: "CEO, Blood Finder",
    content: "Enterprise-grade execution on a startup budget. They delivered a product that handles high traffic flawlessly from day one.",
    stats: "10k+ active users",
    icon: Users
  },
  {
    name: "Ashikur Rahman",
    role: "Owner, Petelements BD",
    content: "Not just a dev agency—they are a growth partner. Our e-commerce conversion rates doubled within two months of launch.",
    stats: "200% Revenue growth",
    icon: Globe
  },
  {
    name: "Arif Rahman",
    role: "Abrar Shop",
    content: "The custom e-commerce app for Abrar Shop has been a huge success. Their work on the bKash integration was excellent.",
    stats: "Smooth Transactions",
    icon: Activity
  }
];

export const SocialProof = () => {
  return (
    <section id="testimonials" className="py-32 bg-transparent relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10 mb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-[10px] font-black uppercase tracking-[0.2em] text-primary border border-primary/20 mb-6">
            Partnerships that Scale
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-4">
            Trusted by Innovators.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real feedback from partners we've helped launch and scale across the globe.
          </p>
        </div>
      </div>

      {/* Animated Marquee */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee-reverse whitespace-nowrap flex gap-8 py-12 items-stretch">
          {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => {
            const Icon = t.icon;
            return (
              <div 
                key={idx}
                className="w-[380px] md:w-[450px] whitespace-normal flex-shrink-0 relative p-8 rounded-2xl bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/20 transition-all duration-500 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <Quote className="w-12 h-12 text-primary/5 absolute top-8 right-8" />
                  <p className="text-base font-medium text-foreground/90 leading-relaxed mb-8 italic relative z-10">
                    "{t.content}"
                  </p>
                </div>

                <div className="pt-6 border-t border-border/50 mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="text-primary" size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-primary font-black text-[8px] uppercase tracking-widest leading-none mb-1">Impact</span>
                        <span className="text-[10px] font-bold text-emerald-500 leading-none">{t.stats}</span>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-black text-lg text-foreground">{t.name}</h4>
                  <p className="text-muted-foreground font-bold text-[9px] uppercase tracking-[0.2em] mt-1">{t.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee-reverse {
          animation: marquee 60s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
