import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  public async run({ email, password }: IRequest): Promise<IResponse> {
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

    const token = sign({}, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
      subject: user.id,
    });

    delete user.password;

    return { user, token };
  }
}
