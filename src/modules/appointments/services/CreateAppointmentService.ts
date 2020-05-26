import { startOfHour } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  date: Date;
  provider_id: string;
}

export default class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async run({ date, provider_id }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appoitnment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      date: appointmentDate,
      provider_id,
    });

    return appointment;
  }
}
