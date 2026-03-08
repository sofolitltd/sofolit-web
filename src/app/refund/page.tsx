"use client";

import React from "react";
import Link from "next/link";
import { RefreshCcw } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/sections/Footer";

export default function RefundPolicy() {
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
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
              <RefreshCcw className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">Refund Policy</h1>
              <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <section className="space-y-6 text-muted-foreground leading-relaxed">
            <h2 className="text-2xl font-bold text-foreground">1. Service-Based Refunds</h2>
            <p>
              As a service-based agency, we dedicate professional resources to every project. Refunds are generally not provided for work already performed. Payments made for completed project milestones are non-refundable.
            </p>

            <h2 className="text-2xl font-bold text-foreground">2. Project Cancellation</h2>
            <p>
              Either party may cancel a project according to the terms specified in the individual Service Agreement. In the event of cancellation by the Client, the Client is responsible for payment for all hours worked and milestones achieved up to the cancellation date.
            </p>

            <h2 className="text-2xl font-bold text-foreground">3. Retainer Payments</h2>
            <p>
              Upfront deposits or retainer payments are used to secure project timelines and resources. These payments are non-refundable but may be applied as credit to future services at the Agency's discretion.
            </p>

            <h2 className="text-2xl font-bold text-foreground">4. Disputes</h2>
            <p>
              If you are dissatisfied with our services, please contact your project manager immediately. We are committed to excellence and will work diligently to address concerns and resolve issues through revisions or adjustments.
            </p>

            <h2 className="text-2xl font-bold text-foreground">5. Processing of Refunds</h2>
            <p>
              In rare cases where a partial refund is approved by the Agency management, it will be processed through the original payment method within 14 business days.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
