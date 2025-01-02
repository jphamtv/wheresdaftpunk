import express from 'express';
import { getScores } from '../controllers/scoreController';

const router = express.Router();

router.get('/', getScores);

export default router;