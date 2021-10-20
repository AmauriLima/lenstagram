import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { isEmailValid } from '../../utils/isEmailValid';
import usersRepository from '../repositories/UsersRepository';
import { generateToken } from '../../utils/generateToken';
import { comparePasswords } from '../../utils/encrypt';

interface IStoreRequestBody {
  name: string,
  email: string,
  password: string,
}
interface ILoginRequestBody {
  email: string,
  password: string,
}

class UserController {
  async store(request: Request, response: Response) {
    const UsersRepository = getCustomRepository(usersRepository);
    const { name, email, password }: IStoreRequestBody = request.body;

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
      return response.status(409).json({ error: 'This email is already in use' });
    }

    const user = UsersRepository.create({
      name, email, password,
    });

    await UsersRepository.save(user);

    delete user.password;

    response.status(201).json({
      user,
      token: generateToken(user),
    });
  }

  async login(request: Request, response: Response) {
    const UsersRepository = getCustomRepository(usersRepository);
    const { email, password }: ILoginRequestBody = request.body;

    if (!email || !password) {
      return response.status(400).json({ error: 'Missing e-mail/password or both' });
    }

    const user = await UsersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return response.status(401).json({ error: 'Invalid e-mail/password' });
    }

    const isValidPassword = await comparePasswords(password, user.password);

    if (!isValidPassword) {
      return response.status(401).json({ error: 'Invalid e-mail/password' });
    }

    delete user.password;

    response.status(200).json({
      user,
      token: generateToken(user),
    });
  }
}

export default new UserController();
