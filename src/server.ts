import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from './routes';
import AppError from './errors/AppError';
import './database';
import { filesDirectory } from './config/upload';

const app = express();

app.use(express.json());
app.use('/files', express.static(filesDirectory));
app.use(routes);

app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    status: 'error',
    message: 'Internam server error',
  });
});

app.listen(3333, () => {
  console.info('Listing port 3333 ⌚');
});
