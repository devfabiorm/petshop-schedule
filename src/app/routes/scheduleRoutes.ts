import { Router } from 'express';
import SchduleController from '../controllers/schedule';

const scheduleRoutes = Router();
const scheduleController = new SchduleController();

scheduleRoutes.get('/atendimentos', scheduleController.index);
scheduleRoutes.post('/atendimentos', scheduleController.create);
scheduleRoutes.get('/atendimentos/:id', scheduleController.show);
scheduleRoutes.patch('/atendimentos/:id', scheduleController.update);
scheduleRoutes.delete('/atendimentos/:id', scheduleController.delete);

export default scheduleRoutes;