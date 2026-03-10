
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Calendar, Clock, ChevronLeft, Share2, Bookmark, ArrowRight, User } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { getPostBySlug, getPublicPosts } from "@/lib/actions/blog";
import { notFound } from "next/navigation";
import { marked } from "marked";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPublicPosts();
  const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 3);

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const isExternalUrl = post.featuredImage?.startsWith('http');
  const postImg = isExternalUrl 
    ? { imageUrl: post.featuredImage! } 
    : PlaceHolderImages.find(img => img.id === post.featuredImage) || PlaceHolderImages[10];

  const readTime = calculateReadTime(post.content);
  const publishDate = post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }) : 'Recent';

  const htmlContent = marked.parse(post.content || "");

  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container px-4 mx-auto max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-12 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Handbook
        </Link>

        <div className="space-y-8 mb-16">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20">
              {post.category || "Uncategorized"}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              <User className="w-3 h-3" /> {post.author}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-y border-border py-6">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2 font-medium"><Calendar className="w-4 h-4" /> {publishDate}</span>
              <span className="flex items-center gap-2 font-medium"><Clock className="w-4 h-4" /> {readTime} min read</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full border border-border hover:bg-muted transition-colors"><Share2 className="w-4 h-4" /></button>
              <button className="p-2 rounded-full border border-border hover:bg-muted transition-colors"><Bookmark className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-16 border border-border shadow-2xl">
          <Image 
            src={postImg.imageUrl} 
            alt={post.title} 
            fill 
            className="object-cover"
          />
        </div>

        <article 
          className="prose prose-lg dark:prose-invert max-w-none mb-24
          prose-headings:font-black prose-headings:tracking-tight
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-pre:bg-slate-900 prose-pre:rounded-2xl prose-pre:p-6 prose-pre:border prose-pre:border-white/10
          prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {relatedPosts.length > 0 && (
          <div className="pt-24 border-t border-border mb-32">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black tracking-tight">More from the Handbook</h2>
              <Link href="/blog" className="text-sm font-bold text-primary flex items-center gap-2 hover:underline">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => {
                const relIsExternal = related.featuredImage?.startsWith('http');
                const relImg = relIsExternal 
                  ? { imageUrl: related.featuredImage! } 
                  : PlaceHolderImages.find(img => img.id === related.featuredImage) || PlaceHolderImages[10];
                return (
                  <Link 
                    key={related.id} 
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col space-y-4"
                  >
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-border">
                      <Image 
                        src={relImg.imageUrl} 
                        alt={related.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">{related.category || "General"}</span>
                      <h3 className="text-lg font-black group-hover:text-primary transition-colors leading-tight line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
