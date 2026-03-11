"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Plus, Trash2, Edit2, ChevronRight, FolderTree, Loader2, Save, X } from "lucide-react";
import { getCategories, saveCategory, deleteCategory } from "@/lib/actions/categories";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">Manage article taxonomy and organization.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Category" : "Add Category"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Design" />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} className="font-mono text-xs" />
              </div>
              <div className="space-y-2">
                <Label>Parent</Label>
                <Select value={parentId} onValueChange={setParentId}>
                  <SelectTrigger>
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
              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1" disabled={isPending}>
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  {editingId ? "Update" : "Add Category"}
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>All Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                    </TableCell>
                  </TableRow>
                ) : categoriesList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">No categories found.</TableCell>
                  </TableRow>
                ) : categoriesList.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell className="font-medium">
                      {cat.parentId ? <span className="text-muted-foreground mr-2">—</span> : null}
                      {cat.name}
                    </TableCell>
                    <TableCell className="text-xs font-mono">{cat.slug}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(cat)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)} className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
