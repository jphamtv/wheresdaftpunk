import { Request, Response } from "express";
import { create, getAll } from "../models/scoreModel";

export const getScores = async (req: Request, res: Response) => {
  try {
    const scores = await getAll();
    res.json(scores);
  } catch (err) {
    console.error("Fetching error: ", err);
    res.status(500).json({ message: "Error fetching scores" });
  }
};

export const startGame = async (req: Request, res: Response) => {
  try {
    const startTime = new Date();
    res.json({ startTime: startTime.toISOString() });
  } catch (err) {
    console.error("Error starting game: ", err);
    res.status(500).json({ message: "Error starting game" });
  }
};

export const endGame = async (req: Request, res: Response) => {
  try {
    const { startTime, username = 'AAA' } = req.body;
    const endTime = new Date();
    const gameStartTime = new Date(startTime);

    // Calculate time in seconds
    const time_seconds = Math.floor(
      (endTime.getTime() - gameStartTime.getTime()) / 1000
    );

    // Format username: capitalize and handle 3 chars
    const formattedUsername = username.toUpperCase().padEnd(3, '—').slice(0, 3);
    const newScore = await create({ username: formattedUsername, time_seconds });

    res.status(201).json(newScore);
  } catch (err) {
    console.error("Error ending game: ", err);
    res.status(500).json({ message: "Error ending game" });
  }
};