import { Request, Response } from 'express';
import Todo from '../schema/todo';

export default {
  async get(req: Request, res: Response): Promise<Response> {
    try {
      const todos = await Todo.find(req.query);
      return res.status(200).send(todos);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async post(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description } = req.body;
      let todo = Todo.build({ title, description });
      todo = await todo.save();
      return res.status(201).send(todo);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async put(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).send(updated);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await Todo.findByIdAndDelete(id);
      return res.status(200).send('success');
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}
