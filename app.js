import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';

import { transactionsRouter } from './routes/api/transactionRoutes.js';
import { usersRouter } from './routes/api/userRoutes.js';

export const app = express();
const logger = morgan;

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionsRouter);
app.use('/api/users', usersRouter);
app.use(passport.initialize());

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
