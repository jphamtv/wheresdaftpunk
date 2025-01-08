import { Request, Response } from "express";
import { create, getAll, stopGameTimer, getGameTime, startGameTimer } from "../models/scoreModel";

export const getScores = async (req: Request, res: Response) => {
  try {
    const scores = await getAll();
    res.json(scores);
  } catch (err) {
    console.error("Fetching error: ", err);
    res.status(500).json({ message: "Error fetching scores" });
  }
};

export const startTimer = async (req: Request, res: Response) => {
  try {
    const startTime = startGameTimer();
    res.json({ success: true, startTime: startTime.toISOString() });
  } catch (err) {
    console.error("Error starting timer: ", err);
    res.status(500).json({ message: "Error starting timer" });
  }
};

export const stopTimer = async (req: Request, res: Response) => {
  try {
    const {time_seconds, endTime} = await stopGameTimer();

    res.json({
      success: true,
      endTime: endTime.toISOString(),
      time_seconds
    });
  } catch (err) {
    console.error("Error stopping timer: ", err);
    res.status(500).json({ message: "Error stopping timer" });
  }
};

export const submitScore = async (req: Request, res: Response) => {
  try {
    const { username = 'AAA' } = req.body;
    const {time_seconds} = await getGameTime();

    // Format username: capitalize and handle 3 chars
    const formattedUsername = username.toUpperCase().padEnd(3, '—').slice(0, 3);
    const newScore = await create({ username: formattedUsername, time_seconds });

    res.status(201).json(newScore);
  } catch (err) {
    console.error("Error ending game: ", err);
    res.status(500).json({ message: "Error ending game" });
  }
};