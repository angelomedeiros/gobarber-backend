import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface IRequestDTO {
  date: Date;
  provider: string;
}

export default class CreateAppointmentService {
  public async run({ date, provider }: IRequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appoitnment is already booked');
    }

    const appointment = appointmentsRepository.create({
      date: appointmentDate,
      provider,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}
