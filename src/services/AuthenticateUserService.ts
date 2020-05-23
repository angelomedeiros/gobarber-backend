import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface IRequest {
  email: string;
  password: string;
}

export default class AuthenticateUserService {
  public async run({ email, password }: IRequest): Promise<{ user: User }> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('Wrong email/password');
    }

    const passwordIsValid = await compare(password, user.password);

    if (!passwordIsValid) {
      throw new Error('Wrong email/password');
    }

    delete user.password;

    return { user };
  }
}
