import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import postsRepository from '../repositories/PostsRepository';

class PostController {
  async store(request: Request, response: Response) {
    const PostsRepository = getCustomRepository(postsRepository);

    const { user_id } = request;
    const { description } = request.body;
    const image = request.file;

    if (!image) {
      return response.status(400).json({ error: 'Image is required!' });
    }

    const post = PostsRepository.create({
      user_id,
      description,
      url_img: image.path,
    });

    await PostsRepository.save(post);

    response.status(201).json({
      post,
    });
  }
}

export default new PostController();
