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

export const createNewScore = async (req: Request, res: Response) => {
  try {
    const { username, time_seconds } = req.body;
    
    await create(username, time_seconds);
    res.redirect('/');
  } catch (err) {
    console.error("Error creating score: ", err);
    res.status(500).json({ message: "Error creating score" });
  }
};