import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserRespository from '@modules/users/infra/typeorm/repositories/UserRepository';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  const userRepository = new UserRespository();

  const { email, password } = req.body;

  const authenticateUser = new AuthenticateUserService(userRepository);

  const response = await authenticateUser.run({
    email,
    password,
  });

  return res.send(response);
});

export default sessionRouter;
