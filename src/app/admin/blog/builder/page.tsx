"use client";

import React, { useState, useEffect, useTransition, Suspense } from "react";
import { 
  ChevronLeft, 
  Save, 
  ImageIcon, 
  Loader2,
  X,
  Check,
  Eye,
  Edit3
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { saveBlogPost, uploadBlogImage, getAdminPostById } from "@/lib/actions/blog";
import { getCategories } from "@/lib/actions/categories";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/db/schema";
import { marked } from "marked";

function BlogBuilderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editingId = searchParams.get("id");
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

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

  const renderedPreview = marked.parse(content || "");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/blog"><ChevronLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{editingId ? "Edit Article" : "New Article"}</h1>
            <p className="text-sm text-muted-foreground">Draft and publish your next insight.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {editingId && (
            <Button variant="outline" size="sm" asChild>
               <Link href={`/blog/${slug}`} target="_blank">View Live</Link>
            </Button>
          )}
          <Button size="sm" onClick={handleSave} disabled={isPending || isUploading}>
            {isPending || isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {editingId ? "Update" : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Article Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title"
                  placeholder="Enter article title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input 
                  id="slug"
                  placeholder="article-url-slug" 
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea 
                  id="excerpt"
                  placeholder="Brief summary of the article..." 
                  className="min-h-[80px]"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Content Body</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="write" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="write" className="gap-2">
                    <Edit3 className="h-3.5 w-3.5" /> Write
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="gap-2">
                    <Eye className="h-3.5 w-3.5" /> Preview
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="write" className="mt-0">
                  <Textarea 
                    placeholder="Write your article in Markdown..." 
                    className="min-h-[500px] font-mono text-sm leading-relaxed"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </TabsContent>
                <TabsContent value="preview" className="mt-0">
                  <div 
                    className="min-h-[500px] p-4 border rounded-md bg-muted/30 prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: renderedPreview }}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Visibility</Label>
                <p className="text-xs text-muted-foreground">Make public on the site.</p>
              </div>
              <Switch checked={isPublished} onCheckedChange={setIsPublished} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Categories</Label>
                <div className="grid gap-2 border rounded-md p-3 max-h-[180px] overflow-y-auto">
                  {dbCategories.map(cat => (
                    <div 
                      key={cat.id} 
                      className="flex items-center gap-2 cursor-pointer group"
                      onClick={() => toggleCategory(cat.id)}
                    >
                      <div className={cn(
                        "h-4 w-4 rounded border flex items-center justify-center transition-colors",
                        selectedCategoryIds.includes(cat.id) ? "bg-primary border-primary" : "border-input group-hover:border-primary/50"
                      )}>
                        {selectedCategoryIds.includes(cat.id) && <Check className="h-3 w-3 text-primary-foreground" />}
                      </div>
                      <span className="text-sm">{cat.name}</span>
                    </div>
                  ))}
                  {dbCategories.length === 0 && <p className="text-xs text-muted-foreground">No categories available.</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input 
                  id="tags"
                  placeholder="Enter tag and press Enter" 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                />
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 pl-2 pr-1 h-6">
                      {tag}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 rounded-full p-0 hover:bg-transparent hover:text-destructive"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div 
                  className="relative aspect-video rounded-md border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors overflow-hidden"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <input 
                    id="image-upload"
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setPendingImage(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {pendingImage || featuredImage ? (
                    <Image 
                      src={pendingImage || featuredImage} 
                      alt="Featured image" 
                      fill 
                      className="object-cover" 
                      unoptimized={!!pendingImage}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <ImageIcon className="h-8 w-8" />
                      <span className="text-xs">Click to upload image</span>
                    </div>
                  )}
                </div>
                {(pendingImage || featuredImage) && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-destructive hover:text-destructive" 
                    onClick={() => { setPendingImage(null); setFeaturedImage(""); }}
                  >
                    Remove Image
                  </Button>
                )}
              </div>
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
