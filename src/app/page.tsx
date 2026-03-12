import { Hero } from "@/components/sections/Hero";
import { LogoBar } from "@/components/sections/LogoBar";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { WhyUs } from "@/components/sections/WhyUs";
import { Pricing } from "@/components/sections/Pricing";
import { SocialProof } from "@/components/sections/SocialProof";
import { FounderStory } from "@/components/sections/FounderStory";
import { FAQ } from "@/components/sections/FAQ";
import { LatestBlog } from "@/components/sections/LatestBlog";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-background text-foreground selection:bg-primary/30">
      <Hero />
      <LogoBar />
      <Process />
      <Services />
      <Portfolio />
      <WhyUs />
      <Pricing />
      <SocialProof />
      <FounderStory />
      <FAQ />
      <LatestBlog />
      <Contact />
      <Footer />
    </main>
  );
}
