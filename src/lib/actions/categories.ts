'use server';

import { db } from "@/lib/db";
import { categories, type NewCategory } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Fetch all categories ordered by name.
 */
export async function getCategories() {
  try {
    return await db.select().from(categories).orderBy(asc(categories.name));
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

/**
 * Save or update a category.
 */
export async function saveCategory(data: NewCategory) {
  try {
    if (data.id) {
      await db.update(categories)
        .set(data)
        .where(eq(categories.id, data.id));
    } else {
      await db.insert(categories).values(data);
    }
    revalidatePath('/admin/blog/categories');
    revalidatePath('/admin/blog/builder');
    revalidatePath('/blog');
    return { success: true };
  } catch (error: any) {
    console.error("Save Category Error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a category.
 */
export async function deleteCategory(id: number) {
  try {
    await db.delete(categories).where(eq(categories.id, id));
    revalidatePath('/admin/blog/categories');
    revalidatePath('/admin/blog/builder');
    return { success: true };
  } catch (error: any) {
    console.error("Delete Category Error:", error);
    return { success: false, error: error.message };
  }
}
