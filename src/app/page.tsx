import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { SocialProof } from "@/components/sections/SocialProof";
import { ProjectIdeator } from "@/components/sections/ProjectIdeator";
import { Contact } from "@/components/sections/Contact";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="bg-[#030303] text-white selection:bg-primary/30">
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center glass-card bg-transparent border-none">
        <div className="text-2xl font-black tracking-tighter">
          SOFOL <span className="text-primary">IT</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#process" className="hover:text-primary transition-colors">Process</a>
          <a href="#portfolio" className="hover:text-primary transition-colors">Work</a>
          <a href="#ideator" className="hover:text-primary transition-colors">AI Ideator</a>
          <a href="#contact" className="px-5 py-2 rounded-full border border-white/10 hover:border-primary/50 text-white transition-all">
            Get Started
          </a>
        </div>
      </nav>

      <Hero />
      <Process />
      <Portfolio />
      <SocialProof />
      <ProjectIdeator />
      <Contact />
      
      <footer className="py-12 border-t border-white/5 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Sofol IT. Premium Software Craftsmanship.</p>
        </div>
      </footer>
      
      <Toaster />
    </main>
  );
}