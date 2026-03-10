
"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { projectsData } from "@/lib/projects-data";

export const SocialProof = () => {
  const testimonials = [
    {
      name: "Afjal Hossain Hrody",
      role: "Wellbeing Clinic",
      content: "Sofol IT helped us bring the Wellbeing Clinic platform to life, and the result was better than we could have hoped for. They were incredibly focused on our mission, ensuring the sensitive nature of our work was reflected in a secure and intuitive user experience. It was an absolute pleasure to collaborate with a team so dedicated to quality.",
      stars: 5,
    },
    {
      name: "Abdullah Al Mamun",
      role: "Blood Finder App",
      content: "The team delivered an exceptional product for the Blood Finder project. They were incredibly focused on customer satisfaction, iterating on the real-time notification system until it was flawless. Their technical work was excellent, and they were always proactive in making sure the app truly served our community's needs.",
      stars: 5,
    },
    {
      name: "Abdullah Omer Himel",
      role: "The Forge",
      content: "Working with Sofol IT to build The Forge's portfolio site was a great experience. They didn't just build a website; they helped us craft a digital identity that's both stunning and high-performance. They were always making sure the job was done exactly the way we wanted, and their attention to detail was top-tier.",
      stars: 5,
    },
    {
      name: "Ashikur Rahman Ashik",
      role: "Petelements BD",
      content: "We've been incredibly happy with the e-commerce platform Sofol IT built for Petelements BD. They really understood our business goals and delivered a clean, efficient shopping experience that our customers love. They were professional, responsive, and a pleasure to collaborate with throughout the entire process.",
      stars: 5,
    },
    {
      name: "Arif Rahman",
      role: "Abrar Shop",
      content: "The custom e-commerce app for Abrar Shop has been a huge success for us. Sofol IT's work on the bKash integration and overall performance was excellent. They were incredibly focused on making sure every feature worked exactly as we envisioned. I highly recommend them for any serious development project.",
      stars: 5,
    },
    {
      name: "Shahriar Rahman",
      role: "Priyo Banskhali",
      content: "The Priyo Banskhali app has transformed how our community connects, and that's thanks to Sofol IT. They were incredibly patient and focused on ensuring the app met the unique needs of our local residents. Their work was excellent, and the whole collaboration felt like a true partnership.",
      stars: 5,
    },
  ];

  const projectNames = projectsData.map(p => p.title);

  return (
    <section className="py-24 bg-background overflow-hidden">
      {/* Project Names Marquee (Social Proof Strip) */}
      <div className="border-y border-border/50 py-10 mb-24 bg-muted/20 relative">
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="marquee-content flex gap-12 items-center">
          {[...projectNames, ...projectNames, ...projectNames].map((name, idx) => (
            <span 
              key={idx} 
              className="text-2xl md:text-4xl font-black text-muted-foreground/30 whitespace-nowrap uppercase tracking-widest hover:text-primary transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="container px-4 mx-auto mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 mb-6">
          Client Success
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Trusted by Innovators</h2>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
          Real feedback from partners we've helped launch and scale.
        </p>
      </div>
      
      {/* Testimonials Marquee */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="marquee-content-reverse flex gap-8 py-10" style={{ animationDuration: '80s' }}>
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div 
              key={idx}
              className="w-[450px] md:w-[600px] flex-shrink-0 relative p-10 rounded-[2.5rem] glass-card animate-border-trace bg-card group hover:bg-card/60 transition-colors shadow-2xl"
            >
              <div className="flex gap-1 mb-8">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <Quote className="w-20 h-20 text-primary/5 absolute top-10 right-10 group-hover:text-primary/10 transition-colors" />
              <p className="text-lg md:text-xl font-medium mb-10 leading-relaxed italic relative z-10 text-foreground/90">
                "{t.content}"
              </p>
              <div className="pt-8 border-t border-border/50">
                <h4 className="font-black text-xl text-foreground">{t.name}</h4>
                <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
