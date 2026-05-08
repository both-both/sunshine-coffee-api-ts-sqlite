import { Router } from 'express';
import { getRecord, getRecords } from '../controllers/productController.js';

const routes = Router();
routes.get('/', getRecords);
routes.get('/:id', getRecord);

export const productRoutes = routes;
