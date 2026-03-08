"use client";

import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/sections/Footer";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center glass-card bg-background/50 backdrop-blur-md border-b">
        <Link href="/" className="text-2xl font-black tracking-tighter">
          SOFOL <span className="text-primary">IT</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-8 text-sm font-medium text-muted-foreground">
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/#process" className="hover:text-primary transition-colors">Process</Link>
            <Link href="/#services" className="hover:text-primary transition-colors">Services</Link>
            <Link href="/#story" className="hover:text-primary transition-colors">Our Story</Link>
            <Link href="/#portfolio" className="hover:text-primary transition-colors">Work</Link>
          </div>
          <ThemeToggle />
          <Link href="/#contact" className="px-5 py-2 rounded-full border border-input hover:border-primary/50 text-foreground transition-all bg-background/50">
            Get Started
          </Link>
        </div>
      </nav>

      <div className="container px-4 mx-auto pt-32 pb-24 max-w-4xl">
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
              <Shield className="w-8 h-8 text-secondary" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <section className="space-y-6 text-muted-foreground leading-relaxed">
            <h2 className="text-2xl font-bold text-foreground">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as your name, email address, and project details when you fill out our contact form or subscribe to our newsletter.
            </p>

            <h2 className="text-2xl font-bold text-foreground">2. How We Use Your Information</h2>
            <p>
              We use the collected information to communicate with you, provide our services, and improve our website's performance and user experience. We do not sell your personal data to third parties.
            </p>

            <h2 className="text-2xl font-bold text-foreground">3. Cookies and Tracking</h2>
            <p>
              Our website uses cookies and similar tracking technologies to analyze site traffic and understand user behavior. You can manage your cookie preferences through your browser settings.
            </p>

            <h2 className="text-2xl font-bold text-foreground">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-foreground">5. Your Rights</h2>
            <p>
              You have the right to access, update, or request the deletion of your personal information. To exercise these rights, please contact us at privacy@sofol.it.
            </p>

            <h2 className="text-2xl font-bold text-foreground">6. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of those websites.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
