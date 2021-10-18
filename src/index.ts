import express from 'express';
import 'reflect-metadata';
import './database';

import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);

// eslint-disable-next-line no-console
app.listen(process.env.API_PORT, () => console.log('🔥 Server Started at http://localhost:3000'));
