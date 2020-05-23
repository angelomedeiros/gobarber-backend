import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default (req: Request, res: Response, next: NextFunction): void => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    throw new Error('Token is missing');
  }

  const [, token] = tokenHeader.split(' ');

  try {
    const { sub } = verify(token, authConfig.secret) as ITokenPayload;

    req.user = {
      id: sub,
    };

    next();
  } catch (e) {
    throw new Error('Invalid token');
  }
};
