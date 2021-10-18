import { Router } from 'express';
import ProfileController from '../app/controllers/ProfileController';

const profileRoutes = Router();

profileRoutes.get('/me', ProfileController.show);

export { profileRoutes };
