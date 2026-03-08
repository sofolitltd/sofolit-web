
"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Calendar, Clock, ChevronLeft, Share2, Bookmark } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const blogPostsData = {
  "launching-mvp-solo-founder": {
    title: "How to Launch Your MVP in 4 Weeks as a Solo Founder",
    date: "March 15, 2024",
    readTime: "6 min read",
    category: "Strategy",
    image: "blog-1",
    content: `
      <p>As a solo founder, your greatest advantage is speed. While large teams get bogged down in consensus and bureaucracy, you can move from an idea to a live product in a matter of weeks if you follow the right framework.</p>
      
      <h2>1. Define the 'Core Value'</h2>
      <p>Stop thinking about features and start thinking about the single most important problem you are solving. If your app is a grocery tracker, the core value isn't 'social sharing'—it's 'accurate inventory management'. Strip everything else away.</p>
      
      <h2>2. Choose a 'Boring' Tech Stack</h2>
      <p>Now is not the time to learn a niche language. Use technologies that are robust, well-documented, and fast to deploy. We recommend Next.js paired with Firebase for most solo-led MVPs. It handles auth, database, and hosting with minimal setup.</p>
      
      <h2>3. The 'Good Enough' Design</h2>
      <p>Don't spend weeks on custom icons. Use high-quality component libraries like Shadcn UI and Lucide Icons. Focus on user experience (UX) over visual flourish. A clean, usable interface wins over a buggy, 'artistic' one every time.</p>
      
      <blockquote>"Done is better than perfect. Launch early, listen to your users, and iterate fast. Your first version is just the beginning of the conversation."</blockquote>
    `
  }
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPostsData[slug as keyof typeof blogPostsData];

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-black">Article Not Found</h1>
          <p className="text-muted-foreground">The post you are looking for doesn't exist or has been moved.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-bold">
            <ChevronLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const postImg = PlaceHolderImages.find(img => img.id === post.image);

  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container px-4 mx-auto max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-12 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
        </Link>

        <div className="space-y-8 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-y border-border py-6">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime}</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full border border-border hover:bg-muted transition-colors"><Share2 className="w-4 h-4" /></button>
              <button className="p-2 rounded-full border border-border hover:bg-muted transition-colors"><Bookmark className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-16 border border-border shadow-2xl">
          {postImg && (
            <Image 
              src={postImg.imageUrl} 
              alt={post.title} 
              fill 
              className="object-cover"
              data-ai-hint={postImg.imageHint}
            />
          )}
        </div>

        <article 
          className="prose prose-lg dark:prose-invert max-w-none mb-32
          prose-headings:font-black prose-headings:tracking-tight
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="p-12 rounded-[3rem] glass-card border-primary/20 bg-primary/5 text-center space-y-6 mb-32">
          <h3 className="text-3xl font-black">Ready to build your own MVP?</h3>
          <p className="text-muted-foreground text-lg">We help solo founders transform their vision into high-fidelity products in weeks, not months.</p>
          <div className="pt-4">
            <Link href="/#contact" className="px-10 py-4 rounded-full bg-primary text-white font-bold hover:shadow-xl transition-all inline-block">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
