'use server';

import { db } from "@/lib/db";
import { tags, type NewTag } from "@/lib/db/schema";
import { eq, asc, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Fetch all unique tags ordered by name.
 */
export async function getTags() {
  try {
    return await db.select().from(tags).orderBy(asc(tags.name));
  } catch (error) {
    console.error("Fetch Tags Error:", error);
    return [];
  }
}

/**
 * Save or update a global tag.
 */
export async function saveTag(data: NewTag) {
  try {
    if (data.id) {
      await db.update(tags)
        .set(data)
        .where(eq(tags.id, data.id));
    } else {
      await db.insert(tags).values(data);
    }
    revalidatePath('/admin/blog/tags');
    revalidatePath('/admin/blog/builder');
    return { success: true };
  } catch (error: any) {
    console.error("Save Tag Error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Bulk sync tags from a post.
 * Adds any tags that don't already exist globally.
 */
export async function syncPostTags(tagNames: string[]) {
  if (!tagNames.length) return { success: true };
  
  try {
    const existing = await db.select().from(tags);
    const existingNames = new Set(existing.map(t => t.name.toLowerCase()));
    
    const newTags = tagNames
      .filter(name => !existingNames.has(name.toLowerCase()))
      .map(name => ({
        name: name.trim(),
        slug: name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
      }));

    if (newTags.length > 0) {
      await db.insert(tags).values(newTags);
      revalidatePath('/admin/blog/tags');
    }
    
    return { success: true };
  } catch (error: any) {
    console.error("Sync Tags Error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a global tag.
 */
export async function deleteTag(id: number) {
  try {
    await db.delete(tags).where(eq(tags.id, id));
    revalidatePath('/admin/blog/tags');
    revalidatePath('/admin/blog/builder');
    return { success: true };
  } catch (error: any) {
    console.error("Delete Tag Error:", error);
    return { success: false, error: error.message };
  }
}
