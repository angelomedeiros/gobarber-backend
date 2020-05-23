import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';
import { filesDirectory } from './config/upload';

const app = express();

app.use(express.json());
app.use('/files', express.static(filesDirectory));
app.use(routes);

app.listen(3333, () => {
  console.log('Listing port 3333 ⌚');
});
