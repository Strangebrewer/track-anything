import express from 'express';
const router = express.Router();

import todoRoutes from './todo';

router.use('/todo', todoRoutes);

export default router;