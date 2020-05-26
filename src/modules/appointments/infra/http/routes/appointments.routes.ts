import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import auth from '@modules/users/infra/http/middlewares/auth';

const appointmentsRouter = Router();

// appointmentsRouter.get('/', auth, async (req, res) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

appointmentsRouter.post('/', auth, async (req, res) => {
  const appointmentsRepository = new AppointmentsRepository();
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointent = new CreateAppointmentService(appointmentsRepository);

  const appointment = await createAppointent.run({
    date: parsedDate,
    provider_id,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
