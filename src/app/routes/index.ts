import { Router } from 'express';
import scheduleRoutes from './scheduleRoutes';
import petsRoutes from './petsRoutes';

const routes = Router();

routes.use(scheduleRoutes);
routes.use(petsRoutes);


export default routes;