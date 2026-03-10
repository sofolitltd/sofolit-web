'use server';

import { db } from "@/lib/db";
import { posts, type NewPost } from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

/**
 * Enterprise-level Server Action for creating/updating a blog post.
 * Synchronizes metadata including multiple categories and dynamic tags.
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
    if (data.slug) {
      revalidatePath(`/blog/${data.slug}`);
    }
    
    return { success: true };
  } catch (error: any) {
    console.error("Database Error:", error);
    return { success: false, error: error.message || "Failed to save blog post" };
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
    console.error("Upload Error:", error);
    return { success: false, error: error.message || "Failed to upload image" };
  }
}

/**
 * Fetch all posts for admin view with robust error handling.
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
 * Defensively returns empty array on connection failure.
 */
export async function getPublicPosts() {
  try {
    return await db.select()
      .from(posts)
      .where(eq(posts.isPublished, true))
      .orderBy(desc(posts.createdAt));
  } catch (error) {
    console.error("Fetch Public Posts Error:", error);
    return [];
  }
}

/**
 * Fetch a single published post by slug.
 */
export async function getPostBySlug(slug: string) {
  if (!slug) return null;
  try {
    const results = await db.select()
      .from(posts)
      .where(and(eq(posts.slug, slug), eq(posts.isPublished, true)))
      .limit(1);
    return results[0] || null;
  } catch (error) {
    console.error("Fetch Post By Slug Error:", error);
    return null;
  }
}

/**
 * Delete a post and its associated Cloudinary image.
 * Synchronized cleanup to maintain a clean media library.
 */
export async function deletePost(id: number) {
  try {
    // 1. Fetch the post to get the image URL
    const postToDelete = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
    
    if (postToDelete.length > 0) {
      const imageUrl = postToDelete[0].featuredImage;
      
      // 2. If it's a Cloudinary URL, identify public ID and delete asset
      if (imageUrl && imageUrl.includes('res.cloudinary.com')) {
        const parts = imageUrl.split('/upload/');
        if (parts.length > 1) {
          // Extract public ID including folders (e.g. sofolit/xyz)
          const pathAfterUpload = parts[1].replace(/^v\d+\//, '');
          const publicId = pathAfterUpload.split('.')[0];
          
          if (publicId) {
            await deleteFromCloudinary(publicId);
          }
        }
      }
    }

    // 3. Delete from Database
    await db.delete(posts).where(eq(posts.id, id));
    
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    return { success: true };
  } catch (error: any) {
    console.error("Delete Error:", error);
    return { success: false, error: error.message || "Failed to delete post" };
  }
}
