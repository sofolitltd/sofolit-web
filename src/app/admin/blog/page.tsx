
"use client";

import React from "react";
import Link from "next/link";
import { Plus, Search, MoreVertical, Edit2, Trash2, Eye } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const blogs = [
  { id: 1, title: "How to Launch Your MVP in 4 Weeks", status: "Published", author: "Alex Sofol", date: "March 15, 2024", views: 1240 },
  { id: 2, title: "Firebase vs Supabase: 2024 Guide", status: "Draft", author: "Alex Sofol", date: "March 10, 2024", views: 0 },
  { id: 3, title: "The Power of Solo Entrepreneurship", status: "Published", author: "Alex Sofol", date: "March 05, 2024", views: 890 },
];

export default function ManageBlogPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Manage Blog</h1>
          <p className="text-muted-foreground">Create, edit, and publish your latest insights</p>
        </div>
        <Link 
          href="/admin/blog/builder" 
          className="px-6 py-3 rounded-xl bg-primary text-white font-bold flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" /> New Article
        </Link>
      </div>

      <div className="glass-card border-white/5 bg-card/30 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col md:flex-row gap-4 justify-between bg-card/50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              placeholder="Search articles..." 
              className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-background border border-border rounded-lg px-4 py-2 text-sm font-bold outline-none">
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase font-black tracking-widest text-muted-foreground bg-muted/20">
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Stats</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm group-hover:text-primary transition-colors">{blog.title}</p>
                    <p className="text-xs text-muted-foreground">{blog.author}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                      blog.status === "Published" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                    )}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="w-3 h-3" /> {blog.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-muted-foreground">{blog.date}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-muted rounded-lg"><MoreVertical className="w-4 h-4" /></button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                          <Edit2 className="w-4 h-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive">
                          <Trash2 className="w-4 h-4" /> Delete
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
