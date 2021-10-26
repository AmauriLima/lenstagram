import { Router } from 'express';
import multer from 'multer';

import PostController from '../app/controllers/PostController';

import multerConfig from '../config/multer';
import { verifyToken } from '../middlewares/ensureAuthenticated';

const postRoutes = Router();

postRoutes.post('/', verifyToken, multer(multerConfig).single('image'), PostController.store);
postRoutes.put('/update/:post_id', verifyToken, multer(multerConfig).single('image'), PostController.update);
postRoutes.delete('/delete/:post_id', verifyToken, PostController.delete);

export { postRoutes };
