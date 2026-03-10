"use client";

import React, { useState, useEffect, useTransition, useRef } from "react";
import { 
  ChevronLeft, 
  Save, 
  Eye, 
  ImageIcon, 
  Loader2,
  Minus,
  Type,
  Bold,
  Italic,
  Heading1,
  Heading2,
  Code,
  Quote,
  List,
  Link as LinkIcon,
  X,
  Info,
  Tag as TagIcon,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { saveBlogPost, uploadBlogImage } from "@/lib/actions/blog";
import { getCategories } from "@/lib/actions/categories";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Category } from "@/lib/db/schema";

export default function BlogBuilderPage() {
  const router = useRouter();
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
  
  const [dbCategories, setDbCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    async function load() {
      const cats = await getCategories();
      setDbCategories(cats);
    }
    load();
  }, []);

  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  }, [title]);

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const before = text.substring(0, start);
    const after = text.substring(end);

    const newContent = `${before}${prefix}${selected}${suffix}${after}`;
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + selected.length + suffix.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

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
        description: "Please provide both a title and content for your article.",
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
        title,
        slug,
        excerpt,
        content,
        isPublished,
        featuredImage: finalImageUrl,
        categoryIds: selectedCategoryIds,
        tags: tags,
        author: "Md Asifuzzaman Reyad",
      });

      if (result.success) {
        toast({ title: "Article Saved", description: "Content and media have been synchronized." });
        router.push("/admin/blog");
      } else {
        toast({ variant: "destructive", title: "Persistence Error", description: result.error });
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

  const toolbarItems = [
    { icon: <Bold className="w-4 h-4" />, action: () => insertMarkdown("**", "**"), label: "Bold" },
    { icon: <Italic className="w-4 h-4" />, action: () => insertMarkdown("_", "_"), label: "Italic" },
    { icon: <Heading1 className="w-4 h-4" />, action: () => insertMarkdown("# ", ""), label: "H1" },
    { icon: <Heading2 className="w-4 h-4" />, action: () => insertMarkdown("## ", ""), label: "H2" },
    { icon: <LinkIcon className="w-4 h-4" />, action: () => insertMarkdown("[", "](url)"), label: "Link" },
    { icon: <Quote className="w-4 h-4" />, action: () => insertMarkdown("> ", ""), label: "Quote" },
    { icon: <Code className="w-4 h-4" />, action: () => insertMarkdown("`", "`"), label: "Code" },
    { icon: <List className="w-4 h-4" />, action: () => insertMarkdown("- ", ""), label: "List" },
    { icon: <Minus className="w-4 h-4" />, action: () => insertMarkdown("\n---\n", ""), label: "Divider" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20">
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/admin/blog" className="p-2 hover:bg-slate-50 rounded-full transition-colors group">
            <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Article Editor</span>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isPublished ? "Public" : "Draft Mode"}</span>
            </div>
            <h1 className="text-sm font-black text-slate-900 truncate max-w-[300px]">
              {title || "Drafting New Article..."}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-500 hover:text-slate-900 gap-2">
            <Eye className="w-4 h-4" /> Preview
          </Button>
          <div className="w-px h-6 bg-slate-200 mx-1" />
          <Button 
            onClick={handleSave} 
            disabled={isPending || isUploading}
            className="bg-slate-900 text-white hover:bg-black font-black text-xs px-8 h-10 gap-2 rounded-full shadow-lg transition-all active:scale-95"
          >
            {isPending || isUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
            {isUploading ? "Uploading Assets..." : isPending ? "Syncing DB..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Headline</Label>
                <Input 
                  placeholder="The Future of Product Strategy..." 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-16 bg-white border-slate-200 focus:border-blue-500/30 text-2xl font-black rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Markdown Content</Label>
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500/5 transition-all">
                  <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-100 bg-slate-50/50">
                    {toolbarItems.map((tool, i) => (
                      <button 
                        key={i} 
                        onClick={(e) => { e.preventDefault(); tool.action(); }}
                        type="button"
                        className="p-2.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-400 hover:text-blue-600"
                        title={tool.label}
                      >
                        {tool.icon}
                      </button>
                    ))}
                  </div>
                  <textarea 
                    ref={textareaRef}
                    className="w-full min-h-[600px] p-10 text-base leading-relaxed outline-none resize-none placeholder:text-slate-200 font-mono text-slate-700"
                    placeholder="Start writing your story in Markdown..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Brief Excerpt</Label>
                <Textarea 
                  placeholder="A short summary for search results and social sharing." 
                  className="min-h-[120px] bg-white border-slate-200 text-sm rounded-xl p-5"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between bg-slate-50/30">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Visibility</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Online Status</p>
                </div>
                <Switch checked={isPublished} onCheckedChange={setIsPublished} className="data-[state=checked]:bg-blue-600" />
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm rounded-2xl">
              <CardHeader className="p-6 pb-2 flex items-center justify-between">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Taxonomy</CardTitle>
                <Link href="/admin/blog/categories" className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Manage
                </Link>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black text-slate-500 flex items-center gap-2">
                    <List className="w-3 h-3" /> CATEGORIES
                  </Label>
                  <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {dbCategories.length === 0 ? (
                      <p className="text-[10px] text-slate-400 font-bold uppercase text-center py-4 border border-dashed rounded-xl">No categories found</p>
                    ) : dbCategories.map((cat) => (
                      <div 
                        key={cat.id} 
                        onClick={() => toggleCategory(cat.id)}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer",
                          selectedCategoryIds.includes(cat.id) ? "bg-blue-50 border-blue-100 text-blue-600" : "bg-white border-slate-100 text-slate-500"
                        )}
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest">{cat.name}</span>
                        {selectedCategoryIds.includes(cat.id) && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black text-slate-500 flex items-center gap-2">
                    <TagIcon className="w-3 h-3" /> TAGS
                  </Label>
                  <div className="space-y-4">
                    <Input 
                      placeholder="Type and press Enter..." 
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={addTag}
                      className="h-10 bg-slate-50/50 border-slate-100 text-xs rounded-lg"
                    />
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className="bg-slate-100 text-slate-600 hover:bg-slate-200 px-3 py-1 rounded-full text-[10px] font-bold gap-2 cursor-default group"
                        >
                          {tag}
                          <X 
                            className="w-3 h-3 cursor-pointer text-slate-400 hover:text-red-500" 
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm rounded-2xl">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">SEO Meta</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-500">URL SLUG</Label>
                  <Input 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="h-10 bg-slate-50/50 border-slate-100 text-xs font-mono text-slate-500 rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm rounded-2xl">
              <CardHeader className="p-6 pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Media Assets</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-slate-300 hover:text-blue-500 transition-colors">
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-900 text-white text-[10px] font-bold border-none p-3 max-w-[200px]">
                      Recommended: 1200 x 630 pixels. (1.91:1 ratio) for optimal SEO and social sharing.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardHeader>
              <CardContent className="p-6">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                <div className="relative">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative aspect-video rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/20 flex flex-col items-center justify-center cursor-pointer group hover:bg-blue-50/20 hover:border-blue-100 transition-all overflow-hidden"
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
                      <>
                        <div className="p-4 rounded-full bg-white shadow-sm mb-3 group-hover:scale-110 transition-transform">
                          <ImageIcon className="w-5 h-5 text-slate-300 group-hover:text-blue-600" />
                        </div>
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest text-center px-4">
                          Select Featured Image
                        </p>
                      </>
                    )}
                  </div>
                  {(pendingImage || featuredImage) && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setPendingImage(null);
                        setFeaturedImage("");
                      }}
                      className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors z-10"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                {(pendingImage) && (
                  <p className="mt-3 text-[9px] text-blue-600 font-bold uppercase text-center animate-pulse">
                    Image selected. Will upload on save.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
