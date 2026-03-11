
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

/**
 * Configure Neon to be more resilient in development environments.
 */
if (typeof window === 'undefined') {
  neonConfig.fetchConnectionCache = true;
}

const databaseUrl = process.env.DATABASE_URL;

/**
 * Defensive Database Initialization.
 * Prevents the application from crashing at the top level if the connection string
 * is missing or a placeholder. 
 */
const isPlaceholder = !databaseUrl || databaseUrl.includes('ep-cool-snowflake') || !databaseUrl.startsWith('postgres');
const connectionString = isPlaceholder 
  ? "postgresql://user:password@localhost.localdomain/neondb" 
  : databaseUrl;

const sql = neon(connectionString);

export const db = drizzle(sql, { schema });

/**
 * Utility to check if the DB is actually connected.
 */
export const isDbConfigured = () => !isPlaceholder;
