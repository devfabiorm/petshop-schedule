import { Request, Response } from 'express';
import Schedule from '../models/schedule';

export default class ScheduleController {

  schedules(request: Request, response: Response) {
    response.send('Você está na rota de atendimento e executando um GET.');
  }

  create(request: Request, response: Response) {
    const { owner, pet, service, date, status, notes } = request.body;
    Schedule.create({ owner, pet, service, date, status, notes }, response);
    response.send('Você está na realizando um post');
  }
}