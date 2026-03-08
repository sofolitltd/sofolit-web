
'use server';

import { db } from "@/lib/db";
import { posts, type NewPost } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Enterprise-level Server Action for creating/updating a blog post.
 */
export async function saveBlogPost(data: NewPost) {
  try {
    if (data.id) {
      // Update existing post
      await db.update(posts)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(posts.id, data.id));
    } else {
      // Create new post
      await db.insert(posts).values(data);
    }

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${data.slug}`);
    
    return { success: true };
  } catch (error: any) {
    console.error("Database Error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch all posts for admin view.
 */
export async function getAdminPosts() {
  try {
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

/**
 * Fetch published posts for public view.
 */
export async function getPublicPosts() {
  try {
    return await db.select()
      .from(posts)
      .where(eq(posts.isPublished, true))
      .orderBy(desc(posts.createdAt));
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

/**
 * Delete a post.
 */
export async function deletePost(id: number) {
  try {
    await db.delete(posts).where(eq(posts.id, id));
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
