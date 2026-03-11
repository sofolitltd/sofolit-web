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
  CheckCircle2,
  Clock,
  Loader2
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAdminPosts, deletePost } from "@/lib/actions/blog";
import { getCategories } from "@/lib/actions/categories";
import { useToast } from "@/hooks/use-toast";
import type { Post, Category } from "@/lib/db/schema";

export default function ManageBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [dbCategories, setDbCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, startDelete] = useTransition();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      const [postsData, catsData] = await Promise.all([
        getAdminPosts(),
        getCategories()
      ]);
      setPosts(postsData);
      setDbCategories(catsData);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    startDelete(async () => {
      const result = await deletePost(id);
      if (result.success) {
        setPosts(posts.filter(p => p.id !== id));
        toast({ title: "Deleted", description: "Post and its assets have been removed." });
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error });
      }
    });
  };

  const getCategoryNames = (postCategories: any) => {
    const ids = Array.isArray(postCategories) ? postCategories : [];
    if (ids.length === 0) return "Uncategorized";
    
    return dbCategories
      .filter(c => ids.includes(c.id))
      .map(c => c.name)
      .join(", ");
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">
            <FileText className="w-3 h-3" /> Content Management
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Blog Articles</h1>
          <p className="text-sm text-slate-500">Manage your stories, insights, and industry updates.</p>
        </div>
        <Button asChild className="gap-2 font-bold h-11 px-6 rounded-xl">
          <Link href="/admin/blog/builder">
            <Plus className="w-4 h-4" /> Create New Article
          </Link>
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden rounded-2xl">
        <CardHeader className="p-0 border-b border-slate-100">
          <div className="px-6 py-4 flex items-center gap-4 bg-slate-50/30">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search articles by title or author..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-white border-slate-200 rounded-lg text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-b border-slate-100 hover:bg-transparent">
                <TableHead className="px-8 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400">Article</TableHead>
                <TableHead className="px-8 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400">Categories</TableHead>
                <TableHead className="px-8 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400">Status</TableHead>
                <TableHead className="px-8 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400">Date</TableHead>
                <TableHead className="px-8 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                    <p className="text-xs font-bold text-slate-400 mt-4 uppercase tracking-widest">Fetching Articles...</p>
                  </TableCell>
                </TableRow>
              ) : filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">
                    No articles found
                  </TableCell>
                </TableRow>
              ) : filteredPosts.map((post) => (
                <TableRow key={post.id} className="hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-slate-900 truncate max-w-[200px]">{post.title}</p>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{post.author}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-5">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight truncate max-w-full">
                        {getCategoryNames(post.categoriesData)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-5">
                    {post.isPublished ? (
                      <Badge className="bg-green-50 text-green-700 hover:bg-green-50 border-green-100 font-bold text-[10px] uppercase tracking-wider gap-1.5">
                        <CheckCircle2 className="w-3 h-3" /> Published
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-100 font-bold text-[10px] uppercase tracking-wider gap-1.5">
                        <Clock className="w-3 h-3" /> Draft
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-8 py-5">
                    <p className="text-xs text-slate-500 font-medium">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </TableCell>
                  <TableCell className="px-8 py-5 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 p-1 rounded-xl shadow-xl">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/blog/builder?id=${post.id}`} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg text-xs font-bold">
                            <Edit2 className="w-3.5 h-3.5" /> Edit Article
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/blog/${post.slug}`} target="_blank" className="flex items-center gap-3 cursor-pointer p-2 rounded-lg text-xs font-bold">
                            <Eye className="w-3.5 h-3.5" /> View Public
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(post.id)}
                          disabled={isDeleting}
                          className="flex items-center gap-3 cursor-pointer p-2 rounded-lg text-xs font-bold text-red-600 focus:text-red-600 focus:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete Post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
