import { getRepository } from 'typeorm';
import User from '../models/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async run({ email, name, password }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email address already used.');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}
