import express from 'express';
const router = express.Router();
import isAuthenticated from '../utils/isAuthenticated';
import TrackerController from '../controllers/tracker';

router.route('/')
  .get(isAuthenticated, TrackerController.getAll)
  .post(isAuthenticated, TrackerController.post);

router.route('/:id')
    .get(isAuthenticated, TrackerController.get)
    .put(isAuthenticated, TrackerController.put)
    .delete(isAuthenticated, TrackerController.destroy);

export default router;
