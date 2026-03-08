
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const blogPosts = [
  {
    slug: "launching-mvp-solo-founder",
    title: "How to Launch Your MVP in 4 Weeks as a Solo Founder",
    excerpt: "The roadmap from a single idea to a functional product doesn't have to take months. Discover the lean strategy for speed.",
    date: "March 15, 2024",
    readTime: "6 min read",
    category: "Strategy",
    image: "blog-1"
  },
  {
    slug: "firebase-vs-supabase-2024",
    title: "Firebase vs Supabase: Which is Right for Your Startup?",
    excerpt: "Choosing the right backend can make or break your scaling potential. We break down the technical differences for founders.",
    date: "March 10, 2024",
    readTime: "8 min read",
    category: "Engineering",
    image: "blog-3"
  },
  {
    slug: "building-community-driven-apps",
    title: "Building Community-Driven Apps: Lessons from 50+ Launches",
    excerpt: "Retention is the new growth. Learn how to bake social features into your core product to keep users coming back.",
    date: "March 5, 2024",
    readTime: "5 min read",
    category: "Growth",
    image: "blog-2"
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container px-4 mx-auto text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 mb-6">
          Founder Insights
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          The <span className="text-gradient">Innovator's</span> Journal
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
          Expert strategies on product development, scaling, and engineering for the modern solo entrepreneur.
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
