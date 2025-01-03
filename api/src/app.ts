import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import gameRouter from './routes/targetsRouter';
import scoresRouter from './routes/scoresRouter';
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Updated CORS setup to allow both client ports
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL
      : "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/game", gameRouter);
app.use("/api/scores", scoresRouter);

// Error handing
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Log error for debugging
  res.status(500).json({ error: "Something went wrong" }); // Send simple message to user to see
});

export default app;
