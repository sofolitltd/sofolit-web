import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Scale } from "lucide-react";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Legal terms and conditions for using Sofol IT services.',
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <div className="container px-4 mx-auto pt-40 pb-24 max-w-4xl">
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Scale className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: March 13, 2024</p>
            </div>
          </div>

          <section className="space-y-6 text-muted-foreground leading-relaxed">
            <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the services provided by Sofol IT ("the Agency"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services or website.
            </p>

            <h2 className="text-2xl font-bold text-foreground">2. Description of Services</h2>
            <p>
              Sofol IT provides software development, UI/UX design, and digital strategy services. The specific scope of work, timelines, and deliverables for each project will be outlined in a separate Statement of Work (SOW) or Service Agreement signed by both parties.
            </p>

            <h2 className="text-2xl font-bold text-foreground">3. Intellectual Property</h2>
            <p>
              Unless otherwise agreed in writing, Sofol IT retains all ownership rights to any pre-existing code, tools, or methodologies used in the project. Upon full payment for the services, the Client will be granted a license or ownership of the specific custom deliverables as defined in the project agreement.
            </p>

            <h2 className="text-2xl font-bold text-foreground">4. Confidentiality</h2>
            <p>
              Both parties agree to maintain the confidentiality of all proprietary information shared during the course of the project. This includes trade secrets, business strategies, and technical specifications.
            </p>

            <h2 className="text-2xl font-bold text-foreground">5. Limitation of Liability</h2>
            <p>
              Sofol IT shall not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use our services. Our total liability for any claim shall not exceed the amount paid for the specific service in question.
            </p>

            <h2 className="text-2xl font-bold text-foreground">6. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the Agency is registered, without regard to its conflict of law principles.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
