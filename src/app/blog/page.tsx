
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const blogPosts = [
  {
    slug: "domain-hosting-mvp-guide",
    title: "Domain & Hosting: Choosing the Right Home for Your MVP",
    excerpt: "Why choosing the wrong hosting can kill your startup before it launches. A solo founder's guide to reliable infrastructure.",
    date: "May 20, 2024",
    readTime: "5 min read",
    category: "Strategy",
    image: "blog-1"
  },
  {
    slug: "firebase-solo-founder-secret-weapon",
    title: "Firebase: Why It's the Solo Founder's Secret Weapon",
    excerpt: "How to leverage Firebase to build features faster than a full engineering team. Scalability made simple.",
    date: "May 18, 2024",
    readTime: "7 min read",
    category: "Engineering",
    image: "blog-3"
  },
  {
    slug: "mastering-firebase-crud-operations",
    title: "Firebase CRUD: Mastering Data Operations in Minutes",
    excerpt: "A practical guide to Create, Read, Update, and Delete operations for modern web and mobile apps.",
    date: "May 15, 2024",
    readTime: "6 min read",
    category: "Engineering",
    image: "blog-2"
  },
  {
    slug: "fcm-push-notifications-engagement",
    title: "FCM: Keeping Users Engaged with Push Notifications",
    excerpt: "Stop losing users. Learn how Firebase Cloud Messaging can triple your retention rates.",
    date: "May 12, 2024",
    readTime: "4 min read",
    category: "Growth",
    image: "blog-1"
  },
  {
    slug: "hosting-on-firebase-seconds",
    title: "Hosting on Firebase: Deploying Your Web App in Seconds",
    excerpt: "Forget complex devops. Deploy your Next.js or React app with a single command.",
    date: "May 10, 2024",
    readTime: "3 min read",
    category: "Engineering",
    image: "blog-3"
  },
  {
    slug: "vps-vs-shared-hosting-saas",
    title: "VPS vs Shared Hosting: When to Make the Switch for Your SaaS",
    excerpt: "Don't let slow servers ruin your conversion rate. Understanding when you need dedicated resources.",
    date: "May 08, 2024",
    readTime: "6 min read",
    category: "Strategy",
    image: "blog-2"
  },
  {
    slug: "collify-streamlining-digital-assets",
    title: "Collify: Streamlining Your Digital Assets for Rapid Growth",
    excerpt: "How to organize your project files and brand assets like a professional agency.",
    date: "May 05, 2024",
    readTime: "4 min read",
    category: "Strategy",
    image: "blog-1"
  },
  {
    slug: "figma-for-founders-design-hifi",
    title: "Figma for Founders: Designing High-Fidelity Prototypes",
    excerpt: "You don't need a designer to build beautiful apps. Mastering Figma basics for MVP validation.",
    date: "May 02, 2024",
    readTime: "8 min read",
    category: "UI/UX",
    image: "blog-3"
  },
  {
    slug: "roi-of-uiux-growth-engine",
    title: "The ROI of UI/UX: Why a Pretty Interface is a Growth Engine",
    excerpt: "Good design is good business. How intuitive user experiences drive customer loyalty.",
    date: "April 28, 2024",
    readTime: "5 min read",
    category: "UI/UX",
    image: "blog-2"
  },
  {
    slug: "android-studio-essentials-mobile-success",
    title: "Android Studio Essentials: Setting Up for Mobile Success",
    excerpt: "A step-by-step setup guide for building high-performance Android applications.",
    date: "April 25, 2024",
    readTime: "6 min read",
    category: "Engineering",
    image: "blog-1"
  },
  {
    slug: "antigravity-frictionless-deployment",
    title: "Antigravity: The Future of Frictionless Deployment",
    excerpt: "Exploring new paradigms in cloud computing and zero-downtime releases.",
    date: "April 22, 2024",
    readTime: "5 min read",
    category: "Engineering",
    image: "blog-3"
  },
  {
    slug: "vs-code-plugins-solo-devs-2024",
    title: "VS Code Mastery: Plugins Every Solo Developer Needs in 2024",
    excerpt: "Boost your productivity with these essential extensions for Next.js and Flutter development.",
    date: "April 18, 2024",
    readTime: "4 min read",
    category: "Engineering",
    image: "blog-2"
  },
  {
    slug: "seo-for-startups-no-budget",
    title: "SEO for Startups: Rank #1 Without a Marketing Budget",
    excerpt: "Organic growth hacks for founders. How to win at search without spending a dime.",
    date: "April 15, 2024",
    readTime: "7 min read",
    category: "Growth",
    image: "blog-1"
  },
  {
    slug: "youtube-marketing-personal-brand-leads",
    title: "YouTube Marketing: Building a Personal Brand for SaaS Leads",
    excerpt: "Why every founder should be a creator. Driving software sales through video content.",
    date: "April 12, 2024",
    readTime: "6 min read",
    category: "Growth",
    image: "blog-3"
  },
  {
    slug: "facebook-page-strategy-turning-followers-customers",
    title: "Facebook Page Strategy: Turning Followers into Customers",
    excerpt: "Don't just chase likes. Build a community that actually pays for your software.",
    date: "April 08, 2024",
    readTime: "5 min read",
    category: "Growth",
    image: "blog-2"
  },
  {
    slug: "instagram-for-builders-community-growth",
    title: "Instagram for Builders: Showing the Process to Build Community",
    excerpt: "Building in public on IG. How behind-the-scenes content creates massive hype.",
    date: "April 05, 2024",
    readTime: "4 min read",
    category: "Growth",
    image: "blog-1"
  },
  {
    slug: "chatgpt-for-developers-better-code-faster",
    title: "ChatGPT for Developers: Writing Better Code, Faster",
    excerpt: "Leveraging LLMs to accelerate your development workflow without sacrificing quality.",
    date: "April 01, 2024",
    readTime: "5 min read",
    category: "Engineering",
    image: "blog-3"
  },
  {
    slug: "gemini-2-5-google-latest-ai-apps",
    title: "Gemini 2.5: Leveraging Google's Latest AI for Your App",
    excerpt: "How to integrate powerful multimodal AI features into your next digital product.",
    date: "March 28, 2024",
    readTime: "6 min read",
    category: "Engineering",
    image: "blog-2"
  },
  {
    slug: "nano-banana-generative-ai-video-images",
    title: "Nano Banana: Exploring the Latest in Generative AI",
    excerpt: "The cutting edge of image and video generation for founders and creative agencies.",
    date: "March 25, 2024",
    readTime: "5 min read",
    category: "Engineering",
    image: "blog-1"
  },
  {
    slug: "flutter-vs-react-native-2024-solo-founders",
    title: "Flutter vs React Native: The 2024 Verdict for Solo Founders",
    excerpt: "Choosing the right cross-platform framework for your MVP. Performance vs Speed.",
    date: "March 20, 2024",
    readTime: "8 min read",
    category: "Strategy",
    image: "blog-3"
  },
  {
    slug: "building-a-waitlist-validate-before-code",
    title: "Building a Waitlist: How to Validate Your Idea Early",
    excerpt: "Stop wasting months on features nobody wants. The art of pre-launch validation.",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Strategy",
    image: "blog-2"
  },
  {
    slug: "stripe-integration-safe-payments-mvp",
    title: "Stripe Integration: Handling Payments Safely and Simply",
    excerpt: "The founder's guide to global payments, subscriptions, and security.",
    date: "March 10, 2024",
    readTime: "6 min read",
    category: "Engineering",
    image: "blog-1"
  },
  {
    slug: "database-design-scaling-10k-users",
    title: "Database Design: Scaling from 0 to 10k Users Painlessly",
    excerpt: "Architecting your data so it doesn't break when you finally hit the big time.",
    date: "March 05, 2024",
    readTime: "7 min read",
    category: "Engineering",
    image: "blog-3"
  },
  {
    slug: "content-marketing-why-founders-must-write",
    title: "Content Marketing: Why Every Founder Should Be a Writer",
    excerpt: "The power of the written word in building authority and driving organic traffic.",
    date: "March 01, 2024",
    readTime: "5 min read",
    category: "Growth",
    image: "blog-2"
  },
  {
    slug: "personal-branding-buying-from-people",
    title: "Personal Branding: Why People Buy from People",
    excerpt: "How your personal story can be the biggest competitive advantage for your software.",
    date: "February 25, 2024",
    readTime: "6 min read",
    category: "Growth",
    image: "blog-1"
  },
  {
    slug: "app-store-optimization-aso-discovery",
    title: "App Store Optimization (ASO): Getting Your App Discovered",
    excerpt: "Mastering the algorithms to rank higher on Google Play and Apple App Store.",
    date: "February 20, 2024",
    readTime: "5 min read",
    category: "Growth",
    image: "blog-3"
  },
  {
    slug: "security-101-protecting-data-budget",
    title: "Security 101: Protecting User Data on a Budget",
    excerpt: "Essential security practices for solo founders building their first MVP.",
    date: "February 15, 2024",
    readTime: "6 min read",
    category: "Engineering",
    image: "blog-2"
  },
  {
    slug: "speed-is-a-feature-nextjs-vitals",
    title: "Speed is a Feature: Optimizing Next.js for Web Vitals",
    excerpt: "Why load times matter more than features. Improving your Core Web Vitals score.",
    date: "February 10, 2024",
    readTime: "5 min read",
    category: "Engineering",
    image: "blog-1"
  },
  {
    slug: "solo-founder-mindset-productivity-sanity",
    title: "The Solo Founder Mindset: Staying Productive and Sane",
    excerpt: "Avoiding burnout while building a digital empire by yourself.",
    date: "February 05, 2024",
    readTime: "5 min read",
    category: "Strategy",
    image: "blog-3"
  },
  {
    slug: "networking-for-introverts-tech-support",
    title: "Networking for Introverts: Building a Support System",
    excerpt: "How to connect with other founders without the awkwardness of traditional events.",
    date: "February 01, 2024",
    readTime: "4 min read",
    category: "Strategy",
    image: "blog-2"
  },
  {
    slug: "mvp-pitfalls-what-to-leave-out",
    title: "MVP Pitfalls: What to Leave Out of Version 1.0",
    excerpt: "The discipline of simplicity. Cutting features to launch faster.",
    date: "January 25, 2024",
    readTime: "6 min read",
    category: "Strategy",
    image: "blog-1"
  },
  {
    slug: "customer-support-as-marketing-advocates",
    title: "Customer Support as Marketing: Turning Users into Advocates",
    excerpt: "Why high-touch support is the best growth strategy for early-stage startups.",
    date: "January 20, 2024",
    readTime: "5 min read",
    category: "Growth",
    image: "blog-3"
  },
  {
    slug: "analytics-for-growth-metrics-that-matter",
    title: "Analytics for Growth: Which Metrics Actually Matter for MVPs",
    excerpt: "Stop staring at vanity metrics. Focus on what truly drives your business forward.",
    date: "January 15, 2024",
    readTime: "6 min read",
    category: "Growth",
    image: "blog-2"
  },
  {
    slug: "power-of-open-source-leveraging-community",
    title: "The Power of Open Source: Leveraging Community to Build Faster",
    excerpt: "How to stand on the shoulders of giants using existing libraries and frameworks.",
    date: "January 10, 2024",
    readTime: "5 min read",
    category: "Engineering",
    image: "blog-1"
  },
  {
    slug: "scaling-to-first-100-paid-users",
    title: "Scaling to Your First 100 Paid Users: A Step-by-Step Guide",
    excerpt: "The roadmap from zero to consistent revenue. Realistic steps for solo founders.",
    date: "January 05, 2024",
    readTime: "8 min read",
    category: "Strategy",
    image: "blog-3"
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container px-4 mx-auto text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 mb-6">
          Founder Insights & Engineering Strategy
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          The <span className="text-gradient">Innovator's</span> Journal
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
          Actionable strategies on **MVP development**, **SaaS scaling**, and **premium software engineering** tailored for the modern solo entrepreneur.
        </p>
      </div>

      <section className="container px-4 mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => {
            const postImg = PlaceHolderImages.find(img => img.id === post.image);
            return (
              <Link 
                key={idx} 
                href={`/blog/${post.slug}`}
                className="group flex flex-col glass-card border-border/50 rounded-3xl overflow-hidden hover:border-primary/40 transition-all hover:translate-y-[-4px]"
              >
                <div className="relative aspect-video overflow-hidden">
                  {postImg && (
                    <Image 
                      src={postImg.imageUrl} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      data-ai-hint={postImg.imageHint}
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest border border-border">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                    <span className="text-sm font-bold flex items-center gap-2">
                      Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-muted/30 py-24 border-y border-border">
        <div className="container px-4 mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">Stay Ahead of the Curve</h2>
          <p className="text-muted-foreground">Subscribe to our monthly newsletter for curated engineering tips and growth strategies delivered straight to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-6 py-4 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary outline-none min-w-[300px]"
            />
            <button className="px-8 py-4 rounded-xl bg-primary text-white font-bold hover:shadow-lg transition-all">
              Join 5,000+ Founders
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
