import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import usersRepository from '../repositories/UsersRepository';

class ProfileController {
  async show(request: Request, response: Response) {
    const UsersRepository = getCustomRepository(usersRepository);

    const { user_id } = request;

    const user = await UsersRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    user.password = undefined;

    response.status(200).json(user);
  }
}

export default new ProfileController();
