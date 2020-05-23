import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const response = await authenticateUser.run({
      email,
      password,
    });

    return res.send(response);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

export default sessionRouter;
