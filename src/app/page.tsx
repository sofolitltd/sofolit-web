import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { FounderStory } from "@/components/sections/FounderStory";
import { SocialProof } from "@/components/sections/SocialProof";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="bg-background text-foreground selection:bg-primary/30">
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center glass-card bg-background/50 backdrop-blur-md border-b">
        <div className="text-2xl font-black tracking-tighter">
          SOFOL <span className="text-primary">IT</span>
        </div>
        <div className="flex items-center gap-4 md:gap-8 text-sm font-medium text-muted-foreground">
          <div className="hidden lg:flex items-center gap-8">
            <a href="#process" className="hover:text-primary transition-colors">Process</a>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#story" className="hover:text-primary transition-colors">Our Story</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Work</a>
          </div>
          <ThemeToggle />
          <a href="#contact" className="px-5 py-2 rounded-full border border-input hover:border-primary/50 text-foreground transition-all bg-background/50">
            Get Started
          </a>
        </div>
      </nav>

      <Hero />
      <Process />
      <Services />
      <FounderStory />
      <Portfolio />
      <SocialProof />
      <Contact />
      
      <Footer />
      
      <Toaster />
    </main>
  );
}
