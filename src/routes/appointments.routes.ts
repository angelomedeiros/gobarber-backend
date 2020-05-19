import { Router } from 'express';
import { uuid } from 'uuidv4';
import { parseISO, startOfHour, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentInSameDate) {
    return res.status(400).json({
      message: 'This appointment is aleready booked',
    });
  }

  const appointment = {
    provider,
    date: parsedDate,
    id: uuid(),
  };

  appointments.push(appointment);

  return res.json(appointment);
});

export default appointmentsRouter;
