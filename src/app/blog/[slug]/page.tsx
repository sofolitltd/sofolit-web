
"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Calendar, Clock, ChevronLeft, Share2, Bookmark, Calendar as CalendarIcon } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { blogPosts } from "@/lib/blog-data";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  const CALENDLY_URL = "https://calendly.com/sofolitltd/30min";

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
            <a 
              href={CALENDLY_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-10 py-4 rounded-full bg-primary text-white font-bold hover:shadow-xl transition-all inline-flex items-center gap-2"
            >
              <CalendarIcon className="w-5 h-5" /> Book a Call
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
