import { Request, Response } from 'express';
import Todo from '../schema/todo';

export default {
    async get(req: Request, res: Response): Promise<Response> {
        console.log('req.query:::', req.query);
        const todos = await Todo.find(req.query);
        return res.status(201).send(todos);
    },

    async post(req: Request, res: Response): Promise<Response> {
        const { title, description } = req.body;

        const todo = Todo.build({ title, description });
        await todo.save();
        return res.status(201).send(todo);
    }
}