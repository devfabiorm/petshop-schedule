import moment from 'moment';

import AppointmentRepository, { IAppointment } from '../repositories/appointment';

interface IValidation {
  field: string;
  valid: any;
  message: string;
}


interface IValidateDate {
  date: string;
  createdat: string
}

interface IValidateOnwer {
    numChars: number
  }

class Schedule {
  private _validations: IValidation[];
  private _validDate: (params: IValidateDate) => boolean;
  private _validOwner: (params: IValidateOnwer) => boolean;
  private _validate: Function = () => {};

  constructor() {
    this._validDate = ({ date, createdat }: IValidateDate): boolean => moment(date).isSameOrAfter(createdat);
    this._validOwner = ({ numChars }: IValidateOnwer): boolean  => numChars >= 5;
    this._validate = (params: any) => this._validations.filter(filteredField => {
      const { field } = filteredField;
      const param = params[field];

      console.log(!filteredField.valid(param))
      return !filteredField.valid(param);
    });

    this._validations = [
      {
        field: 'date',
        valid: this._validDate,
        message: 'A data de agendamento deve ser maior ou igual a data atual.'
      },
      {
        field: 'owner',
        valid: this._validOwner,
        message: 'O CPF do dono deve conter o número certo de caracteres'
      }
    ];
  }

  create(appointment: IAppointment) {
    const createdat = moment().format('YYYY-MM-DD HH:mm:ss');
    const date = moment(
      new Date(...appointment.date.split('/')
        .reverse()
        .map((item: any, index) => item - index%2) as [number, number, number]
      )
    ).format('YYYY-MM-DD HH:mm:ss');

    const params = {
      date: { date, createdat },
      owner: { numChars: String(appointment.owner).length }
    };


    
    const errors = this._validate(params);
    console.log(errors.length)
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

  list() {
    return AppointmentRepository.list();
  }

  findById(id: number) {
    return AppointmentRepository.findById(id)
  }

  edit(id: number, values: any) {

    if(values.date) {
      values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
    }

    return AppointmentRepository.update(id, values);
  }

  delete(id: number) {
    
    return AppointmentRepository.delete(id);
  }
}

export default new Schedule();