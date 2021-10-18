import express from 'express';
import 'reflect-metadata';
import './database';

import { routes } from './routes';

const app = express();

app.use(routes);

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('🔥 Server Started at http://localhost:3000'));
