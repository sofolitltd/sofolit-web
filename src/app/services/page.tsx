"use client";

import React from "react";
import { Footer } from "@/components/sections/Footer";
import { Smartphone, Globe, Rocket, Zap, ShieldCheck, BarChart3, Users, Code2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ServicesPage() {
  const serviceDetails = [
    {
      title: "Mobile App Development",
      description: "We build native-feel cross-platform apps that scale. Perfect for solo founders who need to reach iOS and Android users with a single codebase.",
      icon: <Smartphone className="w-12 h-12 text-primary" />,
      features: [
        "Flutter & React Native Expertise",
        "Firebase Backend Integration",
        "App Store & Play Store Management",
        "Push Notifications & User Engagement"
      ],
      forWho: "Best for: Innovators launching the next big social, health, or utility app."
    },
    {
      title: "High-Performance Web",
      description: "Convert visitors into customers with lightning-fast web applications. From SaaS dashboards to landing pages that actually sell.",
      icon: <Globe className="w-12 h-12 text-secondary" />,
      features: [
        "Next.js & React Architectures",
        "SEO-Optimized Landing Pages",
        "Secure Payment Gateway Integration",
        "Custom SaaS Dashboards & Analytics"
      ],
      forWho: "Best for: Businesses needing a professional digital presence that handles heavy traffic."
    }
  ];

  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container px-4 mx-auto text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          Premium <span className="text-gradient">Engineering</span> Services
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
          Enterprise-level technical excellence designed for solo founders. We build the foundation while you build the business.
        </p>
      </div>

      <section className="container px-4 mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {serviceDetails.map((service, idx) => (
            <Card key={idx} className="glass-card border-white/5 bg-card relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <CardContent className="p-12 space-y-8">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    {service.icon}
                  </div>
                  <h2 className="text-4xl font-black">{service.title}</h2>
                  <p className="text-muted-foreground text-lg">{service.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-sm font-medium">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-muted/50 border border-border text-sm font-semibold italic text-primary">
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
            <h2 className="text-3xl font-black tracking-tight mb-4">Why Solo Founders Choose Us</h2>
            <p className="text-muted-foreground">The technical partner you need to launch without the headaches.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Zap />, title: "Speed to Market", desc: "Launch your MVP in weeks, not months." },
              { icon: <BarChart3 />, title: "Scalability", desc: "Architecture built to handle 10k+ users from day one." },
              { icon: <Code2 />, title: "Zero Tech Debt", desc: "Clean, documented code that grows with you." }
            ].map((item, idx) => (
              <div key={idx} className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 container px-4 mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-8 p-12 rounded-[3rem] glass-card border-primary/20 bg-primary/5">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Ready to launch your vision?</h2>
          <p className="text-lg text-muted-foreground">Stop waiting for the "perfect" time. Start building today with a partner who understands your journey.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/#contact" className="px-10 py-4 rounded-full bg-primary text-white font-bold hover:shadow-2xl transition-all">
              Schedule Free Consultation
            </a>
            <a href="/work" className="px-10 py-4 rounded-full border border-border bg-background font-bold hover:bg-muted transition-all">
              View Our Work
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
