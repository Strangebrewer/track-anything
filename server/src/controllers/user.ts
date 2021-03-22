import { Request, Response } from 'express';
import UserSchema, { IUser } from '../schema/user';
import User from '../models/user';

const userModel = new User(UserSchema);

export default {
  async getCurrentUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await userModel.getCurrentUser(req.user._id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const user = await userModel.register(req.body);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const user = await userModel.login(req.body);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async put(req: Request, res: Response): Promise<Response> {
    try {
      return res.send('put!?!');
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async updatePassword(req: Request, res: Response): Promise<Response> {
    try {
      return res.send('update peewee!');
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async destroy(req: Request, res: Response): Promise<Response> {
    try {
      return res.send('seek and destroy!');
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}