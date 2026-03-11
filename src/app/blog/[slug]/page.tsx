
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Calendar, Clock, ChevronLeft, Share2, Bookmark, ArrowRight, User, Tag } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { getPostBySlug, getPublicPosts } from "@/lib/actions/blog";
import { getCategories } from "@/lib/actions/categories";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { Badge } from "@/components/ui/badge";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPublicPosts();
  const allCategories = await getCategories();
  const relatedPosts = (allPosts || []).filter(p => p.slug !== slug).slice(0, 3);

  const calculateReadTime = (content?: string | null) => {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
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

  // Configure marked for safe and high-fidelity parsing
  const htmlContent = await marked.parse(post.content || "");
  
  // Handle dynamic categories from categoriesData
  const categoryIds = Array.isArray(post.categoriesData) ? post.categoriesData as number[] : [];
  const activeCategories = allCategories.filter(c => categoryIds.includes(c.id));
  const tags = Array.isArray(post.tags) ? post.tags as string[] : [];

  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container px-4 mx-auto max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-12 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Handbook
        </Link>

        <div className="space-y-8 mb-16">
          <div className="flex flex-wrap items-center gap-3">
            {activeCategories.length > 0 ? (
              activeCategories.map((cat) => (
                <Badge key={cat.id} className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black uppercase tracking-widest hover:bg-primary/20">
                  {cat.name}
                </Badge>
              ))
            ) : (
              <Badge className="bg-muted text-muted-foreground border-border text-[10px] font-black uppercase tracking-widest">
                Uncategorized
              </Badge>
            )}
            <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              <User className="w-3 h-3" /> {post.author || "Md Asifuzzaman Reyad"}
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

        <div className="relative aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 border border-border shadow-2xl">
          <Image 
            src={postImg.imageUrl || "https://picsum.photos/seed/post/1200/630"} 
            alt={post.title} 
            fill 
            className="object-cover"
          />
        </div>

        <article 
          className="prose prose-lg dark:prose-invert max-w-none mb-24
          prose-headings:text-foreground prose-p:text-muted-foreground/90 prose-p:leading-relaxed prose-p:text-lg
          prose-a:no-underline prose-a:border-b-2 prose-a:border-primary/30 hover:prose-a:border-primary transition-all
          prose-blockquote:not-italic prose-blockquote:font-medium prose-blockquote:bg-muted/30 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:rounded-r-2xl prose-blockquote:px-8 prose-blockquote:py-6
          prose-pre:shadow-2xl prose-pre:border prose-pre:border-white/10
          prose-img:rounded-[2rem] prose-img:border prose-img:border-border
          prose-ul:list-disc prose-ol:list-decimal"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-24 pb-12 border-b border-border">
            <Tag className="w-4 h-4 text-muted-foreground mr-2" />
            {tags.map((tag, i) => (
              <span key={i} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-full border border-border">
                #{tag}
              </span>
            ))}
          </div>
        )}

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
                        src={relImg.imageUrl || "https://picsum.photos/seed/related/800/600"} 
                        alt={related.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-2">
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
