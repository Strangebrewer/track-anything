import express, { Request, Response } from 'express';
const router = express.Router();
import TodoController from '../controllers/todo';

router.route('/')
    .get(TodoController.get)
    .post(TodoController.post);

export default router;