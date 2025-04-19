// models/db.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// Create different connection configurations based on environment
const isProduction = process.env.NODE_ENV === 'production';

// Connection configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Only use SSL in production environment
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 300000,
  connectionTimeoutMillis: 2000,
});

export default pool;
