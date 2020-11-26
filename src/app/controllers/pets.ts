import { Request, Response } from 'express';

import Pet from '../models/pets';

export default class PetsController {
  create(request: Request, response: Response) {
    const pet = request.body;
    Pet.create(pet, response);
  }
}