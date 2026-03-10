import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn('DATABASE_URL is not defined. Database operations will fail.');
}

// We use a safe fallback or a known problematic placeholder check to avoid low-level crashes
const isPlaceholder = databaseUrl?.includes('ep-cool-snowflake');
const sql = neon(databaseUrl && !isPlaceholder ? databaseUrl : "postgres://placeholder:password@localhost:5432/db");

export const db = drizzle(sql, { schema });