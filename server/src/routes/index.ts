import express from 'express';
const router = express.Router();

import todoRoutes from './todo';
import userRoutes from './user';

router.use('/todo', todoRoutes);
router.use('/users', userRoutes);

export default router;