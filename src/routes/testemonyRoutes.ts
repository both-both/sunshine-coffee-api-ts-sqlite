import { Router } from 'express';
import { getRecord, getRecords } from '../controllers/testemonyController'

const routes = Router();
routes.get('/', getRecords);
routes.get('/:id', getRecord);

export const testemonyRoutes = routes;
