"use client";

import React, { useEffect, useRef, useState } from "react";
import { Lightbulb, Target, Palette, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Concept",
    desc: "We dive deep into your vision, identifying core values and market gaps.",
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    color: "from-blue-500/20",
  },
  {
    title: "Strategy",
    desc: "Mapping out the roadmap with precision and data-driven insights.",
    icon: <Target className="w-8 h-8 text-secondary" />,
    color: "from-cyan-500/20",
  },
  {
    title: "Design",
    desc: "Crafting intuitive, world-class user interfaces and experiences.",
    icon: <Palette className="w-8 h-8 text-indigo-500" />,
    color: "from-indigo-500/20",
  },
  {
    title: "Code",
    desc: "Building scalable, robust solutions using bleeding-edge technology.",
    icon: <Code2 className="w-8 h-8 text-violet-500" />,
    color: "from-violet-500/20",
  },
];

export const Process = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className={cn(
          "text-center mb-16 space-y-4 opacity-0",
          isVisible && "animate-fade-in-up"
        )}>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Guided Journey</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our systematic approach ensures every project is delivered with excellence and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className={cn(
                "group relative glass-card p-8 rounded-2xl hover:bg-white/5 transition-all duration-500 overflow-hidden opacity-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${step.color} to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700`} />
              
              <div className="mb-6 transform group-hover:-translate-y-1 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.desc}
              </p>
              
              <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                {React.cloneElement(step.icon as React.ReactElement, { className: "w-32 h-32" })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};