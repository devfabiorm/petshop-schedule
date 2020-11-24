import { response, Response } from 'express';
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
    const createdat = moment().format('YYYY-MM-DD HH:mm:ss');
    const date = moment(appointment.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

    const validDate = moment(date).isSameOrAfter(createdat);
    const validOwner = appointment.owner.length >= 5;

    const validations = [
      {
        field: 'date',
        valid: validDate,
        message: 'A data deve ser maior ou igual a data atual'
      },
      {
        field: 'owner',
        valid: validOwner,
        message: 'O nome do cliente deve conter pelo menso cinco caracteres'
      }
    ];

    const errors = validations.filter(field => !field.valid);
    const validatedErrors = errors.length;

    if(validatedErrors) {
      console.log('if')
      response.status(400).json(errors);
    } else {
      console.log('else')
      const sql = 'INSERT INTO Appointments set ?';
      const formatedAppointment = {...appointment, date, createdat };

      connection.query(sql, formatedAppointment, (err, rows) => {
        if(err) {
          response.status(400).json(err);
        } else {
          response.status(201).json(rows);
        }
      });
    }
  }

  list(response: Response) {
    const sql = 'SELECT * FROM Appointments';

    connection.query(sql, (err, rows) => {
      if(err) {
        response.status(400).json(err);
      } else {
        response.status(200).json(rows);
      }
    });
  }

  findById(id: number, response: Response) {
    const sql = 'SELECT * FROM Appointments WHERE id = ?';

    connection.query(sql, id, (err, rows) => {
      
      if(err) response.status(400).json(err);
      else {
        response.status(200).json(rows[0]);
      }
    });
  }

  edit(id: number, values: any, response: Response) {

    if(values.date) {
      values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
    }

    const sql = 'UPDATE Appointments SET ? WHERE id = ?';

    connection.query(sql, [values, id], (err, rows) => {
      if(err) response.status(400).json(err);
      else response.status(200).json(rows);
    });
  }

  delete(id: number, response: Response) {
    const sql = 'DELETE FROM Appointments WHERE id = ?';

    connection.query(sql, id, (err, rows) => {
      if(err) response.status(400).json(err);
      else response.status(204).end();
    });
  }
}

export default new Schedule();