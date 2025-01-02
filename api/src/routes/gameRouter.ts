import express from 'express';

const router = express.Router();

router.get('/targets', getNames);
router.post('/verify', verifyTarget);
router.post('/score', submitScore);

export default router;