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

  list() {
    const sql = 'SELECT * FROM Appointments';

    return query(sql);
  }

  findById(id: number) {
    const sql = 'SELECT * FROM Appointments WHERE id = ?';

    return query(sql, id);
  }

  update(id: number, values: object) {
    const sql = 'UPDATE Appointments SET ? WHERE id = ?';

    return query(sql, [values, id]);
  }

  delete(id: number) {
    const sql = 'DELETE FROM Appointments WHERE id = ?';

    return query(sql, id);
  }
}

export default new Appointment();