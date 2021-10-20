import { Router } from 'express';
import { verifyToken } from '../middlewares/ensureAuthenticated';
import { profileRoutes } from './profileRoutes';
import { userRoutes } from './userRoutes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/profile', verifyToken, profileRoutes);

export { routes };
