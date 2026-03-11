"use client";

import React, { useState, useEffect, useTransition, useRef, Suspense } from "react";
import { 
  ChevronLeft, 
  Save, 
  Eye, 
  ImageIcon, 
  Loader2,
  X,
  Check
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { saveBlogPost, uploadBlogImage, getAdminPostById } from "@/lib/actions/blog";
import { getCategories } from "@/lib/actions/categories";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/db/schema";

function BlogBuilderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editingId = searchParams.get("id");
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [featuredImage, setFeaturedImage] = useState("");
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(!!editingId);
  
  const [dbCategories, setDbCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    async function load() {
      const cats = await getCategories();
      setDbCategories(cats);

      if (editingId) {
        const post = await getAdminPostById(parseInt(editingId));
        if (post) {
          setTitle(post.title);
          setSlug(post.slug);
          setExcerpt(post.excerpt || "");
          setContent(post.content);
          setIsPublished(post.isPublished || false);
          setFeaturedImage(post.featuredImage || "");
          setSelectedCategoryIds(post.categoriesData as number[] || []);
          setTags(post.tags as string[] || []);
        }
        setIsLoadingPost(false);
      }
    }
    load();
  }, [editingId]);

  useEffect(() => {
    if (editingId) return; 
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  }, [title, editingId]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File Too Large",
        description: "Please select an image smaller than 5MB.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPendingImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!title || !content) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide both a title and content.",
      });
      return;
    }

    startTransition(async () => {
      let finalImageUrl = featuredImage;

      if (pendingImage) {
        setIsUploading(true);
        const uploadResult = await uploadBlogImage(pendingImage);
        if (uploadResult.success && uploadResult.url) {
          finalImageUrl = uploadResult.url;
        } else {
          toast({ variant: "destructive", title: "Upload Failed", description: uploadResult.error });
          setIsUploading(false);
          return;
        }
        setIsUploading(false);
      }

      const result = await saveBlogPost({
        id: editingId ? parseInt(editingId) : undefined,
        title,
        slug,
        excerpt,
        content,
        isPublished,
        featuredImage: finalImageUrl,
        categoriesData: selectedCategoryIds,
        tags: tags,
      });

      if (result.success) {
        toast({ title: "Article Saved", description: "Changes have been successfully synchronized." });
        router.push("/admin/blog");
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error });
      }
    });
  };

  const toggleCategory = (id: number) => {
    setSelectedCategoryIds(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  if (isLoadingPost) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/blog"><ChevronLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{editingId ? "Edit Article" : "New Article"}</h1>
            <p className="text-muted-foreground">Draft and publish your next insight.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
             <Link href={editingId ? `/blog/${slug}` : "#"} target="_blank">View Preview</Link>
          </Button>
          <Button onClick={handleSave} disabled={isPending || isUploading}>
            {isPending || isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {editingId ? "Update Post" : "Publish Post"}
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>The core details of your article.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                  placeholder="Enter title..." 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input 
                  placeholder="article-slug" 
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea 
                  placeholder="A short summary..." 
                  className="min-h-[100px]"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Body (Markdown)</Label>
                <Textarea 
                  ref={textareaRef}
                  placeholder="Write your content here..." 
                  className="min-h-[400px] font-mono"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Status & Visibility</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Published</Label>
                <p className="text-xs text-muted-foreground">Make this post visible to everyone.</p>
              </div>
              <Switch checked={isPublished} onCheckedChange={setIsPublished} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
              <CardDescription>Categorize and tag your post.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Categories</Label>
                <div className="grid gap-2 border rounded-md p-3 max-h-[200px] overflow-auto">
                  {dbCategories.map(cat => (
                    <div 
                      key={cat.id} 
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => toggleCategory(cat.id)}
                    >
                      <div className={cn(
                        "h-4 w-4 rounded border flex items-center justify-center",
                        selectedCategoryIds.includes(cat.id) ? "bg-primary border-primary" : "border-input"
                      )}>
                        {selectedCategoryIds.includes(cat.id) && <Check className="h-3 w-3 text-primary-foreground" />}
                      </div>
                      <span className="text-sm">{cat.name}</span>
                    </div>
                  ))}
                  {dbCategories.length === 0 && <p className="text-xs text-muted-foreground">No categories found.</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <Input 
                  placeholder="Press Enter to add tags..." 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                />
                <div className="flex flex-wrap gap-2 pt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 px-2 py-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
              <CardDescription>Featured image for the post.</CardDescription>
            </CardHeader>
            <CardContent>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileSelect}
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative aspect-video rounded-md border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-accent transition-colors overflow-hidden"
              >
                {pendingImage || featuredImage ? (
                  <Image 
                    src={pendingImage || featuredImage} 
                    alt="Preview" 
                    fill 
                    className="object-cover" 
                    unoptimized={!!pendingImage}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImageIcon className="h-8 w-8" />
                    <span className="text-xs font-medium">Click to upload</span>
                  </div>
                )}
              </div>
              {(pendingImage || featuredImage) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-2 text-destructive" 
                  onClick={() => { setPendingImage(null); setFeaturedImage(""); }}
                >
                  Remove Image
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function BlogBuilderPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>}>
      <BlogBuilderForm />
    </Suspense>
  );
}
