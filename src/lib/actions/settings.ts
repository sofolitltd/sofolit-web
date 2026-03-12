"use server";

import { db } from "@/lib/db";
import { settings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  try {
    const allSettings = await db.select().from(settings);
    // Convert array to object
    return allSettings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return {};
  }
}

export async function saveSettings(data: Record<string, string>) {
  try {
    const entries = Object.entries(data);
    
    for (const [key, value] of entries) {
      await db.insert(settings)
        .values({ key, value, updatedAt: new Date() })
        .onConflictDoUpdate({
          target: settings.key,
          set: { value, updatedAt: new Date() }
        });
    }

    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to save settings:", error);
    return { success: false, error: "Failed to save settings to database." };
  }
}

export async function getSettingByKey(key: string, defaultValue: string = "") {
  try {
    const result = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
    return result[0]?.value || defaultValue;
  } catch (error) {
    return defaultValue;
  }
}
