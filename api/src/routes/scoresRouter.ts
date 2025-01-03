import express from 'express';
import { getScores, startGame, endGame } from '../controllers/scoreController';

const router = express.Router();

router.get('/', getScores);
router.post('/start', startGame);
router.post('/complete', endGame);

export default router;