import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRespository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default class CreateUserService {
  constructor(private userRepository: IUsersRespository) {}

  public async run({ email, name, password }: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const passwordHashed = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    delete user.password;

    return user;
  }
}
