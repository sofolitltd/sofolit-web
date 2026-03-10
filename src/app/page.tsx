import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { FounderStory } from "@/components/sections/FounderStory";
import { SocialProof } from "@/components/sections/SocialProof";
import { LatestBlog } from "@/components/sections/LatestBlog";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-background text-foreground selection:bg-primary/30">
      <Hero />
      <Process />
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