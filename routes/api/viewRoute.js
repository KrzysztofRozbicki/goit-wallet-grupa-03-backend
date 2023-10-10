import express from 'express';
import { getCustomers, getInfo, getNotFound } from '../../controllers/viewController.js';
// import User from '../service/schemas/users.js';
export const viewRouter = express.Router();

// viewRouter.get('/', (req, res) => {
//   res.render('index');
// });

viewRouter.get('/', getInfo);

viewRouter.get('/customers', getCustomers);

viewRouter.get('/*', getNotFound);
