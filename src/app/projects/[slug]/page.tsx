
"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { 
  ChevronLeft, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  Calendar as CalendarIcon,
  Layers,
  Trophy,
  Github,
  Globe,
  Play
} from "lucide-react";
import { projectsData } from "@/lib/projects-data";

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const study = projectsData.find(p => p.slug === slug);
  const CALENDLY_URL = "https://calendly.com/sofolitltd/30min";

  if (!study) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-black">Project Not Found</h1>
          <p className="text-muted-foreground">The project you are looking for doesn't exist or has been moved.</p>
          <Link href="/projects" className="inline-flex items-center gap-2 text-primary font-bold">
            <ChevronLeft className="w-4 h-4" /> Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container px-4 mx-auto">
        {/* Breadcrumb */}
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-12 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20">
              {study.category.toUpperCase()} Project
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
              {study.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {study.description}
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">My Role</p>
                <p className="font-bold">{study.role}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Category</p>
                <p className="font-bold">{study.category === 'app' ? 'Mobile App' : 'Web Platform'}</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border border-border shadow-2xl">
            <Image 
              src={study.imageUrl} 
              alt={study.title} 
              fill 
              className="object-cover"
              data-ai-hint={study.imageHint}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          <div className="lg:col-span-8 space-y-20">
            {/* Overview */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-black">Project Overview</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {study.longDescription}
              </p>
            </section>

            {/* The Challenge */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
                <h2 className="text-3xl font-black">The Challenges</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {study.challenges}
              </p>
            </section>

            {/* Results Grid */}
            <section className="space-y-8 p-12 rounded-[3rem] bg-muted/30 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                  <Trophy className="w-6 h-6 text-green-500" />
                </div>
                <h2 className="text-3xl font-black">Key Features</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {study.keyFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-background border border-border">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                    <span className="font-bold text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="p-8 rounded-[2rem] glass-card border-border sticky top-32">
              <h3 className="text-xl font-black mb-6">Technologies</h3>
              <div className="flex flex-wrap gap-2 mb-10">
                {study.tags.map(tech => (
                  <span key={tech} className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-3 mb-10">
                {study.liveLink && (
                  <a href={study.liveLink} target="_blank" rel="noopener" className="w-full py-3 rounded-xl border border-border flex items-center justify-center gap-2 font-bold hover:bg-muted transition-all">
                    <Globe className="w-4 h-4" /> Live Preview
                  </a>
                )}
                {study.repoLink && (
                  <a href={study.repoLink} target="_blank" rel="noopener" className="w-full py-3 rounded-xl border border-border flex items-center justify-center gap-2 font-bold hover:bg-muted transition-all">
                    <Github className="w-4 h-4" /> View Code
                  </a>
                )}
                {study.playStoreLink && (
                  <a href={study.playStoreLink} target="_blank" rel="noopener" className="w-full py-3 rounded-xl bg-primary text-white flex items-center justify-center gap-2 font-bold hover:shadow-lg transition-all">
                    <Play className="w-4 h-4 fill-white" /> Play Store
                  </a>
                )}
              </div>

              <hr className="border-border mb-10" />
              <h3 className="text-xl font-black mb-4">Launch your vision</h3>
              <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                Inspired by this project? Let's discuss how we can achieve similar results for your business.
              </p>
              <a 
                href={CALENDLY_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full py-4 rounded-2xl bg-primary text-white font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all"
              >
                <CalendarIcon className="w-5 h-5" /> Book Strategy Call
              </a>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
