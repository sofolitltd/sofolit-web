
"use client";

import React, { useState } from "react";
import { 
  ChevronLeft, 
  Plus, 
  Save, 
  Trash2, 
  Heading, 
  Type, 
  Link as LinkIcon, 
  List, 
  Image as ImageIcon,
  MoveUp,
  MoveDown,
  Layout
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BlockType = 'h1' | 'h2' | 'p' | 'bullet' | 'link' | 'space' | 'image';

interface Block {
  id: string;
  type: BlockType;
  content: string;
}

export default function BlogBuilderPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Strategy");
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', type: 'h1', content: 'Your Amazing Title' },
    { id: '2', type: 'p', content: 'Start writing your enterprise-level story here...' },
  ]);

  const addBlock = (type: BlockType) => {
    const newBlock = { 
      id: Date.now().toString(), 
      type, 
      content: type === 'space' ? '24' : '' 
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, content: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newBlocks.length) return;
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const toolbar = [
    { type: 'h1', icon: <Heading className="w-4 h-4" />, label: 'H1' },
    { type: 'h2', icon: <Heading className="w-3 h-3" />, label: 'H2' },
    { type: 'p', icon: <Type className="w-4 h-4" />, label: 'Text' },
    { type: 'bullet', icon: <List className="w-4 h-4" />, label: 'List' },
    { type: 'link', icon: <LinkIcon className="w-4 h-4" />, label: 'Link' },
    { type: 'image', icon: <ImageIcon className="w-4 h-4" />, label: 'Img' },
    { type: 'space', icon: <Layout className="w-4 h-4" />, label: 'Space' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-6 sticky top-0 bg-[#030303]/80 backdrop-blur-xl z-20">
        <Link href="/admin/blog" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Articles
        </Link>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 rounded-xl border border-border text-sm font-bold hover:bg-muted transition-colors">
            Save Draft
          </button>
          <button className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold flex items-center gap-2 hover:shadow-lg transition-all">
            <Save className="w-4 h-4" /> Publish Article
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Editor Main */}
        <div className="lg:col-span-3 space-y-8">
          <div className="space-y-4">
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article Title"
              className="text-4xl md:text-5xl font-black bg-transparent outline-none border-none placeholder:text-muted/30 w-full"
            />
            <div className="flex gap-4">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-card border border-border rounded-lg px-4 py-2 text-xs font-black uppercase tracking-widest outline-none"
              >
                <option>Strategy</option>
                <option>Engineering</option>
                <option>Growth</option>
                <option>Product</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {blocks.map((block, idx) => (
              <div key={block.id} className="group relative">
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => moveBlock(idx, 'up')} className="p-1 hover:bg-muted rounded"><MoveUp className="w-3 h-3" /></button>
                  <button onClick={() => moveBlock(idx, 'down')} className="p-1 hover:bg-muted rounded"><MoveDown className="w-3 h-3" /></button>
                  <button onClick={() => removeBlock(block.id)} className="p-1 hover:bg-destructive/10 text-destructive rounded"><Trash2 className="w-3 h-3" /></button>
                </div>

                <div className={cn(
                  "p-4 rounded-xl border border-transparent hover:border-border/50 hover:bg-card/30 transition-all",
                  block.type === 'h1' && "text-3xl font-black",
                  block.type === 'h2' && "text-2xl font-bold",
                  block.type === 'bullet' && "pl-8 relative before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full"
                )}>
                  {block.type === 'space' ? (
                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest bg-muted/20 p-2 rounded-lg">
                      <Layout className="w-4 h-4" />
                      Spacing: {block.content}px
                      <input 
                        type="range" min="8" max="120" step="8"
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  ) : (
                    <textarea 
                      autoFocus={idx === blocks.length - 1}
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, e.target.value)}
                      placeholder={block.type === 'link' ? "Paste URL here..." : "Type something..."}
                      className="bg-transparent border-none outline-none w-full resize-none placeholder:text-muted/50"
                      rows={block.type === 'p' ? 3 : 1}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-12 border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center gap-6 group hover:border-primary/40 transition-colors">
            <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8" />
            </div>
            <p className="text-muted-foreground font-bold">Add a new block to your story</p>
            <div className="flex flex-wrap justify-center gap-2">
              {toolbar.map((tool) => (
                <button 
                  key={tool.type}
                  onClick={() => addBlock(tool.type as BlockType)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border hover:border-primary transition-all text-sm font-bold"
                >
                  {tool.icon} {tool.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border-border bg-card">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6">Article Settings</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Featured Image</label>
                <div className="aspect-video rounded-xl border border-border bg-muted/50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted transition-colors">
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                  <span className="text-[10px] font-bold">Click to Upload</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Slug URL</label>
                <div className="text-[10px] font-mono bg-muted p-2 rounded-lg break-all">
                  /blog/{title.toLowerCase().replace(/ /g, '-')}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Excerpt</label>
                <textarea 
                  placeholder="Short summary for SEO..."
                  className="w-full bg-muted border border-border rounded-xl p-3 text-xs outline-none h-24 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
