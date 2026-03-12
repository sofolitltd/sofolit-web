import React from "react";
import { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { Smartphone, Globe, Rocket, Zap, ShieldCheck, BarChart3, Users, Code2, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Strategic Engineering Solutions',
  description: 'Elite technical partnership for founders. We build foundational architectures, cross-platform mobile apps, and high-performance web entities optimized for scale.',
};

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
      {/* Strategic Hero */}
      <div className="container px-4 mx-auto text-center mb-32">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary border border-primary/20 mb-8">
          Enterprise Scaling & Architecture
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
          The Technical <br />
          <span className="text-gradient">Powerhouse</span> for Founders
        </h1>
        <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
          We don't just write code. We architect scalable technical foundations that turn early-stage ideas into market-dominating products.
        </p>
      </div>

      {/* Core Solutions Grid */}
      <section className="container px-4 mx-auto mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {serviceDetails.map((service, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              <div className="bg-card/40 backdrop-blur-2xl border border-border/50 rounded-2xl p-12 space-y-10 group-hover:border-primary/20 transition-colors duration-500">
                <div className="flex justify-between items-start">
                  <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                    {service.icon}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary/30 group-hover:text-primary/100 transition-colors">
                    SOLUTION {idx + 1}
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-4xl font-black tracking-tight">{service.title}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-4 text-sm font-bold">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-border/30">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-2">Ideal Engagement</div>
                  <div className="text-sm font-bold text-foreground/80">{service.forWho.replace('Perfect for: ', '')}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The 8-Week Pillar */}
      <section className="bg-[#020617] text-white py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(52,152,219,0.1),transparent)]" />
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="text-primary font-black tracking-widest uppercase text-xs">Our Commitment</div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
                Zero to Shipped <br />
                <span className="text-primary">in 8 Weeks.</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Speed is a competitive advantage. We've optimized our entire engineering pipeline to take complex ideas from conception to market-ready in exactly 2 months. 
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Predictable Fixed-Timeline Delivery",
                  "Elite Full-Stack Squad (No Juniors)",
                  "Enterprise-Grade Scalability by Default"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-bold text-sm tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Engineering Speed", val: "2.5x" },
                { label: "Deployment Cycle", value: "Daily" },
                { label: "Tech Debt", value: "Zero" },
                { label: "Client ROI", value: "High" }
              ].map((stat, sidx) => (
                <div key={sidx} className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center">
                  <div className="text-3xl font-black text-primary mb-1">{stat.val || stat.value}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Call to Action */}
      <section className="py-40 container px-4 mx-auto text-center">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9]">
            Stop Building Features. <br />
            <span className="text-muted-foreground/30">Start Building Value.</span>
          </h2>
          <p className="text-xl text-muted-foreground/60 max-w-2xl mx-auto">
            Your technical partner is a force multiplier. Let's discuss how we can accelerate your trajectory.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <a 
              href={CALENDLY_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-12 py-5 rounded-full bg-primary text-white font-black hover:shadow-[0_0_50px_rgba(var(--primary),0.3)] transition-all flex items-center justify-center gap-3 text-lg"
            >
              <Calendar className="w-5 h-5 text-white/50" /> Schedule Audit
            </a>
            <Link href="/projects" className="px-12 py-5 rounded-full border border-border bg-background font-black text-lg hover:bg-muted transition-all">
              Review ROI Stories
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
