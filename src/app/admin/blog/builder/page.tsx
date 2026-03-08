"use client";

import React, { useState, useEffect, useTransition, useRef } from "react";
import { 
  ChevronLeft, 
  Save, 
  Eye, 
  Plus, 
  Type, 
  Image as ImageIcon, 
  Link as LinkIcon,
  Bold,
  Italic,
  Quote,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Code,
  Trash2,
  UploadCloud,
  Loader2,
  Minus
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { saveBlogPost } from "@/lib/actions/blog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function BlogBuilderPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [categories, setCategories] = useState([
    { id: "1", name: "Strategy", checked: false },
    { id: "2", name: "Engineering", checked: false },
    { id: "3", name: "Growth", checked: false },
  ]);
  const [newCategory, setNewCategory] = useState("");

  // Auto-slug generation
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

    // Reset focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        end + prefix.length
      );
    }, 0);
  };

  const handleSave = async () => {
    if (!title || !content) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Title and Content are required fields.",
      });
      return;
    }

    const selectedCategory = categories.find(c => c.checked)?.name || "Uncategorized";

    startTransition(async () => {
      const result = await saveBlogPost({
        title,
        slug,
        excerpt,
        content,
        isPublished,
        category: selectedCategory,
        author: "Alex Sofol",
      });

      if (result.success) {
        toast({
          title: "Post Saved",
          description: "Your blog post has been successfully stored in the database.",
        });
        router.push("/admin/blog");
      } else {
        toast({
          variant: "destructive",
          title: "Database Error",
          description: result.error || "Failed to save the post.",
        });
      }
    });
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { 
        id: Math.random().toString(), 
        name: newCategory.trim(), 
        checked: false 
      }]);
      setNewCategory("");
    }
  };

  const toggleCategory = (id: string) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, checked: !cat.checked } : { ...cat, checked: false }
    ));
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
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Sleek Enterprise Top Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-3 flex items-center justify-between shadow-sm backdrop-blur-md bg-white/90">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 hover:bg-slate-100 rounded-lg transition-colors group">
            <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Editor</span>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isPublished ? "Public" : "Draft"}</span>
            </div>
            <h1 className="text-sm font-black text-slate-900 truncate max-w-[200px] md:max-w-md">
              {title || "Untitled Post"}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-xs font-bold gap-2 text-slate-500 hover:text-slate-900">
            <Eye className="w-4 h-4" /> Preview
          </Button>
          <div className="w-px h-6 bg-slate-200 mx-2" />
          <Button 
            onClick={handleSave} 
            disabled={isPending}
            className="bg-slate-900 text-white hover:bg-black font-black text-xs px-6 h-9 gap-2 shadow-lg shadow-slate-900/10"
          >
            {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
            {isPending ? "Syncing..." : "Save Article"}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Pane */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-200 shadow-sm border-none bg-white">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Article Title</Label>
                    <Input 
                      placeholder="e.g., Scaling Solo Ventures with AI" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="h-14 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500/20 text-xl font-black placeholder:text-slate-300 transition-all"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">URL Slug</Label>
                      <Input 
                        placeholder="scaling-solo-ventures" 
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="h-10 bg-slate-50 border-transparent text-xs font-medium text-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Author</Label>
                      <Input 
                        disabled
                        value="Alex Sofol"
                        className="h-10 bg-slate-50 border-transparent text-xs font-bold text-slate-900 opacity-60"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Content Body (Markdown)</Label>
                  <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50 group focus-within:border-blue-500/20 transition-all">
                    <div className="flex flex-wrap items-center gap-1 p-3 border-b border-slate-100 bg-white">
                      {toolbarItems.map((tool, i) => (
                        <button 
                          key={i} 
                          onClick={tool.action}
                          type="button"
                          className="p-2 hover:bg-slate-50 rounded-lg transition-all text-slate-400 hover:text-blue-600 flex items-center gap-2 text-[10px] font-bold"
                          title={tool.label}
                        >
                          {tool.icon}
                        </button>
                      ))}
                    </div>
                    <div className="min-h-[500px] relative bg-white">
                      <textarea 
                        ref={textareaRef}
                        className="w-full h-full min-h-[500px] p-8 text-sm leading-relaxed outline-none resize-none placeholder:text-slate-200 font-mono bg-transparent"
                        placeholder="Build your story with Markdown..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Brief Excerpt</Label>
                  <Textarea 
                    placeholder="A 2-sentence summary for the blog feed." 
                    className="min-h-[100px] bg-slate-50 border-transparent focus:bg-white text-sm leading-relaxed"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar Inspector */}
          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm border-none bg-white overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Visibility</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Public Access</p>
                </div>
                <Switch 
                  checked={isPublished} 
                  onCheckedChange={setIsPublished} 
                  className="data-[state=checked]:bg-blue-600"
                />
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm border-none bg-white">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Primary Category</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <div 
                      key={cat.id} 
                      onClick={() => toggleCategory(cat.id)}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group",
                        cat.checked ? "bg-blue-50 border-blue-100 text-blue-600" : "bg-slate-50 border-transparent text-slate-500 hover:border-slate-200"
                      )}
                    >
                      <span className="text-xs font-black uppercase tracking-widest">{cat.name}</span>
                      <Checkbox 
                        id={cat.id} 
                        checked={cat.checked}
                        onCheckedChange={() => toggleCategory(cat.id)}
                        className="hidden"
                      />
                      {cat.checked && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder="Add custom..." 
                      className="h-10 text-[10px] font-black uppercase tracking-widest bg-slate-50 border-transparent"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Button 
                      size="icon" 
                      className="bg-slate-900 hover:bg-black text-white rounded-lg h-10 w-10 shrink-0"
                      onClick={handleAddCategory}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm border-none bg-white">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Featured Image</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-video rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center cursor-pointer group hover:bg-blue-50/30 hover:border-blue-200 transition-all">
                  <div className="p-3 rounded-full bg-white shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                  </div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Select Visual Asset</p>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 rounded-2xl bg-blue-600 text-white space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest">SEO Tip</h4>
              <p className="text-[11px] leading-relaxed font-medium opacity-90">
                Ensure your primary keyword is in the first 100 words of your content for better ranking in search results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
