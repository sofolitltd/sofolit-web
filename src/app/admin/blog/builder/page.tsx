
"use client";

import React, { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  Save, 
  Eye, 
  Settings2, 
  FileText, 
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
  X,
  Check
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function BlogBuilderPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [categories, setCategories] = useState([
    { id: "1", name: "Bipolar Disorder", checked: false },
    { id: "2", name: "Disorder", checked: false },
    { id: "3", name: "Mental Health", checked: false },
    { id: "4", name: "Parenting", checked: false },
    { id: "5", name: "Psycho Education", checked: false },
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
      cat.id === id ? { ...cat, checked: !cat.checked } : cat
    ));
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-500" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-slate-900 leading-tight">Create New Blog Post</h1>
            <p className="text-xs text-slate-400 font-medium">Write the main content of your blog post here.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Eye className="w-4 h-4" /> Preview
          </Button>
          <Button className="bg-slate-900 text-white hover:bg-black gap-2">
            <Save className="w-4 h-4" /> Save Post
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content Area */}
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
                    <p className="text-[10px] text-slate-400 font-medium">The unique URL for this post.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Content</Label>
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                    {/* Toolbar */}
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
                        { icon: <List className="w-4 h-4" />, label: "Bulleted List" },
                        { icon: <ListOrdered className="w-4 h-4" />, label: "Numbered List" },
                      ].map((tool, i) => (
                        <button key={i} className="p-2 hover:bg-white hover:shadow-sm rounded transition-all text-slate-500 hover:text-blue-600" title={tool.label}>
                          {tool.icon}
                        </button>
                      ))}
                    </div>
                    {/* Editor Textarea */}
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
                  <Label className="text-sm font-bold text-slate-700">Short Description (Excerpt)</Label>
                  <Textarea 
                    placeholder="A brief summary that appears in list views." 
                    className="min-h-[100px] bg-white border-slate-200"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Status Card */}
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Status</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Publish this post to make it visible.</p>
                </div>
                <Switch 
                  checked={isPublished} 
                  onCheckedChange={setIsPublished} 
                  className="data-[state=checked]:bg-green-500"
                />
              </CardContent>
            </Card>

            {/* Organization Card */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="p-6 pb-2 border-b border-slate-50">
                <CardTitle className="text-lg font-black text-slate-900">Organization</CardTitle>
                <p className="text-xs text-slate-400 font-medium">Select one or more categories.</p>
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
                          className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <label 
                          htmlFor={cat.id}
                          className="text-sm font-bold text-slate-600 cursor-pointer select-none"
                        >
                          {cat.name}
                        </label>
                      </div>
                      <button 
                        onClick={() => removeCategory(cat.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <Label className="text-xs font-bold text-slate-900 uppercase tracking-widest">Add new category</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder="New category..." 
                      className="h-10 text-xs font-medium"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Button 
                      size="icon" 
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 shadow-none border border-slate-200"
                      onClick={handleAddCategory}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image Card */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="p-6 pb-2 border-b border-slate-50">
                <CardTitle className="text-lg font-black text-slate-900">Featured Image</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-video rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 transition-colors flex flex-col items-center justify-center cursor-pointer group">
                  <div className="p-3 bg-white rounded-full shadow-sm text-slate-400 group-hover:text-blue-500 transition-all mb-3">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-700">Click to upload <span className="text-slate-400 font-medium">or drag and drop</span></p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">PNG, JPG or WEBP (MAX. 5MB)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
