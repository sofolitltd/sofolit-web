
'use server';

import { db } from "@/lib/db";
import { posts, type NewPost } from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/lib/cloudinary";

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
 * Upload an image to Cloudinary (Server Action)
 */
export async function uploadBlogImage(base64Image: string) {
  try {
    const url = await uploadToCloudinary(base64Image, "sofolit");
    return { success: true, url };
  } catch (error: any) {
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
 * Fetch a single published post by slug.
 */
export async function getPostBySlug(slug: string) {
  try {
    const results = await db.select()
      .from(posts)
      .where(and(eq(posts.slug, slug), eq(posts.isPublished, true)))
      .limit(1);
    return results[0] || null;
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
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
