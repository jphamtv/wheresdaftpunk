// models/db.js
import { Pool } from 'pg';
import dotenv from "dotenv";
dotenv.config();

export default new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 20,
  idleTimeoutMillis: 300000,
  connectionTimeoutMillis: 2000,
});
