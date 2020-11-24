import { Response } from 'express';
import moment from 'moment';

import connection from '../infra/conection';

interface Appointment {
  id?: number;
  owner: string;
  pet?: string;
  service: string;
  date: string;
  status: string;
  notes: string;
}

class Schedule {
  create(appointment: Appointment, response: Response) {
    const createdat = moment().format('YYYY-MM-DD HH:MM:SS');
    const date = moment(appointment.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    const formatedAppointment = {...appointment, date, createdat };
    const sql = 'INSERT INTO Appointments set ?';

    connection.query(sql, formatedAppointment, (err, rows) => {
      if(err) {
        response.status(400).json(err);
      } else {
        response.status(201).json(rows);
      }
    });
  }
}

export default new Schedule();