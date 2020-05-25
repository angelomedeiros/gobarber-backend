import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';
import AppError from '../errors/AppError';
import { filesDirectory } from '../config/upload';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

export default class UploadUserAvatarService {
  public async run({ user_id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(filesDirectory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}
