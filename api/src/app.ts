import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import db from './models/db';
import targetsRouter from './routes/targetsRouter';
import scoresRouter from './routes/scoresRouter';
import { corsOptionsBase } from "./config/corsConfig";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();

// CORS setup to allow both development ports (5173, 5174) and production client URL
const corsOptions = {
  ...corsOptionsBase,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  const checkHealth = async () => {
    try {
      // Check database connection by running a simple query
      const result = await db.query(`SELECT 1 as test`);     
      return res.status(200).json({ status: 'ok', message: 'Service is healthy', dbConnected: true });
    } catch (err) {
      console.error(`Health check failed: ${err}`);
      return res.status(500).json({ status: 'error', message: 'Service is unhealthy', dbConnected: false });
    }
  };
  
  checkHealth();
});

// Routes
app.use("/api/game", scoresRouter);
app.use("/api/targets", targetsRouter);

// Error handing
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Log error for debugging
  res.status(500).json({ error: "Something went wrong" }); // Send simple message to user to see
});

export default app;
