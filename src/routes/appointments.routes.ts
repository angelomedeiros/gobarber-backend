import { Router } from 'express';
import { parseISO, startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return res.status(400).json({
      message: 'This appointment is aleready booked',
    });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return res.json(appointment);
});

export default appointmentsRouter;
