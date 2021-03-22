import express, { Request, Response } from 'express';
const router = express.Router();
import isAuthenticated from '../utils/isAuthenticated';
import UserController from '../controllers/user';

router.route('/')
  .get(isAuthenticated, UserController.getCurrentUser);

router.post('/login', UserController.login);

router.post('/register', UserController.register)

export default router;
