import { Request, Response } from "express";
import { getAll, getById } from "../models/targetModel";

export const getTargets = async (req: Request, res: Response) => {
  try {
    const targets = await getAll();
    res.json(targets);
  } catch (err) {
    console.error("Fetching error: ", err);
    res.status(500).json({ message: "Error fetching targets" });
  }
};

export const verifyTarget = async (req: Request, res: Response) => {
  try {
    // Get selected coordinates
    const { xCoordinate, yCoordinate } = req.body;

    // Get target info
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new Error('Invalid ID');
    }

    const target = await getById(id);

    // Determine if target is hit
    // Calculate selected coordinates radius
    // Calculate selected target from dropdown radius
    // If there is a match return success message, else try again message
    if (!match) {
      res.json({ message: 'Try again' });
    } else {
      res.json({message: `${target.name} found!`})
    }
  } catch (err) {
    console.error("Fetching error: ", err);
    res.status(500).json({ message: "Error getting target" });
  }
};