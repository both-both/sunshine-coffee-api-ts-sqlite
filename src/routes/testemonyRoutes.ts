import { Router } from 'express';
import { getRecord, getRecords } from '../controllers/testemonyController.js'

const routes = Router();
routes.get('/', getRecords);
routes.get('/:id', getRecord);

export const testemonyRoutes = routes;
