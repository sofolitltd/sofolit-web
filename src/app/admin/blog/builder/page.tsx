
"use client";

import React, { useState, useEffect, useTransition, useRef } from "react";
import { 
  ChevronLeft, 
  Save, 
  Eye, 
  Plus, 
  ImageIcon, 
  Link as LinkIcon,
  Bold,
  Italic,
  Quote,
  List,
  Heading1,
  Heading2,
  Code,
  Loader2,
  Minus,
  Type
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

    // Re-focus and set cursor position after render
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + selected.length + suffix.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
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
          title: "Article Saved",
          description: "Your changes have been synced to the database.",
        });
        router.push("/admin/blog");
      } else {
        toast({
          variant: "destructive",
          title: "Persistence Error",
          description: result.error || "We couldn't reach the database.",
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
    <div className="min-h-screen bg-[#FDFDFD] pb-20">
      {/* Enterprise Top Bar - Fixed and Polished */}
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
            disabled={isPending}
            className="bg-slate-900 text-white hover:bg-black font-black text-xs px-8 h-10 gap-2 rounded-full shadow-lg shadow-slate-900/10 transition-all active:scale-95"
          >
            {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
            {isPending ? "Syncing..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Editor Area */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Headline</Label>
                <Input 
                  placeholder="The Future of Product Strategy..." 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-16 bg-white border-slate-200 focus:border-blue-500/30 text-2xl font-black placeholder:text-slate-200 transition-all rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Markdown Content</Label>
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500/5 transition-all">
                  <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-100 bg-slate-50/50">
                    {toolbarItems.map((tool, i) => (
                      <button 
                        key={i} 
                        onClick={(e) => {
                          e.preventDefault();
                          tool.action();
                        }}
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
                  className="min-h-[120px] bg-white border-slate-200 focus:border-blue-500/30 text-sm leading-relaxed rounded-xl p-5"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Sidebar Inspector */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between bg-slate-50/30">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Visibility</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Online Status</p>
                </div>
                <Switch 
                  checked={isPublished} 
                  onCheckedChange={setIsPublished} 
                  className="data-[state=checked]:bg-blue-600"
                />
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm rounded-2xl">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Metadata</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-500">URL SLUG</Label>
                  <Input 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="h-10 bg-slate-50/50 border-slate-100 text-xs font-mono text-slate-500 rounded-lg"
                  />
                </div>
                
                <div className="space-y-3 pt-2">
                  <Label className="text-[10px] font-black text-slate-500">CATEGORY</Label>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <div 
                        key={cat.id} 
                        onClick={() => toggleCategory(cat.id)}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group",
                          cat.checked ? "bg-blue-50 border-blue-100 text-blue-600" : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
                        )}
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest">{cat.name}</span>
                        {cat.checked && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Input 
                      placeholder="Add..." 
                      className="h-9 text-[10px] font-black uppercase tracking-widest bg-slate-50/50 border-slate-100 rounded-lg"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Button 
                      size="icon" 
                      variant="ghost"
                      className="h-9 w-9 shrink-0 hover:bg-slate-100 rounded-lg"
                      onClick={handleAddCategory}
                    >
                      <Plus className="w-4 h-4 text-slate-400" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm rounded-2xl">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Media Assets</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/20 flex flex-col items-center justify-center cursor-pointer group hover:bg-blue-50/20 hover:border-blue-100 transition-all">
                  <div className="p-4 rounded-full bg-white shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <Type className="w-5 h-5 text-slate-300 group-hover:text-blue-600" />
                  </div>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Select Featured Image</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
