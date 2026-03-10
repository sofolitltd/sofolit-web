'use server';

import { db } from "@/lib/db";
import { inquiries, type NewInquiry } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

/**
 * Enterprise-level Server Action for saving a contact inquiry.
 */
export async function saveInquiry(data: NewInquiry) {
  try {
    await db.insert(inquiries).values(data);
    // Revalidate any potential admin dashboards viewing leads
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error("Database Error:", error);
    return { success: false, error: error.message };
  }
}
