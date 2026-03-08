
"use client";

import React from "react";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye, 
  FileText,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
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
    <div className="max-w-7xl mx-auto py-8">
      {/* Sanity-style Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">
            <FileText className="w-3 h-3" /> Content Management
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Blog Articles</h1>
        </div>
        <Link 
          href="/admin/blog/builder" 
          className="px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/10"
        >
          <Plus className="w-4 h-4" /> Create New
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {/* Table Filters/Search Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              placeholder="Search by title, author, or category..." 
              className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-900"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-colors">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-colors">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort
            </button>
          </div>
        </div>

        {/* CMS-style Content List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] uppercase font-black tracking-widest text-slate-400 bg-white">
                <th className="px-8 py-4">Title</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Last Modified</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <Link href="/admin/blog/builder" className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors block mb-0.5">
                          {blog.title}
                        </Link>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{blog.author}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      {blog.status === "Published" ? (
                        <div className="flex items-center gap-1.5 text-green-600 font-bold text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Published
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs">
                          <Clock className="w-3.5 h-3.5" /> Draft
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-xs text-slate-500 font-medium">{blog.date}</p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href="/admin/blog/builder" className="p-2 hover:bg-white rounded border border-transparent hover:border-slate-200 text-slate-400 hover:text-blue-600 transition-all">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-white rounded border border-transparent hover:border-slate-200 text-slate-400 transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border border-slate-200 shadow-xl rounded-lg p-1 min-w-[160px]">
                          <DropdownMenuItem className="flex items-center gap-3 cursor-pointer p-2 rounded text-slate-700 font-bold text-xs focus:bg-blue-50 focus:text-blue-600">
                            <Eye className="w-3.5 h-3.5" /> View Public
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-3 cursor-pointer p-2 rounded text-red-600 font-bold text-xs focus:bg-red-50 focus:text-red-700">
                            <Trash2 className="w-3.5 h-3.5" /> Delete Document
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
        <div>Showing {blogs.length} of {blogs.length} Articles</div>
        <div className="flex items-center gap-4">
          <button className="hover:text-slate-900 transition-colors">Previous</button>
          <button className="text-slate-900">1</button>
          <button className="hover:text-slate-900 transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}
