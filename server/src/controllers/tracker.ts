import { Request, Response } from 'express';
import TrackerSchema, { ITracker } from '../schema/tracker';
import Tracker from '../models/tracker';
import { IReturnTracker } from '../models/tracker';

const trackerModel = new Tracker(TrackerSchema);

export default {
    async get(req: Request, res: Response): Promise<void> {
        try {
            const tracker = await trackerModel.getOne(req.params.id);
            console.log('tracker in get:::', tracker)
            res.status(200).json(tracker);
        } catch (err) {
            res.status(400).send(err);
        }
    },

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            return res.send('derp');
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
  
  async post(req: Request, res: Response): Promise<void> {
    try {
        req.body.user = req.user._id;
        const tracker = await trackerModel.createNewTracker(req.body);
        res.status(201).json(tracker);
    } catch (err) {
        res.status(400).send(err);
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