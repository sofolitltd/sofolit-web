
"use client";

import React, { useEffect, useState, useTransition } from "react";
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
  Loader2
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { getAdminPosts, deletePost } from "@/lib/actions/blog";
import { useToast } from "@/hooks/use-toast";
import type { Post } from "@/lib/db/schema";

export default function ManageBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, startDelete] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    async function loadPosts() {
      const data = await getAdminPosts();
      setPosts(data);
      setLoading(false);
    }
    loadPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    startDelete(async () => {
      const result = await deletePost(id);
      if (result.success) {
        setPosts(posts.filter(p => p.id !== id));
        toast({ title: "Deleted", description: "Post has been removed from database." });
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
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
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              placeholder="Search articles..." 
              className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] uppercase font-black tracking-widest text-slate-400 bg-white">
                <th className="px-8 py-4">Title</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-300 mx-auto" />
                    <p className="text-xs font-bold text-slate-400 mt-4 uppercase tracking-widest">Loading database...</p>
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">
                    No articles found in Neon DB
                  </td>
                </tr>
              ) : posts.map((post) => (
                <tr key={post.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900">{post.title}</p>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{post.author}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      {post.isPublished ? (
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
                    <p className="text-xs text-slate-500 font-medium">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDelete(post.id)}
                        disabled={isDeleting}
                        className="p-2 hover:bg-white rounded border border-transparent hover:border-slate-200 text-slate-400 hover:text-red-600 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-white rounded border border-transparent hover:border-slate-200 text-slate-400 transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border border-slate-200 shadow-xl p-1 min-w-[160px]">
                          <DropdownMenuItem className="flex items-center gap-3 cursor-pointer p-2 rounded text-slate-700 font-bold text-xs">
                            <Eye className="w-3.5 h-3.5" /> View Public
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
    </div>
  );
}
