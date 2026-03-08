
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
import { cn } from "@/lib/utils";

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
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Manage Blog</h1>
          <p className="text-slate-500">Create, edit, and publish your latest insights</p>
        </div>
        <Link 
          href="/admin/blog/builder" 
          className="px-6 py-3 rounded-xl bg-primary text-white font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" /> New Article
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between bg-slate-50/50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              placeholder="Search articles..." 
              className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-bold outline-none text-slate-600">
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
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Stats</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm text-slate-900 group-hover:text-primary transition-colors">{blog.title}</p>
                    <p className="text-xs text-slate-500">{blog.author}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                      blog.status === "Published" 
                        ? "bg-green-50 text-green-600 border-green-100" 
                        : "bg-yellow-50 text-yellow-600 border-yellow-100"
                    )}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Eye className="w-3 h-3" /> {blog.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-500">{blog.date}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><MoreVertical className="w-4 h-4" /></button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border border-slate-200">
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-slate-700">
                          <Edit2 className="w-4 h-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600">
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
