import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

export default usersRouter.post('/', async (req, res) => {
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
    return res.status(400).json({
      error: error.message,
    });
  }
});
