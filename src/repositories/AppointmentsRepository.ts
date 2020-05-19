import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

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

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }
}
