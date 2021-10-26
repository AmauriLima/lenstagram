import { Router } from 'express';
import { verifyToken } from '../middlewares/ensureAuthenticated';
import { postRoutes } from './postRoutes';
import { profileRoutes } from './profileRoutes';
import { userRoutes } from './userRoutes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/profile', verifyToken, profileRoutes);
routes.use('/posts', postRoutes);

export { routes };
