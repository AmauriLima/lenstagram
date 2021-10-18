import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { isEmailValid } from '../../../utils/isEmailValid';
import usersRepository from '../repositories/UsersRepository';

interface IRequestBody {
  name: string,
  email: string,
  password: string,
}

class UserController {
  async store(request: Request, response: Response) {
    const UsersRepository = getCustomRepository(usersRepository);
    const { name, email, password }: IRequestBody = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({ error: 'Missing required arguments' });
    }

    const isEmailFormatValid = isEmailValid(email);

    if (!isEmailFormatValid) {
      return response.status(400).json({ error: 'Invalid format e-mail' });
    }

    const passwordHasMinLength = password.length >= 8;

    if (!passwordHasMinLength) {
      return response.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    const userAlreadyExists = await UsersRepository.findOne({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      return response.status(400).json({ error: 'User alread exists' });
    }

    const user = UsersRepository.create({
      name, email, password,
    });

    await UsersRepository.save(user);

    response.status(201).json(user);
  }
}

export default new UserController();
