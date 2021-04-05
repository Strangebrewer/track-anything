import express from 'express';
const router = express.Router();

import trackerRoutes from './tracker';
import todoRoutes from './todo';
import userRoutes from './user';

router.use('/trackers', trackerRoutes);
router.use('/todo', todoRoutes);
router.use('/users', userRoutes);

export default router;