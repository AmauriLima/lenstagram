import { Router } from 'express';
import ProfileController from '../app/controllers/ProfileController';

const profileRoutes = Router();

profileRoutes.get('/me', ProfileController.show);
profileRoutes.put('/update', ProfileController.update);

export { profileRoutes };
