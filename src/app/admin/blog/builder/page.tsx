
"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Layout,
  MoreVertical,
  Settings2,
  Eye,
  Type as QuoteIcon,
  Minus
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

type BlockType = 'h1' | 'h2' | 'h3' | 'p' | 'list' | 'quote' | 'image' | 'spacer' | 'divider';

interface Block {
  id: string;
  type: BlockType;
  content: string;
}

export default function WordPressStyleBuilder() {
  const [title, setTitle] = useState("Your Enterprise Story Starts Here");
  const [category, setCategory] = useState("Strategy");
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', type: 'h1', content: 'The Future of Solo Product Development' },
    { id: '2', type: 'p', content: 'In an era defined by rapid iteration and AI-driven workflows, the solo founder has never been more powerful...' },
  ]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const addBlock = (type: BlockType, index?: number) => {
    const newBlock: Block = { 
      id: Math.random().toString(36).substr(2, 9), 
      type, 
      content: type === 'spacer' ? '32' : '' 
    };
    
    if (typeof index === 'number') {
      const newBlocks = [...blocks];
      newBlocks.splice(index + 1, 0, newBlock);
      setBlocks(newBlocks);
    } else {
      setBlocks([...blocks, newBlock]);
    }
    setSelectedBlockId(newBlock.id);
  };

  const updateBlock = (id: string, content: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newBlocks.length) return;
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* WordPress Top Bar */}
      <header className="h-14 border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="h-4 w-px bg-slate-200" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Article Editor</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            Save Draft
          </button>
          <button className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2">
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button className="px-6 py-2 bg-primary text-white text-sm font-black rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <Save className="w-4 h-4" /> Publish
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Editor Main Canvas */}
        <main className="flex-1 min-h-[calc(100vh-56px)] overflow-y-auto bg-slate-50/30 flex flex-col items-center py-12 px-4">
          <div className="w-full max-w-3xl space-y-1">
            {/* Title Block */}
            <div className="mb-12">
              <textarea 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add title"
                className="w-full text-5xl font-black bg-transparent border-none outline-none placeholder:text-slate-200 text-slate-900 resize-none h-auto overflow-hidden leading-tight"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              />
            </div>

            {/* Block List */}
            <div className="space-y-2">
              {blocks.map((block, idx) => (
                <div 
                  key={block.id} 
                  className={cn(
                    "group relative rounded-lg transition-all border border-transparent",
                    selectedBlockId === block.id ? "ring-1 ring-primary/20 border-slate-200 bg-white" : "hover:bg-slate-50/50"
                  )}
                  onClick={() => setSelectedBlockId(block.id)}
                >
                  {/* Block Controls - Only visible on selected or hover */}
                  <div className={cn(
                    "absolute -left-12 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                    selectedBlockId === block.id && "opacity-100"
                  )}>
                    <button onClick={() => moveBlock(idx, 'up')} className="p-1.5 hover:bg-slate-200 rounded text-slate-400 disabled:opacity-30" disabled={idx === 0}>
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => moveBlock(idx, 'down')} className="p-1.5 hover:bg-slate-200 rounded text-slate-400 disabled:opacity-30" disabled={idx === blocks.length - 1}>
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Contextual Action Menu */}
                  <div className="absolute -right-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-400"><MoreVertical className="w-3.5 h-3.5" /></button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border-slate-200 shadow-xl">
                        <DropdownMenuItem onClick={() => removeBlock(block.id)} className="text-red-500 focus:text-red-500 focus:bg-red-50">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete Block
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Content Rendering */}
                  <div className="p-4">
                    {block.type === 'h1' && (
                      <textarea 
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        placeholder="Heading 1"
                        className="w-full text-4xl font-black bg-transparent border-none outline-none text-slate-900 resize-none"
                      />
                    )}
                    {block.type === 'h2' && (
                      <textarea 
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        placeholder="Heading 2"
                        className="w-full text-3xl font-bold bg-transparent border-none outline-none text-slate-800 resize-none"
                      />
                    )}
                    {block.type === 'p' && (
                      <textarea 
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        placeholder="Start typing..."
                        className="w-full text-lg leading-relaxed bg-transparent border-none outline-none text-slate-600 resize-none min-h-[80px]"
                        rows={1}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = 'auto';
                          target.style.height = target.scrollHeight + 'px';
                        }}
                      />
                    )}
                    {block.type === 'quote' && (
                      <div className="pl-6 border-l-4 border-primary bg-primary/5 py-4 rounded-r-lg">
                        <textarea 
                          value={block.content}
                          onChange={(e) => updateBlock(block.id, e.target.value)}
                          placeholder="Add a brilliant quote..."
                          className="w-full text-xl italic font-medium bg-transparent border-none outline-none text-slate-700 resize-none"
                        />
                      </div>
                    )}
                    {block.type === 'spacer' && (
                      <div className="flex items-center gap-4 bg-slate-100/50 p-3 rounded-lg border border-slate-200/50">
                        <Layout className="w-4 h-4 text-slate-400" />
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Spacer: {block.content}px</span>
                        <input 
                          type="range" min="16" max="160" step="16"
                          value={block.content}
                          onChange={(e) => updateBlock(block.id, e.target.value)}
                          className="flex-1 accent-primary"
                        />
                      </div>
                    )}
                    {block.type === 'divider' && (
                      <div className="py-4">
                        <hr className="border-slate-200" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* In-Canvas Add Block Button */}
            <div className="pt-8 flex justify-center opacity-0 hover:opacity-100 transition-opacity">
              <button 
                onClick={() => addBlock('p')}
                className="p-3 bg-slate-900 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>

        {/* WordPress Style Settings Sidebar */}
        <aside className="w-[320px] h-[calc(100vh-56px)] border-l border-slate-200 bg-white sticky top-[56px] overflow-y-auto">
          <div className="p-6 space-y-8">
            <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-widest">
              <Settings2 className="w-4 h-4 text-primary" /> Document Settings
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Post Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/10 transition-all font-bold text-slate-700"
                >
                  <option>Strategy</option>
                  <option>Engineering</option>
                  <option>Growth</option>
                  <option>Product</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Featured Image</label>
                <div className="aspect-video rounded-xl border border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors group">
                  <div className="p-3 rounded-full bg-white shadow-sm text-slate-300 group-hover:text-primary transition-colors">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">Set Featured Image</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">URL Slug</label>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-[10px] font-mono text-slate-400 break-all leading-relaxed">
                  sofol.it/blog/{title.toLowerCase().replace(/ /g, '-').slice(0, 40)}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Summary / Excerpt</label>
                <textarea 
                  placeholder="Summarize this post for SEO..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs outline-none h-32 resize-none text-slate-600 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Add Content Blocks</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { type: 'h2', icon: <Heading className="w-3.5 h-3.5" />, label: 'Heading' },
                  { type: 'p', icon: <Type className="w-3.5 h-3.5" />, label: 'Paragraph' },
                  { type: 'list', icon: <List className="w-3.5 h-3.5" />, label: 'List' },
                  { type: 'quote', icon: <QuoteIcon className="w-3.5 h-3.5" />, label: 'Quote' },
                  { type: 'image', icon: <ImageIcon className="w-3.5 h-3.5" />, label: 'Media' },
                  { type: 'divider', icon: <Minus className="w-3.5 h-3.5" />, label: 'Divider' },
                ].map((item) => (
                  <button 
                    key={item.type}
                    onClick={() => addBlock(item.type as BlockType)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="text-slate-400 group-hover:text-primary transition-colors">{item.icon}</div>
                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-primary">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
