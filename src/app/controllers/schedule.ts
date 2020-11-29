import { Request, Response } from 'express';
import axios from 'axios';

import Schedule from '../models/schedule';
import { IAppointment } from '../repositories/appointment';

export default class ScheduleController {

  index(request: Request, response: Response) {
    Schedule.list()
      .then(rows => response.status(200).json(rows))
      .catch(errors => response.status(400).json(errors));
  }

  create(request: Request, response: Response) {
    const appointment = request.body;
    Schedule.create(appointment)
      .then(createdAppointment => response.status(200).json(createdAppointment))
      .catch(erros => response.status(400).json(erros));
  }

  show(request: Request, response: Response) {
    const { id } = request.params;
    Schedule.findById(Number(id))
      .then(async rows => {
        try {
          const cpf = rows[0].owner;
          const owner = axios.get(`http://localhost:8082/${cpf}`);
          rows[0].owner = owner;

          response.json(rows[0]);
        } catch (error) {
          response.status(400).json(error)
        }
      })
      .catch(error => response.status(400).json(error));
  }

  update(request: Request, response: Response) {
    const { id } = request.params;
    const values = request.body;

    Schedule.edit(Number(id), values)
      .then(rows => response.json(rows))
      .catch(error => response.status(400).json(error));
  }

  delete(request: Request, response: Response) {
    const { id } = request.params;

    Schedule.delete(Number(id))
      .then(rows => response.json(rows))
      .catch(error => response.status(400).json(error));
  }
}