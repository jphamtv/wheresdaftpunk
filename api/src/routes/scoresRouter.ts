import express from 'express';
import { getAllScores, createScore } from '../controllers/scoreController';

const router = express.Router();

router.get('/', getAllScores);
router.post('/', createScore);

export default router;