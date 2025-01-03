import express from 'express';
import { getScores, createNewScore } from '../controllers/scoreController';

const router = express.Router();

router.get('/', getScores);
router.post('/', createNewScore);

export default router;