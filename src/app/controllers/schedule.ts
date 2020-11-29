import { Request, Response } from 'express';
import Schedule from '../models/schedule';

export default class ScheduleController {

  index(request: Request, response: Response) {
    Schedule.list(response);
  }

  create(request: Request, response: Response) {
    const appointment = request.body;
    Schedule.create(appointment)
      .then(createdAppointment => response.status(200).json(createdAppointment))
      .catch(erros => response.status(400).json(erros));
  }

  show(request: Request, response: Response) {
    const { id } = request.params;
    Schedule.findById(Number(id), response);
  }

  update(request: Request, response: Response) {
    const { id } = request.params;
    const values = request.body;

    Schedule.edit(Number(id), values, response);
  }

  delete(request: Request, response: Response) {
    const { id } = request.params;

    Schedule.delete(Number(id), response);
  }
}