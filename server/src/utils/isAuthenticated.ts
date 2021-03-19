import { passport } from './passport';
import { Request, Response, NextFunction } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', function(err, user) {
    if (err || !user) {
      res.status(403).json({
        error: 'You are not authorized to access this resource.'
      });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
}