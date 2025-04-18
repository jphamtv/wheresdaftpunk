import { Request, Response, RequestHandler } from "express";
import { getAll, getById, verifyCoordinates } from "../models/targetModel";
import { VerifyTargetApiRequest } from "../types/apiTypes";
import { toDbVerifyTarget } from "../types/transformers";
import { logger } from '../utils/logger';

export const getTargets = async (req: Request, res: Response) => {
  try {
    const targets = await getAll();
    res.json(targets);
  } catch (err) {
    logger.error("Fetching error: ", err);
    res.status(500).json({ message: "Error fetching targets" });
  }
};

export const verifyTarget = (async (req: Request, res: Response) => {
  try {
    const apiRequest = req.body as VerifyTargetApiRequest;
    const dbRequest = toDbVerifyTarget(apiRequest);

    const result = await verifyCoordinates(dbRequest);

    // Get target name for success if found
    if (result) {
      const target = await getById(dbRequest.id);
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
    logger.error("Error verifying target: ", err);
    res.status(500).json({ message: "Error verifying target" });
  }
}) as RequestHandler;