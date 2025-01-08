import express from 'express';
import { getScores, startTimer, stopTimer, submitScore } from '../controllers/scoreController';

const router = express.Router();

router.get('/scores', getScores);
router.post('/start-timer', startTimer);
router.post('/stop-timer', stopTimer);
router.post('/submit-score', submitScore);

export default router;