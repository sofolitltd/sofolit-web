'use server';

import { db } from "@/lib/db";
import { categories, type NewCategory } from "@/lib/db/schema";
import { eq, desc, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  try {
    return await db.select().from(categories).orderBy(asc(categories.name));
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

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
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategory(id: number) {
  try {
    await db.delete(categories).where(eq(categories.id, id));
    revalidatePath('/admin/blog/categories');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
