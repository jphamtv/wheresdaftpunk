// models/db.js
import { Pool } from 'pg';
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 20,
  idleTimeoutMillis: 300000, // 5 minutes
  connectionTimeoutMillis: 2000,
});

// Keep connection alive on Render
setInterval(async () => {
  try {
    await pool.query('SELECT 1');
  } catch (err) {
    console.error('Keepalive query failed:', err);
  }
}, 60000); // Run every minute
