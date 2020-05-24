import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import auth from '../middlewares/auth';

import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.run({
      email,
      name,
      password,
    });

    return res.json(user);
  } catch (error) {
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }
});

usersRouter.patch(
  '/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.run({
        user_id: req.user.id,
        avatarFilename: req.file.filename,
      });

      return res.send(user);
    } catch (error) {
      return res.status(error.statusCode).json({
        error: error.message,
      });
    }
  },
);

export default usersRouter;
