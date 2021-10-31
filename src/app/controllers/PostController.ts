import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { deleteFile } from '../../utils/file';
import postsRepository from '../repositories/PostsRepository';
import usersRepository from '../repositories/UsersRepository';

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

    response.status(201).json(post);
  }

  async update(request: Request, response: Response) {
    const PostsRepository = getCustomRepository(postsRepository);

    const { user_id } = request;
    const { post_id } = request.params;
    const { description } = request.body;
    const image = request.file;

    const post = await PostsRepository.findByIdWithSQL(post_id);

    if (!post) {
      await deleteFile(image.path);
      return response.status(404).json({ error: 'This post does not exist' });
    }

    if (post.user_id !== user_id) {
      await deleteFile(image.path);
      return response.status(401).json({ error: 'You can only edit posts created by yourself' });
    }

    if (image) {
      await deleteFile(post.url_img);
    }

    const updatedPostData = {
      ...post,
      description: description ?? post.description,
      url_img: image?.path || post.url_img,
    };

    const updatedPost = await PostsRepository.updateWithSQL(updatedPostData);

    response.status(200).json(updatedPost);
  }

  async delete(request: Request, response: Response) {
    const PostsRepository = getCustomRepository(postsRepository);

    const { post_id } = request.params;
    const { user_id } = request;

    const post = await PostsRepository.findOne({
      where: {
        id: post_id,
      },
    });

    if (!post) {
      return response.status(404).json({ error: 'Post not found!' });
    }

    if (post.user_id !== user_id) {
      return response.status(401).json({ err: 'You can only delete posts created by yourself' });
    }

    await deleteFile(post.url_img);

    await PostsRepository.delete({
      id: post_id,
    });

    response.sendStatus(204);
  }

  async indexByUser(request: Request, response: Response) {
    const PostsRepository = getCustomRepository(postsRepository);
    const UsersRepository = getCustomRepository(usersRepository);

    const { user_id } = request.params;

    const user = await UsersRepository.findByIdWithSQL(user_id);

    delete user.password;

    if (!user) {
      return response.status(404).json({ error: 'User not found!' });
    }

    const posts = await PostsRepository.findAllByUserIdWithSQL(user_id);

    response.status(200).json({
      user,
      posts,
    });
  }

  async indexMyPosts(request: Request, response: Response) {
    const PostsRepository = getCustomRepository(postsRepository);

    const { user_id } = request;

    const posts = await PostsRepository.findAllByUserIdWithSQL(user_id);

    response.status(200).json(posts);
  }
}

export default new PostController();
