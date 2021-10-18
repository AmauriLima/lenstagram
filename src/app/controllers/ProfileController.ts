import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { User } from '../../entities/User';
import { comparePasswords, encryptPassword } from '../../utils/encript';
import { isEmailValid } from '../../utils/isEmailValid';

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

  async update(request: Request, response: Response) {
    const UsersRepository = getCustomRepository(usersRepository);

    const {
      name, email, password, newPassword,
    } = request.body;
    const { user_id } = request;

    if (!password) {
      return response.status(400).json({ error: 'Current password is necessary to change your data' });
    }

    const currentUserData = await UsersRepository.findOne({
      where: {
        id: user_id,
      },
    });

    const isValidPassword = await comparePasswords(password, currentUserData.password);

    if (!isValidPassword) {
      return response.status(401).json({ error: 'Invalid password' });
    }

    let newPasswordEncrypted;
    if (newPassword || newPassword === '') {
      const newPasswordHasMinLength = newPassword.length >= 8;

      if (!newPasswordHasMinLength) {
        return response.status(400).json({ error: 'Password must be at least 8 characters' });
      }

      newPasswordEncrypted = await encryptPassword(newPassword);
    }

    if (email) {
      if (!isEmailValid(email)) {
        return response.status(400).json({ error: 'Invalid email' });
      }

      const user = await UsersRepository.findOne({
        where: {
          email,
        },
      });

      if (user && user.id !== user_id) {
        return response.status(400).json({ error: 'This email is already in use' });
      }
    }

    const updatedUserData: User = {
      ...currentUserData,
      name,
      email,
      password: newPasswordEncrypted,
    };

    const updatedUser = UsersRepository.create(updatedUserData);

    await UsersRepository.save(updatedUser);

    updatedUser.password = undefined;

    response.status(200).json(updatedUser);
  }
}

export default new ProfileController();
