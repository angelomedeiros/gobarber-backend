import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface ICreateAppointmentDTO {
  provider: string;
  date: Date;
}

export default class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findAll(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    return (
      this.appointments.find(appointment => isEqual(appointment.date, date)) ||
      null
    );
  }

  public create({ provider, date }: ICreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}
