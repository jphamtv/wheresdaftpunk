import express from 'express';
import { getTargets, verifyTarget } from '../controllers/targetController';

const router = express.Router();

router.get('/', getTargets);
router.post('/verify', verifyTarget);

export default router;
