import express from 'express';

export const usersRouter = express.Router();

import {
  registerUser,
  loginUser,
  refreshTokens,
  getUserProfile,
  logoutUser,
} from '../../controllers/userController.js';

usersRouter.post('/register', registerUser);

usersRouter.post('/login', loginUser);

usersRouter.post('/refresh', refreshTokens); //refresh token

usersRouter.get('/profile', getUserProfile); // get user data (name mail)

usersRouter.get('/logout', logoutUser);
