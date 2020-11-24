import { Router } from 'express';
import SchduleController from '../controllers/schedule';

const routes = Router();
const scheduleController = new SchduleController();

routes.get('/atendimentos', scheduleController.schedules);
routes.post('/atendimentos', scheduleController.create);

export default routes;