import { Router } from 'express';

const appointmentsRouter = Router();

appointmentsRouter.post('/', (req, res) => {
  return res.json(req.body);
});

export default appointmentsRouter;
