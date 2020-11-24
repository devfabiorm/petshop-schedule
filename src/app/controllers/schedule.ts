import { Request, Response } from 'express';
import Schedule from '../models/schedule';

export default class ScheduleController {

  index(request: Request, response: Response) {
    Schedule.list(response);
  }

  create(request: Request, response: Response) {
    const { owner, pet, service, date, status, notes } = request.body;
    Schedule.create({ owner, pet, service, date, status, notes }, response);
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