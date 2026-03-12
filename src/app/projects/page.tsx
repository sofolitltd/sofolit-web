import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { ArrowRight, Calendar } from "lucide-react";
import { projectsData } from "@/lib/projects-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'Proven ROI & Case Studies',
  description: 'Explore the high-impact digital products we\'ve built. From HIPAA-compliant health tech to complex e-commerce engines, see how we deliver results.',
};

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

      <section className="container px-4 mx-auto mb-40 space-y-40">
        {projectsData.map((item, idx) => (
          <div 
            key={idx} 
            className="group grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
          >
            {/* Project Image - Alternating Side */}
            <div className={cn(
              "lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden border border-border/50 bg-card shadow-2xl",
              idx % 2 === 1 ? "lg:order-2" : ""
            )}>
              <Image 
                src={item.imageUrl} 
                alt={item.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                data-ai-hint={item.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Floating Metrics */}
              <div className="absolute bottom-8 left-8 right-8 flex gap-4">
                {item.metrics?.map((metric, midx) => (
                  <div key={midx} className="flex-1 bg-background/60 backdrop-blur-2xl border border-white/10 p-4 rounded-xl shadow-xl">
                    <div className="text-primary font-black text-xl">{metric.value}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className={cn(
              "lg:col-span-5 space-y-10",
              idx % 2 === 1 ? "lg:order-1 text-right items-end flex flex-col" : ""
            )}>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 text-[10px] font-black uppercase tracking-[0.2em] text-primary border border-primary/20">
                Strategic {item.category === 'app' ? 'Application' : 'Web Entity'}
              </div>

              <div className="space-y-6">
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none group-hover:text-primary transition-colors">
                  {item.title}
                </h2>
                <p className="text-muted-foreground text-xl leading-relaxed font-medium">
                  {item.longDescription ? item.longDescription.split('.')[0] + '.' : item.description}
                </p>
              </div>

              <div className={cn(
                "grid grid-cols-1 gap-5",
                idx % 2 === 1 ? "text-right" : ""
              )}>
                {item.results?.map((result, ridx) => (
                  <div key={ridx} className={cn(
                    "flex items-center gap-4 text-sm font-bold text-foreground/80",
                    idx % 2 === 1 ? "flex-row-reverse" : ""
                  )}>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>{result}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link 
                  href={`/projects/${item.slug}`}
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-foreground text-background font-black hover:bg-primary transition-all group"
                >
                  FULL CASE STUDY <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
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
