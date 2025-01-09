import { Request, Response } from "express";
import { create, getAll, stopGameTimer, getGameTime, startGameTimer } from "../models/scoreModel";
import { toApiScore } from "../types/transformers";

export const getScores = async (req: Request, res: Response) => {
  try {
    const dbScores = await getAll();
    const apiScores = dbScores.map(toApiScore);
    res.json(apiScores);
  } catch (err) {
    console.error("Fetching scores error: ", err);
    res.status(500).json({ message: "Error fetching scores" });
  }
};

export const startTimer = async (req: Request, res: Response) => {
  try {
    startGameTimer();
    res.sendStatus(204);
  } catch (err) {
    console.error("Error starting timer: ", err);
    res.status(500).json({ message: "Error starting timer" });
  }
};

export const stopTimer = async (req: Request, res: Response) => {
  try {
    const { time_seconds } = stopGameTimer();

    res.json({ timeSeconds: time_seconds });
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
    const newDbScore = await create({ username: formattedUsername, time_seconds });
    const newApiScore = toApiScore(newDbScore);

    res.status(201).json(newApiScore);
  } catch (err) {
    console.error("Error ending game: ", err);
    res.status(500).json({ message: "Error ending game" });
  }
};