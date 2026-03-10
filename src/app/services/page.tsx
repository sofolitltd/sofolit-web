
"use client";

import React from "react";
import { Footer } from "@/components/sections/Footer";
import { Smartphone, Globe, Rocket, Zap, ShieldCheck, BarChart3, Users, Code2, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ServicesPage() {
  const CALENDLY_URL = "https://calendly.com/sofolitltd/30min";

  const serviceDetails = [
    {
      title: "Custom Mobile App Development",
      description: "Launch your app on iOS and Android with a single, high-performance codebase. We specialize in building native-feel mobile experiences that scale with your user base.",
      icon: <Smartphone className="w-12 h-12 text-primary" />,
      features: [
        "Cross-Platform Flutter Expertise",
        "Secure Firebase Backend Integration",
        "Seamless App Store & Play Store Publishing",
        "Engaging Push Notifications & Analytics"
      ],
      forWho: "Perfect for: Founders launching social, health, or utility apps."
    },
    {
      title: "High-Performance Web Development",
      description: "Convert more visitors into customers with lightning-fast, SEO-optimized websites. We build everything from custom SaaS dashboards to high-converting landing pages.",
      icon: <Globe className="w-12 h-12 text-secondary" />,
      features: [
        "Next.js & React Expert Architectures",
        "SEO-Friendly Performance & Speed",
        "Secure Stripe & Payment Integrations",
        "User-Friendly SaaS Dashboards"
      ],
      forWho: "Perfect for: Businesses needing a professional, scalable web presence."
    }
  ];

  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container px-4 mx-auto text-center mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 mb-6">
          Scalable Engineering
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          Expert <span className="text-gradient">App & Web</span> Development
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
          We build the technical foundation solo founders need to scale. Get enterprise-grade software without the enterprise overhead.
        </p>
      </div>

      <section className="container px-4 mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {serviceDetails.map((service, idx) => (
            <Card key={idx} className="bg-card/80 dark:bg-card/40 backdrop-blur-xl border-border/50 shadow-2xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all">
                {service.icon}
              </div>
              <CardContent className="p-8 md:p-12 space-y-8">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight">{service.title}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-sm font-semibold">
                      <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-muted/50 border border-border text-sm font-bold italic text-primary">
                  {service.forWho}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-24 border-y border-border">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight mb-4">Why Founders Partner With Us</h2>
            <p className="text-muted-foreground">The technical expertise you need to launch with confidence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Zap />, title: "Rapid MVP Launch", desc: "Go from idea to a working product in weeks, not months." },
              { icon: <BarChart3 />, title: "Built to Scale", desc: "Architecture designed to handle your first 10,000+ users." },
              { icon: <Code2 />, title: "Zero Technical Debt", desc: "Clean, professional code that grows with your business." }
            ].map((item, idx) => (
              <div key={idx} className="text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/20 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 container px-4 mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-8 p-12 rounded-[3rem] bg-card/50 backdrop-blur-xl border border-primary/20 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Ready to build your next big idea?</h2>
          <p className="text-lg text-muted-foreground">Stop worrying about the tech and start growing your business. Let's discuss your project today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a 
              href={CALENDLY_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-10 py-4 rounded-full bg-primary text-white font-bold hover:shadow-[0_0_30px_rgba(51,150,230,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" /> Book a Strategy Call
            </a>
            <Link href="/projects" className="px-10 py-4 rounded-full border border-border bg-background font-bold hover:bg-muted transition-all">
              View Our Projects
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
