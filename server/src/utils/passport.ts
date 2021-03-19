import jwt from 'jsonwebtoken';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import UserSchema from '../schema/user';
const secret: string = process.env.PASSPORT_SECRET || 'helplessly hoping';

interface IPayload {
  id: string;
}

const sign = (payload: IPayload): string => jwt.sign(payload, secret);

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

passport.use(new Strategy(options, async (payload, done) => {
  try {
    const user = await UserSchema.findById(payload.id);
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));

export {
  sign,
  passport
}
