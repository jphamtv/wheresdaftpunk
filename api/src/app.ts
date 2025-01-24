import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import targetsRouter from './routes/targetsRouter';
import scoresRouter from './routes/scoresRouter';
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/game", scoresRouter);
app.use("/api/targets", targetsRouter);

// Error handing
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Log error for debugging
  res.status(500).json({ error: "Something went wrong" }); // Send simple message to user to see
});

export default app;
