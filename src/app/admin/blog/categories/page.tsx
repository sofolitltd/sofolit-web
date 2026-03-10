"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Plus, Trash2, Edit2, ChevronRight, FolderTree, Loader2, Save, X } from "lucide-react";
import { getCategories, saveCategory, deleteCategory } from "@/lib/actions/categories";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Category } from "@/lib/db/schema";

export default function CategoriesPage() {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState<string>("0");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    const generatedSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  }, [name]);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategoriesList(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    startTransition(async () => {
      const result = await saveCategory({
        id: editingId || undefined,
        name,
        slug,
        parentId: parentId === "0" ? null : parseInt(parentId),
      });

      if (result.success) {
        toast({ title: "Success", description: "Category saved successfully." });
        resetForm();
        loadCategories();
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error });
      }
    });
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setParentId(cat.parentId?.toString() || "0");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure? This will not delete posts in this category.")) return;
    const result = await deleteCategory(id);
    if (result.success) {
      toast({ title: "Deleted" });
      loadCategories();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setSlug("");
    setParentId("0");
  };

  const renderCategoryTree = (pId: number | null = null, level = 0) => {
    return categoriesList
      .filter((c) => c.parentId === pId)
      .map((cat) => (
        <React.Fragment key={cat.id}>
          <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-3" style={{ marginLeft: `${level * 24}px` }}>
              {level > 0 && <ChevronRight className="w-4 h-4 text-slate-300" />}
              <div>
                <p className="font-bold text-sm text-slate-900">{cat.name}</p>
                <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">{cat.slug}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(cat)} className="h-8 w-8">
                <Edit2 className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)} className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
          {renderCategoryTree(cat.id, level + 1)}
        </React.Fragment>
      ));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">
          <FolderTree className="w-3 h-3" /> Taxonomy Manager
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Categories</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <Card className="border-slate-200 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-900">
                {editingId ? "Edit Category" : "Add New Category"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400">Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Engineering" className="h-10 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400">Slug (URL)</Label>
                  <Input value={slug} onChange={(e) => setSlug(e.target.value)} className="h-10 rounded-lg bg-slate-50 font-mono text-xs" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400">Parent Category</Label>
                  <Select value={parentId} onValueChange={setParentId}>
                    <SelectTrigger className="h-10 rounded-lg">
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">None (Primary)</SelectItem>
                      {categoriesList
                        .filter(c => c.id !== editingId)
                        .map((c) => (
                          <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-4 flex gap-2">
                  <Button type="submit" disabled={isPending} className="flex-1 bg-slate-900 hover:bg-black rounded-lg h-10 font-bold text-xs gap-2">
                    {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                    {editingId ? "Update" : "Add Category"}
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={resetForm} className="rounded-lg h-10 text-xs font-bold px-4">
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          <div className="space-y-2">
            {loading ? (
              <div className="py-20 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-slate-200 mx-auto" />
              </div>
            ) : categoriesList.length === 0 ? (
              <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No categories created yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {renderCategoryTree()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
