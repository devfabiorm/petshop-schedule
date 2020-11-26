import { Router } from 'express';
import PetsController from '../controllers/pets';

const petsRoutes = Router();
const petsController = new PetsController();

petsRoutes.post('/pets', petsController.create);

export default petsRoutes;