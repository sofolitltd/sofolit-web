
"use client";

import React, { useState } from "react";
import { 
  ChevronLeft, 
  Save, 
  Eye, 
  Settings2, 
  FileText, 
  Search, 
  MoreVertical, 
  Plus, 
  Type, 
  Image as ImageIcon, 
  Hash, 
  Link as LinkIcon,
  Globe,
  Lock,
  History,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SanityStyleBuilder() {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  return (
    <div className="fixed inset-0 top-16 left-64 bg-white flex flex-col">
      {/* Sanity-style Top Navigation Bar */}
      <header className="h-14 border-b border-slate-200 flex items-center justify-between px-4 bg-white z-20">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 hover:bg-slate-50 rounded-md text-slate-400 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 leading-none">The Future of Solo Product Development</span>
              <span className="text-[10px] text-slate-400 font-medium">Post • Draft</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 mr-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Syncing...
          </div>
          <button className="p-2 hover:bg-slate-50 rounded text-slate-500">
            <History className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-slate-50 rounded text-slate-500">
            <Eye className="w-4 h-4" />
          </button>
          <div className="h-4 w-px bg-slate-200 mx-1" />
          <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-all flex items-center gap-2">
            Publish
          </button>
          <button className="p-2 hover:bg-slate-50 rounded text-slate-500">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Pane 1: Document Structure / Navigation (Sanity Style) */}
        <aside className="w-64 border-r border-slate-100 bg-slate-50/30 flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-white">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input 
                placeholder="Search..." 
                className="w-full bg-slate-50 border border-slate-200 rounded px-8 py-1.5 text-xs outline-none focus:ring-1 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-2 mb-1">
              Document Sections
            </div>
            {[
              { label: 'Main Content', icon: <Type className="w-3.5 h-3.5" />, active: activeTab === 'content', id: 'content' },
              { label: 'Metadata & SEO', icon: <Globe className="w-3.5 h-3.5" />, active: activeTab === 'seo', id: 'seo' },
              { label: 'Media Assets', icon: <ImageIcon className="w-3.5 h-3.5" />, active: activeTab === 'media', id: 'media' },
              { label: 'Social & Sharing', icon: <Hash className="w-3.5 h-3.5" />, active: activeTab === 'social', id: 'social' },
              { label: 'Access Control', icon: <Lock className="w-3.5 h-3.5" />, active: activeTab === 'access', id: 'access' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded text-xs font-bold transition-all",
                  item.active ? "bg-white text-blue-600 shadow-sm border border-slate-200" : "text-slate-500 hover:bg-slate-100"
                )}
              >
                <span className={cn(item.active ? "text-blue-600" : "text-slate-400")}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Pane 2: The Structured Editor */}
        <main className="flex-1 bg-white overflow-y-auto">
          <div className="max-w-4xl mx-auto py-12 px-12">
            <div className="space-y-12">
              {activeTab === 'content' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      Article Title <span className="text-red-500">*</span>
                    </label>
                    <input 
                      className="w-full text-3xl font-black border-b border-slate-100 focus:border-blue-500 outline-none pb-2 transition-colors placeholder:text-slate-200"
                      placeholder="Enter title..."
                      defaultValue="The Future of Solo Product Development"
                    />
                    <p className="text-[10px] text-slate-400 font-medium">This will be used as the primary H1 heading and page title.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-900">Slug</label>
                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded px-3 py-2">
                        <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs text-slate-500 font-mono">future-of-solo-product</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-900">Category</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-bold outline-none focus:ring-1 focus:ring-blue-500/20 cursor-pointer">
                        <option>Strategy</option>
                        <option>Engineering</option>
                        <option>Growth</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900">Main Excerpt</label>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded p-4 text-xs font-medium leading-relaxed outline-none focus:ring-1 focus:ring-blue-500/20 h-24 resize-none"
                      placeholder="A short summary for previews..."
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <label className="text-xs font-bold text-slate-900">Portable Text Content</label>
                      <div className="flex gap-1">
                        <button className="p-1 hover:bg-slate-50 rounded text-slate-400"><Type className="w-3.5 h-3.5" /></button>
                        <button className="p-1 hover:bg-slate-50 rounded text-slate-400"><ImageIcon className="w-3.5 h-3.5" /></button>
                        <button className="p-1 hover:bg-slate-50 rounded text-slate-400"><LinkIcon className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="min-h-[400px] border border-slate-200 rounded-lg p-6 bg-slate-50/30 font-serif text-lg text-slate-700 leading-relaxed outline-none focus:bg-white transition-colors" contentEditable>
                      In an era defined by rapid iteration and AI-driven workflows, the solo founder has never been more powerful...
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 flex gap-4">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg h-fit">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-blue-900">Search Engine Optimization</h4>
                      <p className="text-xs text-blue-700 mt-1 leading-relaxed">Configure how this article appears in search results and on social platforms. These fields override default settings.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900">Meta Title</label>
                    <input className="w-full bg-white border border-slate-200 rounded px-4 py-2 text-xs font-medium outline-none focus:border-blue-500" placeholder="SEO optimized title..." />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900">Meta Description</label>
                    <textarea className="w-full bg-white border border-slate-200 rounded px-4 py-2 text-xs font-medium outline-none focus:border-blue-500 h-32" placeholder="Briefly explain the article for search results..." />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Pane 3: Inspector / Inspector (Sanity Style) */}
        <aside className="w-[320px] border-l border-slate-100 bg-slate-50/10 flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Document Inspector</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="space-y-4">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Publishing Status</h5>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-xs font-bold text-slate-700">Draft version</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-300" />
                  <span className="text-xs font-medium text-slate-400">Not published</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Featured Image</h5>
              <div className="aspect-square rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-3 hover:bg-slate-100 transition-colors cursor-pointer group">
                <div className="p-3 bg-white rounded-full shadow-sm text-slate-300 group-hover:text-blue-500 transition-colors">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload Asset</span>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Validation</h5>
              <div className="flex items-center gap-3 text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                <AlertCircle className="w-4 h-4" />
                <span className="text-[10px] font-bold">Featured image is missing</span>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 bg-white">
            <button className="w-full py-3 bg-slate-900 text-white text-xs font-bold rounded flex items-center justify-center gap-2 hover:bg-black transition-colors">
              Save Changes
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
