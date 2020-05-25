import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default (req: Request, res: Response, next: NextFunction): void => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    throw new AppError('Token is missing', 401);
  }

  const token = tokenHeader.split(' ')[1];

  try {
    const { sub } = verify(token, authConfig.secret) as ITokenPayload;

    req.user = { id: sub };

    next();
  } catch (e) {
    throw new AppError('Invalid token', 401);
  }
};
