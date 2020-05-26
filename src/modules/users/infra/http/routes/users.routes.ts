import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import auth from '@modules/users/infra/http/middlewares/auth';
import UserRespository from '@modules/users/infra/typeorm/repositories/UserRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const usersRepository = new UserRespository();

  const { name, email, password } = req.body;

  const createUser = new CreateUserService(usersRepository);

  const user = await createUser.run({
    email,
    name,
    password,
  });

  return res.json(user);
});

usersRouter.patch(
  '/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const usersRepository = new UserRespository();

    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.run({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    return res.send(user);
  },
);

export default usersRouter;
