import { Router } from 'express';
import { userRoutes } from './userRoutes';

const routes = Router();

routes.use('/user', userRoutes);

export { routes };
