import jwt from 'jsonwebtoken';
import { tokenExp } from '../constants';

export const createJWTToken = (data: any) => {
  const token = jwt.sign(data, process.env.JWT_TOKEN_SECRET!, {
    expiresIn: tokenExp,
  });
  return { token, expirationTime: Date.now() + tokenExp };
};

export const decodeJWTToken = (data: any) => {
  const token = jwt.verify(data, process.env.JWT_TOKEN_SECRET!);
  return token;
};
