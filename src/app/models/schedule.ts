import axios from 'axios';
import { response, Response } from 'express';
import moment from 'moment';

import AppointmentRepository, { IAppointment } from '../repositories/appointment';

interface Owner {
  cpf: string;
  name: string;
  birthday: string;
}

interface IValidation {
  field: string;
  valid: Function;
  message: string;
}

interface IValidationProps {
  date: {
    date: string;
    createdat: string
  },
  onwer: {
    numChars: number
  }
}

class Schedule {
  private _validations: IValidation[] = [];
  private _validDate: Function = () => {};
  private _validOwner: Function = () => {};
  private _validate: Function = () => {};

  constructor() {
    this._validDate = ({ date: { date, createdat } } : IValidationProps):boolean => moment(date).isSameOrAfter(createdat);
    this._validOwner = ({onwer: { numChars }} : IValidationProps): boolean => numChars >= 5;
    this._validate = (params: any) => this._validations.filter(filteredField => {
      const { field } = filteredField;
      const param = params[field];

      return filteredField.valid(param);
    });

    this._validations = [
      {
        field: 'date',
        valid: this._validDate,
        message: 'A data deve ser maior ou igual a data atual'
      },
      {
        field: 'owner',
        valid: this._validOwner,
        message: 'O nome do cliente deve conter pelo menso cinco caracteres'
      }
    ];
  }

  create(appointment: IAppointment) {
    const createdat = moment().format('YYYY-MM-DD HH:mm:ss');
    const date = moment(appointment.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

    const params = {
      date: { date, createdat },
      owner: { numChars: String(appointment.owner).length }
    };
    
    const errors = this._validate(params);
    const validatedErrors = errors.length;

    if(validatedErrors) {
      return new Promise((resolve, reject) => reject(errors));
    } else {      
      const formatedAppointment = {...appointment, date, createdat };

      return AppointmentRepository.create(formatedAppointment)
        .then((rows: any) => {
          return {...appointment, id: rows.insertId};
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

    connection.query(sql, id, async (err, rows: IAppointment[]) => {
      const cpf = rows[0].owner;

      if(err) response.status(400).json(err);
      else {
        let { data: owner } = await axios.get<Owner>(`http://localhost:8082/${cpf}`);
        rows[0].owner = owner;
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
      else response.status(200).json([values, id]);
    });
  }

  delete(id: number, response: Response) {
    const sql = 'DELETE FROM Appointments WHERE id = ?';

    connection.query(sql, id, (err, rows) => {
      if(err) response.status(400).json(err);
      else response.status(200).json({ id });
    });
  }
}

export default new Schedule();