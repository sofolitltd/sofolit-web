"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { getPublicPosts } from "@/lib/actions/blog";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Post } from "@/lib/db/schema";

export const LatestBlog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getPublicPosts();
      setPosts(data.slice(0, 3));
      setLoading(false);
    }
    load();
  }, []);

  if (loading || posts.length === 0) return null;

  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20">
              The Founder's Handbook
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Recent Insights</h2>
            <p className="text-muted-foreground max-w-lg text-lg">
              Actionable strategies to help you stand out and scale your vision.
            </p>
          </div>
          <Link href="/blog" className="text-primary font-bold flex items-center gap-2 group text-lg">
            View All Insights <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const isExternal = post.featuredImage?.startsWith('http');
            const postImg = isExternal
              ? { imageUrl: post.featuredImage!, imageHint: 'external image' }
              : PlaceHolderImages.find(img => img.id === post.featuredImage) || PlaceHolderImages[10];
            
            const words = post.content?.split(/\s+/).length || 0;
            const readTime = Math.max(1, Math.ceil(words / 200));

            return (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden hover:border-primary/40 transition-all hover:translate-y-[-4px]"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={postImg.imageUrl || "https://picsum.photos/seed/blog/800/600"} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    data-ai-hint={postImg.imageHint}
                  />
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.createdAt!).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {readTime} min read</span>
                  </div>
                  
                  <h3 className="text-xl font-black mb-4 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                      Read More <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};