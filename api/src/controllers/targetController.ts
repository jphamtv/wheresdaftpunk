import { Request, Response } from "express";
import { getAll, getById, verifyCoordinates } from "../models/targetModel";
import { VerifyTarget } from '../types/targetTypes';

export const getTargets = async (req: Request, res: Response) => {
  try {
    const targets = await getAll();

    // Only send necessary data to client (exclude exact coordinates)
    const safeTargets = targets.map(({ id, name }) => ({ id, name }));
    res.json(safeTargets);
  } catch (err) {
    console.error("Fetching error: ", err);
    res.status(500).json({ message: "Error fetching targets" });
  }
};

export const verifyTarget = async (req: Request, res: Response) => {
  try {
    const { id, x_coord, y_coord } = req.body as VerifyTarget;

    const result = await verifyCoordinates({ id, x_coord, y_coord });

    // Get target name for success if found
    if (result) {
      const target = await getById(id);
      return res.json({
        success: true,
        message: `You found ${target.name}!`
      });
    }

    res.json({
      success: false,
      message: 'Try again'
    });
  } catch (err) {
    console.error("Error verifying target: ", err);
    res.status(500).json({ message: "Error verifying target" });
  }
};