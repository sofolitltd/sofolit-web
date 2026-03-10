import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { FounderStory } from "@/components/sections/FounderStory";
import { SocialProof } from "@/components/sections/SocialProof";
import { LatestBlog } from "@/components/sections/LatestBlog";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { ProjectIdeator } from "@/components/sections/ProjectIdeator";

export default function Home() {
  return (
    <main className="bg-background text-foreground selection:bg-primary/30">
      <Hero />
      <Process />
      <section className="py-20 bg-muted/20 border-y border-border">
        <div className="container px-4 mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 mb-6">
            Strategic Advantage
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">AI-Powered Strategy</h2>
        </div>
        <ProjectIdeator />
      </section>
      <Services />
      <FounderStory />
      <Portfolio />
      <SocialProof />
      <LatestBlog />
      <Contact />
      <Footer />
    </main>
  );
}
