import * as userService from '../services/userService';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../config/env';
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

function hashPassword (password) {
  return bcrypt.hashSync(password, 10);
}

async function checkPassword (password, passwordHash) {
  return await bcrypt.compare(password, passwordHash);
}

function generateJwt (user) {
  const today = new Date(); const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); tomorrow.setHours(6);
  const timeDiff = (tomorrow - today) / 3600000;
  return 'JWT ' + jwt.sign({ id: user.id_user, username: user.username, role: user.role }, env.JWT_PRIVATE_KEY, { expiresIn: `${timeDiff}h` });
}

const authUser = passport => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: env.JWT_PRIVATE_KEY
  };

  // eslint-disable-next-line camelcase
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    let obj = null;
    if (jwt_payload.username) {
      obj = await userService.getUser(jwt_payload.username);
    }

    if (!obj) return done(obj, false);

    if (obj) return done(null, obj); // here, the JWT is valid and the user is authenticated successfully
    return done(null, false);
  }));
};

export { hashPassword, checkPassword, generateJwt, authUser };
