
"use client";

import React from "react";
import Link from "next/link";
import { Plus, Search, MoreVertical, Edit2, Trash2, Eye, LayoutGrid, List as ListIcon } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const blogs = [
  { id: 1, title: "The Art of the Solo MVP", status: "Published", author: "Alex Sofol", date: "March 15, 2024", views: 2450, category: "Strategy" },
  { id: 2, title: "Scaling Without Technical Debt", status: "Draft", author: "Alex Sofol", date: "March 10, 2024", views: 0, category: "Engineering" },
  { id: 3, title: "Psychology of High-Conversion Landing Pages", status: "Published", author: "Alex Sofol", date: "March 05, 2024", views: 1890, category: "Growth" },
];

export default function ManageBlogPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Manage Articles</h1>
          <p className="text-slate-500">Curate and publish high-fidelity insights for your audience</p>
        </div>
        <Link 
          href="/admin/blog/builder" 
          className="px-6 py-4 rounded-xl bg-primary text-white font-black flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" /> Write New Article
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-6 justify-between items-center bg-slate-50/50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              placeholder="Search articles..." 
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              <button className="p-2 bg-slate-50 text-slate-900 rounded-lg shadow-sm"><LayoutGrid className="w-4 h-4" /></button>
              <button className="p-2 text-slate-400 hover:text-slate-600"><ListIcon className="w-4 h-4" /></button>
            </div>
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest outline-none text-slate-600 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/50">
                <th className="px-8 py-5">Article Content</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Performance</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 max-w-md">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-300">
                        <Edit2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-black text-sm text-slate-900 group-hover:text-primary transition-colors leading-tight mb-1">{blog.title}</p>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none">{blog.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-500">{blog.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                      blog.status === "Published" 
                        ? "bg-green-50 text-green-600 border-green-100" 
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    )}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-400">
                      <Eye className="w-3.5 h-3.5" /> {blog.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs text-slate-500 font-medium">{blog.date}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-slate-200 rounded-xl text-slate-400 transition-colors"><MoreVertical className="w-5 h-5" /></button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border border-slate-200 shadow-xl rounded-xl p-2 min-w-[160px]">
                        <DropdownMenuItem className="flex items-center gap-3 cursor-pointer p-3 rounded-lg text-slate-700 font-bold text-sm focus:bg-primary/5 focus:text-primary">
                          <Edit2 className="w-4 h-4" /> Edit Article
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-3 cursor-pointer p-3 rounded-lg text-red-600 font-bold text-sm focus:bg-red-50 focus:text-red-700">
                          <Trash2 className="w-4 h-4" /> Delete Forever
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
