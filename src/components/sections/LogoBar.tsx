"use client";

import React from "react";
import { 
  Smile, 
  ShieldCheck, 
  Rocket, 
  Zap, 
  CheckCircle2, 
  Sparkles,
  Command,
  Cpu,
  Globe,
  Codesandbox
} from "lucide-react";

const logos = [
  { name: "Blood Finder", icon: Codesandbox },
  { name: "Wellbeing Clinic", icon: ShieldCheck },
  { name: "Abrar Shop", icon: Globe },
  { name: "Campus Asst", icon: Command },
  { name: "Saif Academy", icon: Cpu },
  { name: "The Forge", icon: Zap },
  { name: "Petelements", icon: Sparkles },
  { name: "Priyo Banskhali", icon: CheckCircle2 },
];

export const LogoBar = () => {
  return (
    <section className="py-16 border-y border-border/30 bg-muted/2 relative overflow-hidden">
      <p className="text-center text-muted-foreground/50 text-[9px] tracking-[0.6em] uppercase font-medium mb-10">
        Trusted by Founders Worldwide
      </p>
      
      <div className="relative group overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-background after:to-transparent">
        <div className="flex animate-marquee gap-16 whitespace-nowrap">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-muted-foreground/40 hover:text-primary transition-all duration-300 group/logo"
            >
              <logo.icon size={22} className="group-hover/logo:scale-110 transition-transform" />
              <span className="text-sm font-black uppercase tracking-[0.2em]">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
