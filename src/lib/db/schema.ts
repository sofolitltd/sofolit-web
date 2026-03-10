import { pgTable, serial, text, varchar, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  featuredImage: text("featured_image"),
  isPublished: boolean("is_published").default(false),
  category: varchar("category", { length: 100 }),
  author: varchar("author", { length: 100 }).default("Admin"),
  tags: jsonb("tags").default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  service: varchar("service", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
