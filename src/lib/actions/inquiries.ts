'use server';

import { db } from "@/lib/db";
import { inquiries, type NewInquiry } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Saves a contact inquiry from the public form.
 */
export async function saveInquiry(data: NewInquiry) {
  try {
    await db.insert(inquiries).values(data);
    revalidatePath('/admin/inquiries');
    return { success: true };
  } catch (error: any) {
    console.error("Database Error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetches all inquiries for the admin dashboard.
 */
export async function getInquiries() {
  try {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  } catch (error) {
    console.error("Fetch Inquiries Error:", error);
    return [];
  }
}

/**
 * Updates the status of an inquiry.
 */
export async function updateInquiryStatus(id: number, status: string) {
  try {
    await db.update(inquiries).set({ status }).where(eq(inquiries.id, id));
    revalidatePath('/admin/inquiries');
    return { success: true };
  } catch (error: any) {
    console.error("Update Status Error:", error);
    return { success: false, error: error.message };
  }
}
