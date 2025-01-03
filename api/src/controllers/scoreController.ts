import { Request, Response } from "express";
import { create, getAll } from "../models/scoreModel";
import { NewScore } from '../types/scoreTypes';

export const getScores = async (req: Request, res: Response) => {
  try {
    const scores = await getAll();
    res.json(scores);
  } catch (err) {
    console.error("Fetching error: ", err);
    res.status(500).json({ message: "Error fetching scores" });
  }
};

export const createNewScore = async (req: Request, res: Response) => {
  try {
    let { username = 'AAA', time_seconds } = req.body as NewScore;

    // Format username: capitalize and handle 3 chars
    username = username.toUpperCase().padEnd(3, '—').slice(0, 3);

    const newScore = await create({ username, time_seconds });
    res.status(201).json(newScore);
  } catch (err) {
    console.error("Error creating score: ", err);
    res.status(500).json({ message: "Error creating score" });
  }
};