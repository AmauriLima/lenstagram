import express from 'express';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';
import 'reflect-metadata';
import './database';

import swaggerFile from './swagger.json';
import { errorHandler } from './middlewares/errorHandler';

import { routes } from './routes';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(process.env.API_PORT, () => console.log(`🔥 Server Started at http://localhost:${process.env.API_PORT}`));
