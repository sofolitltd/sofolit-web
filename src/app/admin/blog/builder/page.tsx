
"use client";

import React, { useState, useEffect, useTransition } from "react";
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
  Loader2
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

export default function BlogBuilderPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

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

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-500" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-slate-900 leading-tight">Create Blog Post</h1>
            <p className="text-xs text-slate-400 font-medium">Enterprise content editor powered by Neon.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Eye className="w-4 h-4" /> Preview
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isPending}
            className="bg-slate-900 text-white hover:bg-black gap-2 min-w-[120px]"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isPending ? "Saving..." : "Save Post"}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Title</Label>
                    <Input 
                      placeholder="Your Awesome Blog Title" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="h-12 bg-white border-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Slug</Label>
                    <Input 
                      placeholder="your-awesome-slug" 
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="h-12 bg-white border-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Content</Label>
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-100 bg-slate-50/50">
                      {[
                        { icon: <Bold className="w-4 h-4" />, label: "Bold" },
                        { icon: <Italic className="w-4 h-4" />, label: "Italic" },
                        { icon: <Heading1 className="w-4 h-4" />, label: "H1" },
                        { icon: <Heading2 className="w-4 h-4" />, label: "H2" },
                        { icon: <LinkIcon className="w-4 h-4" />, label: "Link" },
                        { icon: <Quote className="w-4 h-4" />, label: "Quote" },
                        { icon: <Code className="w-4 h-4" />, label: "Code" },
                        { icon: <ImageIcon className="w-4 h-4" />, label: "Image" },
                        { icon: <List className="w-4 h-4" />, label: "List" },
                      ].map((tool, i) => (
                        <button key={i} className="p-2 hover:bg-white hover:shadow-sm rounded transition-all text-slate-500 hover:text-blue-600">
                          {tool.icon}
                        </button>
                      ))}
                    </div>
                    <div className="min-h-[400px]">
                      <textarea 
                        className="w-full h-full min-h-[400px] p-6 text-sm leading-relaxed outline-none resize-none placeholder:text-slate-300"
                        placeholder="Start writing your story..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Excerpt</Label>
                  <Textarea 
                    placeholder="A brief summary for list views." 
                    className="min-h-[100px] bg-white border-slate-200"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Publish Status</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Make this visible to the world.</p>
                </div>
                <Switch 
                  checked={isPublished} 
                  onCheckedChange={setIsPublished} 
                  className="data-[state=checked]:bg-green-500"
                />
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="p-6 pb-2 border-b border-slate-50">
                <CardTitle className="text-lg font-black text-slate-900">Organization</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center justify-between group">
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id={cat.id} 
                          checked={cat.checked}
                          onCheckedChange={() => toggleCategory(cat.id)}
                        />
                        <label htmlFor={cat.id} className="text-sm font-bold text-slate-600 cursor-pointer">{cat.name}</label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder="New category..." 
                      className="h-10 text-xs font-medium"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Button 
                      size="icon" 
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600"
                      onClick={handleAddCategory}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="p-6 pb-2 border-b border-slate-50">
                <CardTitle className="text-lg font-black text-slate-900">Featured Image</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-video rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center cursor-pointer group">
                  <UploadCloud className="w-6 h-6 text-slate-400 mb-2" />
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Click to upload</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
