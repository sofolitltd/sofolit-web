"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundOrbsProps {
  className?: string;
  count?: number;
}

export const BackgroundOrbs = ({ className, count = 3 }: BackgroundOrbsProps) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none -z-10", className)}>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[20%] right-[-5%] w-[35%] h-[35%] bg-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      {count > 2 && (
        <div className="absolute top-[40%] left-[20%] w-[25%] h-[25%] bg-primary/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '4s' }} />
      )}
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none contrast-150 brightness-100" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </div>
  );
};
