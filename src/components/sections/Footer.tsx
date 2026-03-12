"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Linkedin, Twitter, Instagram, Youtube, ArrowUpRight } from "lucide-react";

const socialLinks = [
  { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/company/sofolitltd", label: "LinkedIn" },
  { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/sofolitltd", label: "X (Twitter)" },
  { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/sofolitltd", label: "Instagram" },
  { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/sofolitltd", label: "Facebook" },
  { icon: <Youtube className="w-5 h-5" />, href: "https://www.youtube.com/@sofolitltd", label: "YouTube" },
];

const legalLinks = [
  { title: "Terms of Service", href: "/terms" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Refund Policy", href: "/refund" },
];

const DhakaTime = () => {
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-border/50 bg-muted/20 backdrop-blur-sm">
      <div className="flex flex-col">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 leading-none mb-1">Our Local Time</span>
        <span className="text-xs font-bold text-foreground tabular-nums leading-none">
          {time || "12:00 PM"} <span className="text-primary font-black ml-1">BST</span>
        </span>
      </div>
      <div className="w-px h-6 bg-border" />
      <div className="flex flex-col">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 leading-none mb-1">Avg Response</span>
        <span className="text-xs font-bold text-emerald-500 leading-none">&lt; 2 Hours</span>
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-24 pb-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="text-3xl font-black tracking-tighter">
              SOFOL <span className="text-primary">IT</span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Transforming visionary concepts into iconic digital products with premium craftsmanship and strategic excellence.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 bg-background/50 backdrop-blur-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-bold text-lg mb-6">Exploration</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#process" className="hover:text-primary transition-colors flex items-center gap-1 text-sm">Our Process <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="#services" className="hover:text-primary transition-colors flex items-center gap-1 text-sm">Services <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors flex items-center gap-1 text-sm">Recent Projects <ArrowUpRight className="w-3 h-3" /></Link></li>
              <li><a href="#story" className="hover:text-primary transition-colors flex items-center gap-1 text-sm">Our Story <ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-muted-foreground">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-primary transition-colors text-sm">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter/CTA Column */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg mb-2">Ready to Launch?</h4>
            <p className="text-sm text-muted-foreground">
              Join our network of innovators and get the latest product insights.
            </p>
            <div className="flex gap-2 p-1 rounded-full border border-border bg-background/50 backdrop-blur-sm focus-within:border-primary transition-all">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border-none focus:ring-0 text-sm pl-4 flex-1 outline-none"
              />
              <button className="bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p>&copy; {new Date().getFullYear()} Sofol IT. All rights reserved.</p>
            <DhakaTime />
          </div>
          <div className="flex items-center gap-6">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 
              Currently accepting projects
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
