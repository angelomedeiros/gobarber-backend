import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  date: Date;
  provider_id: string;
}

export default class CreateAppointmentService {
  public async run({ date, provider_id }: IRequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appoitnment is already booked');
    }

    const appointment = appointmentsRepository.create({
      date: appointmentDate,
      provider_id,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}
