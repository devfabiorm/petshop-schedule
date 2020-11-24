import { Router } from 'express';
import SchduleController from '../controllers/schedule';

const routes = Router();
const scheduleController = new SchduleController();

routes.get('/atendimentos', scheduleController.index);
routes.post('/atendimentos', scheduleController.create);
routes.get('/atendimentos/:id', scheduleController.show);
routes.patch('/atendimentos/:id', scheduleController.update);
routes.delete('/atendimentos/:id', scheduleController.delete);

export default routes;