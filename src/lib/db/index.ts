import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL;

/**
 * Defensive Database Initialization.
 * Prevents the application from crashing at the top level if the connection string
 * is missing or a placeholder. 
 */
const isPlaceholder = !databaseUrl || databaseUrl.includes('ep-cool-snowflake');
const connectionString = isPlaceholder 
  ? "https://placeholder.neon.tech" 
  : databaseUrl;

const sql = neon(connectionString);

export const db = drizzle(sql, { schema });
