import query from '../infra/database/queries';

export interface IAppointment {
  id?: number;
  owner: string | object;
  pet?: string;
  service: string;
  date: string;
  status: string;
  notes: string;
}

class Appointment {
  create(appointment: IAppointment) {
    const sql = 'INSERT INTO Appointments set ?';
    return query(sql, appointment);
  }
}

export default new Appointment();