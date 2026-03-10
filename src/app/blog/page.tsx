"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { getPublicPosts } from "@/lib/actions/blog";
import type { Post } from "@/lib/db/schema";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const data = await getPublicPosts();
      setPosts(data);
      setLoading(false);
    }
    loadPosts();
  }, []);

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container px-4 mx-auto text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 mb-6">
          Vision, Growth & Strategy
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          The <span className="text-gradient">Founder's</span> Handbook
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
          Actionable strategies on **MVP development**, **SaaS scaling**, and **premium product strategy** tailored for the modern solo entrepreneur.
        </p>
      </div>

      <section className="container px-4 mx-auto mb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary/30" />
            <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mt-4">Consulting Database...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-[3rem]">
            <p className="text-muted-foreground font-bold uppercase tracking-widest">No articles found in the journal yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              // Fallback to placeholder if featuredImage id not found
              const postImg = PlaceHolderImages.find(img => img.id === post.featuredImage) || PlaceHolderImages[10];
              const readTime = calculateReadTime(post.content);
              
              return (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col glass-card border-border/50 rounded-3xl overflow-hidden hover:border-primary/40 transition-all hover:translate-y-[-4px]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={postImg.imageUrl} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      data-ai-hint={postImg.imageHint}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest border border-border">
                        {post.category || "Uncategorized"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {readTime} min read
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
        )}
      </section>

      <Footer />
    </main>
  );
}
