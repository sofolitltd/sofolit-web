
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
  ShieldCheck, 
  ArrowRight, 
  Calendar as CalendarIcon,
  Layers,
  Users,
  Trophy
} from "lucide-react";

const caseStudiesData = {
  "apex-fintech": {
    title: "Apex Fintech: Redefining Digital Banking for Nomads",
    client: "Apex Financial Group",
    category: "Fintech",
    timeline: "4 Months",
    image: "https://picsum.photos/seed/work1/1920/1080",
    overview: "Apex Fintech needed a secure, cross-platform mobile solution that could handle multi-currency transactions with sub-second latency for their growing global user base.",
    challenge: "The primary challenge was integrating a legacy banking backend with a modern, high-performance Flutter frontend while maintaining PCI-DSS compliance and ensuring a seamless user experience across time zones.",
    solution: "We architected a middle-layer using Go and Firebase to handle real-time synchronization and caching. We implemented a custom design system that highlights accessibility and ease of use for high-stress financial decisions.",
    results: [
      "30% Increase in User Retention",
      "Sub-200ms Transaction Latency",
      "99.9% Uptime since launch",
      "App Store rating improved from 3.2 to 4.8"
    ],
    techStack: ["Flutter", "Go", "Firebase", "GCP", "PostgreSQL"],
  },
  "nova-health": {
    title: "Nova Health: AI-Powered Wellness at Scale",
    client: "Nova Labs",
    category: "Health & Fitness",
    timeline: "3 Months",
    image: "https://picsum.photos/seed/work2/1920/1080",
    overview: "Nova Health is a gamified wellness platform that uses behavioral science to help users build long-term healthy habits.",
    challenge: "Scaling to 50k+ active users required a robust notification system and a backend capable of processing millions of health data points daily without degrading performance.",
    solution: "Utilizing React Native and Vercel Edge functions, we built a responsive frontend coupled with a serverless architecture that scales horizontally based on demand.",
    results: [
      "50k+ Monthly Active Users",
      "12% Growth in weekly goal completion",
      "Featured in 'Apps We Love' on Google Play",
      "Zero infrastructure downtime during traffic peaks"
    ],
    techStack: ["React Native", "Node.js", "Vercel", "MongoDB", "FCM"],
  },
  "nexus-saas": {
    title: "Nexus SaaS: Streamlining Agency Operations",
    client: "Nexus Digital",
    category: "SaaS",
    timeline: "5 Months",
    image: "https://picsum.photos/seed/work3/1920/1080",
    overview: "Nexus requested a comprehensive resource management tool to replace their fragmented system of spreadsheets and Trello boards.",
    challenge: "Integrating complex permission levels and real-time project budgeting while keeping the interface simple enough for non-technical managers.",
    solution: "We built a Next.js platform with a highly optimized dashboard. We used Docker for consistent deployment environments and implemented a custom reporting engine.",
    results: [
      "20% Reduction in Operational Costs",
      "15 Hours saved weekly per project manager",
      "Improved budget accuracy by 40%",
      "Seamless integration with Slack and Jira"
    ],
    techStack: ["Next.js", "PostgreSQL", "Docker", "Stripe", "Prisma"],
  },
  "community-connect": {
    title: "Community Connect: Strengthening Local Bonds",
    client: "LocalGov Initiative",
    category: "Social",
    timeline: "2.5 Months",
    image: "https://picsum.photos/seed/work4/1920/1080",
    overview: "A hyper-local social network designed to improve neighborhood safety and foster community engagement through events and alerts.",
    challenge: "Ensuring high privacy standards while maintaining a sense of community. The app needed to be accessible for elderly users as well.",
    solution: "A Flutter-based app with deep Firebase integration for instant safety alerts. We focused on large typography, high contrast, and a simplified 'Alert' button.",
    results: [
      "Awarded 'Best Local App' 2024",
      "85% Adoption rate in pilot neighborhoods",
      "Reduced incident response time by 25%",
      "High user trust scores in privacy audits"
    ],
    techStack: ["Flutter", "Firebase", "Algolia", "Cloud Functions", "AdMob"],
  }
};

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = caseStudiesData[slug as keyof typeof caseStudiesData];
  const CALENDLY_URL = "https://calendly.com/sofolitltd/30min";

  if (!study) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-black">Case Study Not Found</h1>
          <p className="text-muted-foreground">The project you are looking for doesn't exist or has been moved.</p>
          <Link href="/work" className="inline-flex items-center gap-2 text-primary font-bold">
            <ChevronLeft className="w-4 h-4" /> Back to Work
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container px-4 mx-auto">
        {/* Breadcrumb */}
        <Link href="/work" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-12 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20">
              {study.category} Case Study
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
              {study.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {study.overview}
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Client</p>
                <p className="font-bold">{study.client}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Timeline</p>
                <p className="font-bold">{study.timeline}</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border border-border shadow-2xl">
            <Image 
              src={study.image} 
              alt={study.title} 
              fill 
              className="object-cover"
              data-ai-hint="case study showcase"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          <div className="lg:col-span-8 space-y-20">
            {/* The Challenge */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
                <h2 className="text-3xl font-black">The Challenge</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {study.challenge}
              </p>
            </section>

            {/* The Solution */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-black">Our Solution</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {study.solution}
              </p>
            </section>

            {/* Results Grid */}
            <section className="space-y-8 p-12 rounded-[3rem] bg-muted/30 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                  <Trophy className="w-6 h-6 text-green-500" />
                </div>
                <h2 className="text-3xl font-black">Key Results</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {study.results.map((result, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-background border border-border">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                    <span className="font-bold text-sm">{result}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="p-8 rounded-[2rem] glass-card border-border sticky top-32">
              <h3 className="text-xl font-black mb-6">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mb-10">
                {study.techStack.map(tech => (
                  <span key={tech} className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                    {tech}
                  </span>
                ))}
              </div>
              <hr className="border-border mb-10" />
              <h3 className="text-xl font-black mb-4">Start your journey</h3>
              <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                Inspired by this project? Let's discuss how we can achieve similar results for your vision.
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

        {/* Bottom CTA */}
        <section className="py-24 text-center space-y-8 border-t border-border">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Ready to build your masterpiece?</h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            We help founders bridge the gap between imagination and a market-ready product.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a 
              href={CALENDLY_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-10 py-4 rounded-full bg-primary text-white font-bold hover:shadow-2xl transition-all inline-flex items-center justify-center gap-2"
            >
              <CalendarIcon className="w-5 h-5" /> Get Started Today
            </a>
            <Link href="/work" className="px-10 py-4 rounded-full border border-border bg-background font-bold hover:bg-muted transition-all">
              See More Work
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
