import express, { Request, Response } from 'express';
const router = express.Router();

router.route('/')
    .get([], (req: Request, res: Response) => {
        return res.send('the todo');
    })
    .post([], (req: Request, res: Response) => {
        return res.send('new todo created');
    });

export default router;